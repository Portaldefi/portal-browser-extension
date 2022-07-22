import { openDB, IDBPDatabase } from 'idb';
import config from '../../config/db'
import { AccountSchema, EAccount, IAccount } from './schema';
import createHash from 'create-hash';
import { encrypt, decrypt, importKey, generateKey } from '@utils/subtleCrypto';
import { IChain, IIdentity } from '@/types/identity';

let db: IDBPDatabase<AccountSchema>;
var iv = new Uint8Array([188, 185, 57, 146, 246, 194, 116, 34, 12, 80, 198, 76]);
var textEnc = new TextEncoder();
var textDec = new TextDecoder("utf-8");

export const createDB = async (dbName: string = config.name) => {
  db = await openDB<AccountSchema>(dbName, 1, {
    upgrade: db => {
      db.createObjectStore("account", { autoIncrement: true })
    }
  });
}

export const insertAccount = async (account: IAccount) => {
  const accountCount = await db.count('account');

  var keys = await importKey();

  var eAccount = {
    password: account.password,
    privateKey: await encrypt(textEnc.encode(account.privateKey), keys, iv),
    privateExtendedKey: await encrypt(textEnc.encode(account.privateExtendedKey), keys, iv),
    identity: [] as Array<IIdentity>
  } as EAccount;


  for (let i = 0; i < account.identity.length; i++) {
    var data = textEnc.encode(account.identity[i]);
    eAccount.identity[i] = [] as IIdentity;
    eAccount.identity[i][0] = {} as IChain;
    eAccount.identity[i][0].address = await encrypt(data, keys, iv);
  }

  db.add("account", eAccount, accountCount);
}

export const insertIdentity = async (identity: string, accountId: number = 0) => {
  const account = await db.get('account', accountId) as EAccount;
  // @ts-ignore

  var keys = await importKey();

  var data = textEnc.encode(identity);
  var length = account.identity.length;
  console.log(length);
  console.log(account);
  account.identity[length] = [];
  account.identity[length][0] = {} as IChain;
  account.identity[length][0].address = await encrypt(data, keys, iv);
  // @ts-ignore
  db.put('account', account, accountId);
}

export const getAccount = async (accountId: number = 0) => {
  var keys = await importKey();

  const account = await db.get('account', accountId) as EAccount;
  const iAccount = {
    password: account.password,
    privateKey: textDec.decode(await decrypt(account.privateKey, keys, iv)),
    privateExtendedKey: textDec.decode(await decrypt(account.privateExtendedKey, keys, iv)),
    identity: [] as Array<string>
  } as IAccount;

  for (let i = 0; i < account.identity.length; i++) {
    var decryptedData = await decrypt(account.identity[i][0].address, keys, iv);
    iAccount.identity[i] = textDec.decode(decryptedData);
  }

  return iAccount;
}

export const checkPassword = async (accountId: number = 0, password: string) => {
  const res = await db.get('account', accountId);
  const passHash = createHash('sha256').update(password).digest('base64');
  // @ts-ignore
  return (res.password === passHash);
}

export const retrievePrivateKey = async (accountId: number = 0) => {
  const res = await db.get('account', accountId) as EAccount;
  // @ts-ignore

  var keys = await importKey();

  var decryptedData = await decrypt(res.privateKey, keys, iv);
  return textDec.decode(decryptedData);
};

export const getIdentityCount = async (accountId: number = 0) => {
  const res = await db.get('account', accountId);
  // @ts-ignore
  return res.identity.length;
}

createDB();

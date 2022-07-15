import { openDB, IDBPDatabase } from 'idb';
import config from '../../config/db'
import { AccountSchema, EAccount, IAccount } from './schema';
import createHash from 'create-hash';
import { encrypt, decrypt, importKey, generateKey } from '@utils/subtleCrypto';

let db: IDBPDatabase<AccountSchema>;


export const createDB = async (dbName: string = config.name) => {
  db = await openDB<AccountSchema>(dbName, 1, {
    upgrade: db => {
      db.createObjectStore("account", { autoIncrement: true })
    }
  });
}

export const insertAccount = async (account: IAccount) => {
  const accountCount = await db.count('account');

  var keys = await importKey()
  var iv = new Uint8Array([188, 185, 57, 146, 246, 194, 116, 34, 12, 80, 198, 76]);
  var enc = new TextEncoder();

  var eAccount = {
    password: account.password,
    privateKey: await encrypt(enc.encode(account.privateKey), keys, iv),
    privateExtendedKey: await encrypt(enc.encode(account.privateExtendedKey), keys, iv),
    address: [] as Array<ArrayBuffer>
  } as EAccount;


  for (let i = 0; i < account.address.length; i++) {
    var data = enc.encode(account.address[i]);
    eAccount.address[i] = await encrypt(data, keys, iv);
  }

  db.add("account", eAccount, accountCount);
}

export const insertIdentity = async (identity: string, accountId: number = 0) => {
  const account = await db.get('account', accountId) as EAccount;
  // @ts-ignore

  var keys = await importKey()
  var iv = new Uint8Array([188, 185, 57, 146, 246, 194, 116, 34, 12, 80, 198, 76]);
  var enc = new TextEncoder();

  var data = enc.encode(identity);
  account.address[account.address.length] = await encrypt(data, keys, iv);
  // @ts-ignore
  db.put('account', account, accountId);
}

export const getAccount = async (accountId: number = 0) => {
  var keys = await importKey()
  var iv = new Uint8Array([188, 185, 57, 146, 246, 194, 116, 34, 12, 80, 198, 76]);
  var enc = new TextDecoder("utf-8");

  const account = await db.get('account', accountId) as EAccount;
  const iAccount = {
    password: account.password,
    privateKey: enc.decode(await decrypt(account.privateKey, keys, iv)),
    privateExtendedKey: enc.decode(await decrypt(account.privateExtendedKey, keys, iv)),
    address: [] as Array<string>
  } as IAccount;

  for (let i = 0; i < account.address.length; i++) {
    var decryptedData = await decrypt(account.address[i], keys, iv);
    iAccount.address[i] = enc.decode(decryptedData);
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

  var keys = await importKey()
  var iv = new Uint8Array([188, 185, 57, 146, 246, 194, 116, 34, 12, 80, 198, 76]);
  var enc = new TextDecoder("utf-8");

  var decryptedData = await decrypt(res.privateKey, keys, iv);
  return enc.decode(decryptedData);
};

export const getIdentityCount = async (accountId: number = 0) => {
  const res = await db.get('account', accountId);
  // @ts-ignore
  return res.address.length;
}

createDB();

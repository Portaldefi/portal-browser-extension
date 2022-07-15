import { openDB, IDBPDatabase } from 'idb';
import config from '../../config/db'
import { AccountSchema, IAccount } from './schema';
import createHash from 'create-hash';

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
  db.add("account", account, accountCount);
}

export const insertIdentity = async (identity: string, accountId: number = 0) => {
  const account = await db.get('account', accountId);
  // @ts-ignore
  account.address[account.address.length] = identity;
  // @ts-ignore
  db.put('account', account, accountId);
}

export const getAccount = async (accountId: number = 0) => {
  const res = await db.get('account', accountId);
  return res;
}

export const checkPassword = async (accountId: number = 0, password: string) => {
  const res = await db.get('account', accountId);
  const passHash = createHash('sha256').update(password).digest('base64');
  // @ts-ignore
    return (res.password === passHash);
}

export const retrievePrivateKey = async (accountId: number = 0) => {
  const res = await db.get('account', accountId);
  // @ts-ignore
  return res.privateKey;
};

export const getIdentityCount = async (accountId: number = 0) => {
  const res = await db.get('account', accountId);
  // @ts-ignore
  return res.address.length;
}

createDB();

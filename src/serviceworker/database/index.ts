import { openDB, IDBPDatabase } from 'idb';
import config from '../../config/db'
import { AccountSchema, IAccount } from './schema';

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

export const getAccount = async (accountId: number = 0) => {
  const res = await db.get('account', accountId);
  return res;
}

export const checkPassword = async (accountId: number = 0, password: string) => {
  const res = await db.get('account', accountId);
  // @ts-ignore
  console.log('wa' + (res.password === password));
  // @ts-ignore
  return (res.password === password);
}

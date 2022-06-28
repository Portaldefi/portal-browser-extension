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
  console.log(db);
  const accountCount = await db.count('account');
  db.add("account", account, accountCount);
}

export const getAccount = async (accountId: number = 0) => {
  const count = await db.count('account');
  console.log(count);
  const res = await db.get('account', accountId);
  console.log(res);
  return res;
}

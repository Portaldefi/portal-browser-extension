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
  db.add("account", account);
}

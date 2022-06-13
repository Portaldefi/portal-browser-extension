import { openDB, IDBPDatabase } from 'idb';
import config from '../../config/db'
import { AccountSchema } from './schema';

let db: IDBPDatabase<AccountSchema>;

export const createDB = async (dbName: string = config.name) => {
  db = await openDB(dbName);
  
}
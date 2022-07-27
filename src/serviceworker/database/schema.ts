import { DBSchema } from 'idb';
import { IIdentity } from '../../types/identity';

export interface IAccount {
  password: string,
  privateKey: any,
  identity: Array<IIdentity>,
  privateExtendedKey: any
};


export interface AccountSchema extends DBSchema {
  account: {
    key: number,
    value: IAccount
  }
}
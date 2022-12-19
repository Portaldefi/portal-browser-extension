import { DBSchema } from 'idb';
import { IIdentity } from '../../types/identity';

export interface IAccount {
  settings: null,
  publicKey: string,
  identities: Array<IIdentity>,
  password: string
};

export interface AccountSchema extends DBSchema {
  account: {
    key: number,
    value: IAccount
  }
}
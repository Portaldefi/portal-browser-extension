import { DBSchema } from 'idb';
import { IIdentity } from '../../types/identity';

export interface IAccount {
  password: string,
  privateKey: string,
  address: Array<string>,
  privateExtendedKey: string
};


export interface EAccount {
  password: string,
  privateKey: ArrayBuffer,
  address: Array<ArrayBuffer>,
  privateExtendedKey: ArrayBuffer
};


export interface AccountSchema extends DBSchema {
  account: {
    key: number,
    value: EAccount
  }
}
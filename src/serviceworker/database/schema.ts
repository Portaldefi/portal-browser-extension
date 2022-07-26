import { DBSchema } from 'idb';
import { IIdentity } from '../../types/identity';

export interface IAccount {
  password: string,
  privateKey: string,
  identity: Array<string>,
  privateExtendedKey: string
  chainAcceptStates: any
};

export interface ChainState {
  name: string,
  state: boolean
};

export interface EAccount {
  password: string,
  privateKey: ArrayBuffer,
  identity: Array<IIdentity>,
  privateExtendedKey: ArrayBuffer,
  chainAcceptStates: any
};


export interface AccountSchema extends DBSchema {
  account: {
    key: number,
    value: EAccount
  }
}
import { IAddress } from './identity';

export interface IKey {
  privateKey: string,
  privateExtendedKey: string,
  identity: Array<string>,
  selectedIdentity: string,
  selectedId: number
}

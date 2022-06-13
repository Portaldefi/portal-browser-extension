import { IAddress } from './identity';

export interface IKey {
  privateKey: string,
  privateExtendedKey: string,
  address: Array<string>,
  selectedAddress: IAddress,
}

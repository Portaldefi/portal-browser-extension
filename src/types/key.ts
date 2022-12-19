import { IIdentity } from './identity';

export interface IKey {
  privateKey: string,
  privateExtendedKey: string,
  identity: Array<IIdentity>,
  selectedIdentity: string,
  selectedId: number,
  selectedChain: string
}

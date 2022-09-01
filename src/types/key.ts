import { IIdentity } from './identity';

export interface IKey {
  privateKey: string,
  privateExtendedKey: string,
  identity: Array<IIdentity>,
  selectedIdentityId: number,
  selectedChainId: number
}

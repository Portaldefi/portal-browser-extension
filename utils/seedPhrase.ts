import * as bip39 from 'bip39';
import createHash from 'create-hash';
import HDKey from 'hdkey';
import { retrievePrivateKey, getIdentityCount, insertIdentity } from '@/serviceworker/database';
import { IAccount } from '@/serviceworker/database/schema';
import { IChain, IIdentity } from '@/types/identity';
import chains from '@/config/chains';

const Identity = require('@fabric/core/types/identity');


export const generateSeed = () => {
  try {
    const mnemonic = bip39.generateMnemonic();

    return mnemonic.split(' ');
  } catch (err) {
    throw err;
  }
};

/**
* Function that generates an account object with supplied mnemonic seed phrase and encryption password
* @param    {[mnemonic]}  An array of seed words
* @param    {password}    encryption password set in wallet initialization
* @return   {IAccount}         account object generated with supplied seed and password
*/
export const generateAccount = async (mnemonic: any[], password: any) => {
  let _mnemonic;
  if (typeof mnemonic === 'object') {
    _mnemonic = mnemonic.join(' ');
  } else {
    _mnemonic = mnemonic;
  }

  const _seed = await bip39.mnemonicToSeed(_mnemonic);
  const hdKey = HDKey.fromMasterSeed(_seed);

  const privateKey = hdKey.privateExtendedKey;

  const result = {
    privateKey: privateKey.toString(),
    privateExtendedKey: hdKey.privateExtendedKey,
    identity: [],
    password: createHash('sha256').update(password).digest('base64')
  } as IAccount;


  for (let i = 0; i < 10; i++) {
    result.identity[i] = [] as IIdentity;
    for (let j = 0; j < chains.length; j++) {
      const identity = new Identity({
        accountId: i,
        index: j
      });
      result.identity[i][j] = {
        address: identity.toString(),//generateAddressFromPvtKey(result.privateKey, j, i),
        allowed: true
      } as IChain;
    }
  }

  return result;
};
/*
export const generateAddressFromPvtKey = (privateKey: any, chainNo = 0, addressNo = 0) => {
  const hdKey = HDKey.fromExtendedKey(privateKey.toString());
  const addrNode = hdKey.derive(getDerivationPathOfChain(chainNo, addressNo) as string);

  const step2 = createHash('sha256').update(addrNode.publicKey).digest();
  const step3 = createHash('rmd160').update(step2).digest();
  const step4 = Buffer.allocUnsafe(21);
  step4.writeUInt8(0x00, 0);
  step3.copy(step4, 1);

  const address = bs58check.encode(step4);

  return address;
}
*/
/*
export const getDerivationPathOfChain = (chainNo: number, addrNo: number) => {
  return `${chains[chainNo].path}${addrNo}`;
}
*/

export const generateIdentity = async () => {
  const key = await retrievePrivateKey();
  const idCnt = await getIdentityCount();

  let identity = [] as IIdentity;
  for (let i = 0; i < chains.length; i++) {
    const identity = new Identity({
      accountID: idCnt,
      index: i
    });
    identity[i] = {
      address: identity.toString(),//generateAddressFromPvtKey(key, 0, idCnt),
      allowed: true
    } as IChain;
  }

  insertIdentity(identity, 0);

  return identity;
}

import * as bip39 from 'bip39';
import * as createHash from 'create-hash';
import * as HDKey from 'hdkey';
import * as bs58check from 'bs58check';

// const bip32 = Bip32Factory(ecc);

export const generateSeed = () => {
  try {
    const mnemonic = bip39.generateMnemonic();

    return mnemonic.split(' ');
  } catch (err) {
    throw err;
  }
}

export const generateAddress = async (mnemonic: any[]) => {
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
    address: [''],
  };
  for (let i = 0; i < 10; i ++) {
    result.address[i] = generateAddressFromPvtKey(result.privateKey, i);
  }

  // console.log(getAddress(bip32.fromSeed(_seed)));
  return result;
}

export const generateAddressFromPvtKey = (privateKey:any, addressNo = 0) => {
  const hdKey = HDKey.fromExtendedKey(privateKey.toString());
  const addrNode = hdKey.derive(`m/44'/0'/0'/${addressNo}`);

  const step2 = createHash('sha256').update(addrNode.publicKey).digest();
  const step3 = createHash('rmd160').update(step2).digest();
  const step4 = Buffer.allocUnsafe(21);
  step4.writeUInt8(0x00, 0);
  step3.copy(step4, 1);

  const address = bs58check.encode(step4);

  return address;
}
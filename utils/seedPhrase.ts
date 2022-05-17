import * as bip39 from 'bip39';

export const generateSeed = () => {
  try {
    const mnemonic = bip39.generateMnemonic();

    return mnemonic.split(' ');
  } catch (err) {
    throw err;
  }
}
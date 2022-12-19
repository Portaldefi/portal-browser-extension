import { decryptFromString, encryptToString, generateKey, getIVFromPwd, importKey } from '../../utils/encryption';
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

describe('Encryption Methods Test', () => {
  it('getIVFromPwd', () => {
    expect(getIVFromPwd('123')).toEqual(new Uint8Array([
        49,
        50,
        51,
        70,
        78,
        86,
        112,
        127,
        142,
        175,
        197,
        219
    ]));
  });

  /*it('importKey', async () => {
    const crypto = require('crypto');
    Object.defineProperty(global.self, 'crypto', {
      value: {
        subtle: crypto.webcrypto.subtle,
      }
    });
    await expect(importKey()).resolves.toEqual({});
  });

  it('generateKey', async () => {
    const crypto = require('crypto');
    Object.defineProperty(global.self, 'crypto', {
      value: {
        subtle: crypto.webcrypto.subtle,
      }
    });
    await expect(generateKey()).resolves.toEqual({});
  });*/

  it('check encryption with number', async () => {
    const crypto = require('crypto');
    Object.defineProperty(global.self, 'crypto', {
      value: {
        subtle: crypto.webcrypto.subtle,
      }
    });
    let res = await encryptToString('a', 10);
    await expect(decryptFromString('a', res)).resolves.toEqual("10");
  });

  it('check encryption with string', async () => {
    const crypto = require('crypto');
    Object.defineProperty(global.self, 'crypto', {
      value: {
        subtle: crypto.webcrypto.subtle,
      }
    });
    let res = await encryptToString('key', 'Anything is encrypted');
    await expect(decryptFromString('key', res)).resolves.toEqual('Anything is encrypted');
  });

  it('check encryption not working', async () => {
    const crypto = require('crypto');
    Object.defineProperty(global.self, 'crypto', {
      value: {
        subtle: crypto.webcrypto.subtle,
      }
    });
    let res = await encryptToString('key', 'Anything is encrypted');
    await expect(decryptFromString('another', res)).rejects.toThrow('Cipher job failed');
  });
  afterAll(() => jest.resetModules());
});

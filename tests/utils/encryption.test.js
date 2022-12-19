import { encryptToString, generateKey, getIVFromPwd, importKey } from '../../utils/encryption';
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

  /*it('encryptToString with string', async () => {
    const crypto = require('crypto');
    Object.defineProperty(global.self, 'crypto', {
      value: {
        subtle: crypto.webcrypto.subtle,
      }
    });
    expect('123').toMatch(/1/);
    await expect(encryptToString('a', 10)).resolves.toBe('1*ûa⌂«T1.ñ0¸ï[jõ´');
  });

  it('encryptToString with array', async () => {
    const crypto = require('crypto');
    Object.defineProperty(global.self, 'crypto', {
      value: {
        subtle: crypto.webcrypto.subtle,
      }
    });
    console.log(encryptToString('mine', {a: '1', b: '2'}));
    await expect(encryptToString('mine', {a: '1', b: '2'})).resolves.toBe('a→ºûv{Ä(¯♂öePYöÏs');
  });*/
  afterAll(() => jest.resetModules());
});

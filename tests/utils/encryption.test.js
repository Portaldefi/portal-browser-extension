import { getIVFromPwd, importKey } from '../../utils/encryption';

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
  afterAll(() => jest.resetModules());
});
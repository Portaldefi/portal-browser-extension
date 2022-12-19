// import renderer from 'react-test-renderer';
import { describe, expect, test } from '@jest/globals';
import { shortenString, dateToString } from '../../utils/helpers';

describe('shortenString test', () => {
  test('length > 9', () => {
    expect(shortenString('this string has length of more than 9')).toEqual(
      'this s...n 9'
    );
  });
  test('length < 9', () => {
    expect(shortenString('its < 9')).toEqual(
      'its < 9'
    );
  });
});

describe('dateToString test', () => {
  test('test 1', () => {
    expect(dateToString(new Date(1999, 0, 1))).toEqual('1999-1-1');
  });
  test('test 2', () => {
    expect(dateToString(new Date(10, -10, 1))).toEqual('1909-3-1');
  });
});
// import renderer from 'react-test-renderer';
import {describe, expect, test} from '@jest/globals';
import { cutter } from '../../utils/text';

describe('cuts the text that is passed', () => {
  test('text.length < length', () => {
    const string = "cutStringSmallerThanLength"
    expect(cutter(string, 30)).toEqual("cutStringSmallerThanLength");
  });

  test('text.length > length', () => {
    const string2 = "cutStringGreaterThanLength"
    expect(cutter(string2)).toEqual("cutS...gth");

  });

  test('text.length = length', () => {
    const string3 = "cutStringEqualToLength"
    expect(cutter(string3, 22)).toEqual("cutStringEqualTo...gth");
  });
  // 

  // 

  // 

});
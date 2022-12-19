import SettingItem from './index';
import { create, act } from 'react-test-renderer';

describe('SettingItem', () => {
  it('should work', () => {
    let tree;
    act(() => {
      tree = create(
        <SettingItem />
      );
    });

    expect(tree).toMatchSnapshot();
  });
  afterAll(() => jest.resetModules());
});
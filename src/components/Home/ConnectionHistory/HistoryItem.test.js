import HistoryItem from './HistoryItem';
import { create, act } from 'react-test-renderer';

describe('HistoryItemComponent', () => {
  it('should work', () => {
    let tree;
    act(() => {
      tree = create(
        <HistoryItem />
      );
    });

    expect(tree).toMatchSnapshot();
  });
  afterAll(() => jest.resetModules());
});
import GlobalChainItem from './GlobalChainItem';
import { create, act } from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

describe('GlobalChainItemComponent', () => {
  it('should work', async () => {
    let tree;
    act(() => {
      tree = create(
        <BrowserRouter>
          <GlobalChainItem />
        </BrowserRouter>
      );
    });

    expect(tree).toMatchSnapshot();
  });
  afterAll(() => jest.resetModules());
});
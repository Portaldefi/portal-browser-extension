import ConnectionView from './index';
import { create, act } from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

describe('ConnectionViewComponent', () => {


  it('should work', async () => {
    let tree;
    act(() => {
      tree = create(
        <BrowserRouter>
          <ConnectionView />
        </BrowserRouter>
      );
    });

    expect(tree).toMatchSnapshot();
  });
  afterAll(() => jest.resetModules());
});

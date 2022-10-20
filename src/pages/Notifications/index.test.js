import Access from './Access';
import { create, act } from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

describe('AccessComponent', () => {


  it('should work', async () => {
    let tree;
    act(() => {
      tree = create(
        <BrowserRouter>
          <Access />
        </BrowserRouter>
      );
    });

    expect(tree).toMatchSnapshot();
  });
  afterAll(() => jest.resetModules());
});
import AddDuressKey from './AddDuressKey';
import { create, act } from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

describe('AddDuressKeyComponent', () => {
  it('should work', async () => {
    let tree;
    act(() => {
      tree = create(
        <BrowserRouter>
          <AddDuressKey />
        </BrowserRouter>
      );
    });

    expect(tree).toMatchSnapshot();
  });
  afterAll(() => jest.resetModules());
});
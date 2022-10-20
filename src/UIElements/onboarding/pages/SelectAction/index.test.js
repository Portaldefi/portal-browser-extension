import SelectAction from './index';
import { create, act } from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

describe('SelectActionComponent', () => {
  it('should work', async () => {
    let tree;
    act(() => {
      tree = create(
        <BrowserRouter>
            <SelectAction />
        </BrowserRouter>,
      );
    });

    expect(tree).toMatchSnapshot();
  });
  afterAll(() => jest.resetModules());
});
import ChainItem from './ChainItem';
import { create, act } from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Checkbox, Grid, Header } from 'semantic-ui-react';

describe('ChainItemComponent', () => {
  it('should work', async () => {
    let tree;
    act(() => {
      tree = create(
        <BrowserRouter>
          <ChainItem />
        </BrowserRouter>
      );
    });

    expect(tree).toMatchSnapshot();
  });
  afterAll(() => jest.resetModules());
});
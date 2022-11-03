import ConnectionHistory from './index';
import { create, act } from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { List } from 'semantic-ui-react';

describe('ConnectionHistory', () => {
  it('should work', () => {
    let tree;
    act(() => {
      tree = create(
        <BrowserRouter>
          <ConnectionHistory />
        </BrowserRouter>
      );
    });

    expect(tree).toMatchSnapshot();
  });
  it('button click', () => {
    let tree;
    act(() => {
      tree = create(
        <BrowserRouter>
          <ConnectionHistory />
        </BrowserRouter>
      );
    });

    const items = tree.root.findAllByType(List.Item);
    act(() => items[0].props.onClick());
    expect(tree).toMatchSnapshot();
  });
  afterAll(() => jest.resetModules());
});
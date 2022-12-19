import SelectAction from './index';
import { create, act } from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

describe('SelectActionComponent', () => {
  it('should work', () => {
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
  it('button clicks', () => {
    let tree;
    act(() => {
      tree = create(
        <BrowserRouter>
            <SelectAction />
        </BrowserRouter>,
      );
    });

    const buttons = tree.root.findAllByType(Button);
    act(() => buttons[0].props.onClick());
    act(() => buttons[1].props.onClick());
    expect(tree).toMatchSnapshot();
  });
  afterAll(() => jest.resetModules());
});
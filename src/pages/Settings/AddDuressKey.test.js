import AddDuressKey from './AddDuressKey';
import { create, act } from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';

describe('AddDuressKeyComponent', () => {
  it('should work', () => {
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
  it('functions should work', async () => {
    let tree;
    act(() => {
      tree = create(
        <BrowserRouter>
          <AddDuressKey />
        </BrowserRouter>
      );
    });

    const button = tree.root.findByType(Button);
    await act(() => button.props.onClick());
    expect(tree).toMatchSnapshot();

    const input = tree.root.findByType(Form.Input);
    act(() => input.props.onChange({
      target: {
        value: 'test'
      }
    }));
    expect(tree).toMatchSnapshot();
  });
  afterAll(() => jest.resetModules());
});
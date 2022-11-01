import Intro from './index';
import { create, act } from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

describe('IntroComponent', () => {
  it('should work', () => {
    let tree;
    act(() => {
      tree = create(
        <BrowserRouter>
          <Intro />
        </BrowserRouter>
      );
    });

    expect(tree).toMatchSnapshot();
  });
  it('buttons', () => {
    let tree;
    act(() => {
      tree = create(
        <BrowserRouter>
          <Intro />
        </BrowserRouter>
      );
    });

    const buttons = tree.root.findAllByType(Button);
    act(() => buttons[0].props.onClick());
    act(() => buttons[1].props.onClick());
    expect(tree).toMatchSnapshot();
  });
  afterAll(() => jest.resetModules());
});
import Welcome from './index';
import { create, act } from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

describe('WelcomeComponent', () => {
  it('should work', () => {
    let tree;
    act(() => {
      tree = create(
        <BrowserRouter>
          <Welcome />
        </BrowserRouter>
      );
    });

    expect(tree).toMatchSnapshot();
  });
  afterAll(() => jest.resetModules());
});
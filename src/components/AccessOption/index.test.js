import AccessOption from './index';
import { create, act } from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

describe('AccessOptionComponent', () => {
  it('should work', () => {
    let tree;
    act(() => {
      tree = create(
        <BrowserRouter>
          <AccessOption />
        </BrowserRouter>
      );
    });

    expect(tree).toMatchSnapshot();
  });
  afterAll(() => jest.resetModules());
});
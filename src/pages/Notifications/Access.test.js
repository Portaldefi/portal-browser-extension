import Access from './Access';
import { create, act } from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

describe('AccessComponent', () => {
  it('should work', () => {
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
});

import IdentityItem from './IdentityItem';
import { create, act } from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

describe('IdentityItemComponent', () => {
  it('should work', () => {
    let tree;
    act(() => {
      tree = create(
        <BrowserRouter>
          <IdentityItem />
        </BrowserRouter>
      );
    });

    expect(tree).toMatchSnapshot();
  });
  afterAll(() => jest.resetModules());
});
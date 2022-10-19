import Intro from './index';
import { create, act } from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

describe('IntroComponent', () => {


  it('should work', async () => {
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
  afterAll(() => jest.resetModules());
});
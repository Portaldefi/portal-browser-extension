import { render, screen } from '@testing-library/react';
import Welcome from './index';

describe('WelcomeComponent', () => {
  it('should work', async () => {
    let tree;
    act(() => {
      tree = create(
        <Welcome />,
      );
    });

    expect(tree).toMatchSnapshot();
  });
  afterAll(() => jest.resetModules());
});
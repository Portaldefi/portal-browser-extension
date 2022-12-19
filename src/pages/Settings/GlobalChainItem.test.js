import GlobalChainItem from './GlobalChainItem';
import { create, act } from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Checkbox } from 'semantic-ui-react';

describe('GlobalChainItemComponent', () => {
  let handleSetCheckState, index;
  beforeEach(() => {
    handleSetCheckState = jest.fn();
    index = 0;
  });
  it('should work', () => {
    let tree;
    act(() => {
      tree = create(
        <BrowserRouter>
          <GlobalChainItem
            handleSetCheckState={handleSetCheckState}
            index={index} />
        </BrowserRouter>
      );
    });
    expect(tree).toMatchSnapshot();
  });
  it('checkbox should work', () => {
    let tree;
    act(() => {
      tree = create(
        <BrowserRouter>
          <GlobalChainItem
            handleSetCheckState={handleSetCheckState}
            index={index} />
        </BrowserRouter>
      );
    });
    const item = tree.root.findByType(Checkbox);
    act(() => item.props.onChange({
      target: {
        value: true
      }
    }));
    expect(tree).toMatchSnapshot();
    expect(handleSetCheckState).toHaveBeenCalledWith(
      index,
      true
    );
  });
  afterAll(() => jest.resetModules());
});
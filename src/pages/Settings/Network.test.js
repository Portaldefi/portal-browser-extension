import Network from './Network';
import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store'
import { List } from 'semantic-ui-react';

describe('NetworkComponent', () => {
  const initialState = {
    menu: {
      items: []
    },
    key: {
      privateKey: '',
      privateExtendedKey: '',
      identity: [],
      selectedIdentityId: 0,
      selectedChainId: 0
    }
  }
  const mockStore = configureStore()
  let store


  it('should work', () => {
    let tree;
    act(() => {
      store = mockStore(initialState)
      tree = create(
        <Provider store={store}>
          <BrowserRouter>
            <Network />
          </BrowserRouter>
        </Provider>
      );
    });
    expect(tree).toMatchSnapshot();

    const items = tree.root.findAllByType(List.Item);
    act(() => items[0].props.onClick());
    expect(tree).toMatchSnapshot();
  });
  afterAll(() => jest.resetModules());
});
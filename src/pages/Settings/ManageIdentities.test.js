import ManageIdentities from './ManageIdentities';
import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store'
import { List } from 'semantic-ui-react';

describe('ManageIdentitiesComponent', () => {
  const initialState = {
    menu: {
      items: []
    },
    key: {
      privateKey: '',
      privateExtendedKey: '',
      identity: [
        [{
          address: 'test address'
        }]
      ],
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
            <ManageIdentities />
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
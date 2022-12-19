import ChainSelector from './index';
import { create, act } from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';

describe('ChainSelector', () => {
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
  };
  const mockStore = configureStore();
  let store;
  it('should work', () => {
    let tree;
    act(() => {
      store = mockStore(initialState);
      tree = create(
        <Provider store={store}>
          <ChainSelector />
        </Provider>
      );
    });

    expect(tree).toMatchSnapshot();
  });
  afterAll(() => jest.resetModules());
});
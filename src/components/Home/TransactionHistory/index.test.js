import Connectionitem from './ConnectionItem';
import TransactionItem from './TransactionItem';
import { create, act } from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('TransactionHistory', () => {
  const initialState = {
    menu: {
      items: [],
      transactions: [{
        txid: '',
        status: {
          block_time: '',
          confirmed: true,
        },
        vout: [{value: 0}]
      }]
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
  it('ConnectionItem', () => {
    let tree;
    act(() => {
      tree = create(
        <Connectionitem />
      );
    });

    expect(tree).toMatchSnapshot();
  });
  it('TransactionItem', () => {
    let tree;
    act(() => {
      store = mockStore(initialState);
      tree = create(
        <Provider store={store}>
          <BrowserRouter>
            <TransactionItem id={0}/>
          </BrowserRouter>
        </Provider>
      );
    });

    expect(tree).toMatchSnapshot();
  });
  afterAll(() => jest.resetModules());
});
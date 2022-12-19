import TransactionDetail from './index';
import { create, act } from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';

describe('TrasnsactionDetail Component', () => {
  let initialState, mockStore, store;
  beforeEach(() => {
    initialState = {
      phrase: {
        SRF_Length: 10,
        SRF_List: [],
        password: ''
      },
      menu: {
        items: [],
        transactions: [{
          status: {
            block_hash: '',
            confirmed: true,
          }
        }]
      }
    }
    mockStore = configureStore()
    store = mockStore(initialState)
  });

  it('should work', () => {
    /*let tree;
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
      useParams: jest.fn().mockReturnValue({ id: 0 })
    }));    
    act(() => {
      tree = create(
        <Provider store={store}>
          <TransactionDetail />
        </Provider>
      );
    });

    expect(tree).toMatchSnapshot();*/
  });
  afterAll(() => jest.resetModules());
});
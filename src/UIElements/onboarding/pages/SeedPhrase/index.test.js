import SeedPhrase from './index';
import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store'

describe('SeedPhraseComponent', () => {
  const initialState = {
    phrase: {
      SRF_Length: 0,
      SRF_List: [],
      password: ''
    },
    menu: {
      items: []
    }
  }
  const mockStore = configureStore()
  let store


  it('should work', async () => {
    let tree;
    act(() => {
      store = mockStore(initialState)
      tree = create(
        <Provider store={store}>
          <BrowserRouter>
            <SeedPhrase />
          </BrowserRouter>
        </Provider>
      );
    });

    expect(tree).toMatchSnapshot();
  });
  afterAll(() => jest.resetModules());
});
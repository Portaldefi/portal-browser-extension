import RestoreSeedPhrase from './index';
import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store'
import { Button } from 'semantic-ui-react';

describe('RestoreSeedPhraseComponent', () => {
  let initialState, mockStore, store;
  beforeEach(() => {
    initialState = {
      phrase: {
        SRF_Length: 10,
        SRF_List: [],
        password: ''
      },
      menu: {
        items: []
      }
    }
    mockStore = configureStore()
    store = mockStore(initialState)
  });

  it('should work', async () => {
    let tree;
    act(() => {
      tree = create(
        <Provider store={store}>
          <BrowserRouter>
            <RestoreSeedPhrase />
          </BrowserRouter>
        </Provider>
      );
    });

    expect(tree).toMatchSnapshot();
  });
  it('functions', async () => {
    let tree;
    act(() => {
      tree = create(
        <Provider store={store}>
          <BrowserRouter>
            <RestoreSeedPhrase />
          </BrowserRouter>
        </Provider>
      );
    });
    const buttons = tree.root.findAllByType(Button);
    act(() => buttons[0].props.onClick());
    act(() => buttons[1].props.onClick());
    expect(tree).toMatchSnapshot();
  });
  afterAll(() => jest.resetModules());
});
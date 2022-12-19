import SeedPhrase from './index';
import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store'
import { Button } from 'semantic-ui-react';

describe('SeedPhraseComponent', () => {
  let initialState, mockStore, store;
  beforeEach(() => {
    initialState = {
      phrase: {
        SRF_Length: 10,
        SRF_List: ["123", "asdf"],
        password: ''
      },
      menu: {
        items: []
      }
    }
    mockStore = configureStore()
    store = mockStore(initialState)
  });

  it('should work', () => {
    let tree;
    act(() => {
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
  it('functions', () => {
    let tree;
    act(() => {
      tree = create(
        <Provider store={store}>
          <BrowserRouter>
            <SeedPhrase />
          </BrowserRouter>
        </Provider>
      );
    });
    const buttons = tree.root.findAllByType(Button);
    act(() => buttons[0].props.onClick());
    expect(tree).toMatchSnapshot();
  });
  afterAll(() => jest.resetModules());
});
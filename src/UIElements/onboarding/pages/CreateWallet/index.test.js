import CreateWallet from './index';
import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store'
import { Button, Form } from 'semantic-ui-react';

describe('CreateWalletComponent', () => {
  let initialState;
  let mockStore;
  let store;
  let jsdomAlert;
  beforeEach(() => {
    initialState = {
      phrase: {
        SRF_Length: 0,
        SRF_List: [],
        password: ''
      },
      menu: {
        items: []
      }
    }
    mockStore = configureStore()
    store = mockStore(initialState);
    jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => {};  // provide an empty implementation for window.alert
  });

  it('should work', async () => {
    let tree;
    act(() => {
      tree = create(
        <Provider store={store}>
          <BrowserRouter>
            <CreateWallet />
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
            <CreateWallet />
          </BrowserRouter>
        </Provider>
      );
    });

    const buttons = tree.root.findAllByType(Button);
    act(() => buttons[0].props.onClick());
    expect(tree).toMatchSnapshot();
    act(() => buttons[1].props.onClick());
    expect(tree).toMatchSnapshot();

    const inputs = tree.root.findAllByType(Form.Input);
    act(() => inputs[0].props.onChange({
      target: {
        value: "1123"
      }
    }));
    expect(tree).toMatchSnapshot();
  });
  afterAll(() => {
    jest.resetModules();
    window.alert = jsdomAlert;  // restore the jsdom alert
  });
});

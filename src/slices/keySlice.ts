import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IKey } from '../types/key';

// interface menuState {
  // items: Array<IMenuItem>
// }

const initialState: IKey = {
  privateKey: '',
  privateExtendedKey: '',
  address: [],
  selectedAddress: '',
  selectedId: 0
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setKeys: (state: IKey, action: PayloadAction<IKey>) => {
      state.privateKey = action.payload.privateKey;
      state.privateExtendedKey = action.payload.privateExtendedKey;
      state.address = action.payload.address;
      state.selectedAddress = state.address[0];
      state.selectedId = 0;
    },
    selectAddress: (state: IKey, action: PayloadAction<string | number>) => {
      if (typeof action.payload === 'number') {
        state.selectedAddress = state.address[action.payload];
        state.selectedId = action.payload;
      } else {
        state.selectedAddress = action.payload;
        for (let i = 0; i < state.address.length; i++)
          if (state.selectedAddress == state.address[i])
            state.selectedId = i;
      }
    },
    addAddress: (state: IKey, action: PayloadAction<string>) => {
      state.address.push(action.payload);
    }
  }
});

export const { setKeys, selectAddress, addAddress } = menuSlice.actions;

export default menuSlice.reducer;

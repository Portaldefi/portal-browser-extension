import { IIdentity } from '@/types/identity';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IKey } from '../types/key';

// interface menuState {
// items: Array<IMenuItem>
// }

const initialState: IKey = {
  privateKey: '',
  privateExtendedKey: '',
  identity: [],
  selectedIdentity: '',
  selectedId: 0,
  selectedChain: 'ethereum'
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setKeys: (state: IKey, action: PayloadAction<IKey>) => {
      state.privateKey = action.payload.privateKey;
      state.privateExtendedKey = action.payload.privateExtendedKey;
      state.identity = action.payload.identity;
      state.selectedIdentity = state.identity[0][0].address;
      state.selectedId = 0;
    },
    selectAddress: (state: IKey, action: PayloadAction<string | number>) => {
      if (typeof action.payload === 'number') {
        state.selectedIdentity = state.identity[action.payload][0].address;
        state.selectedId = action.payload;
      } else {
        state.selectedIdentity = action.payload;
        for (let i = 0; i < state.identity.length; i++)
          if (state.selectedIdentity == state.identity[i][0].address)
            state.selectedId = i;
      }
    },
    addIdentity: (state: IKey, action: PayloadAction<IIdentity>) => {
      state.identity.push(action.payload);
    },
    selectChain: (state: IKey, action: PayloadAction<string>) => {
      state.selectedChain = action.payload;
    }
  }
});

export const { setKeys, selectAddress, addIdentity, selectChain } = menuSlice.actions;

export default menuSlice.reducer;

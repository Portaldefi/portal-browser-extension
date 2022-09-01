import { IChainState } from '@/types/chainstate';
import { IIdentity } from '@/types/identity';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IKey } from '../types/key';

const initialState: IKey = {
  privateKey: '',
  privateExtendedKey: '',
  identity: [],
  selectedIdentityId: 0,
  selectedChainId: 0
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setKeys: (state: IKey, action: PayloadAction<IKey>) => {
      state.privateKey = action.payload.privateKey;
      state.privateExtendedKey = action.payload.privateExtendedKey;
      state.identity = action.payload.identity;
      state.selectedIdentityId = 0;
    },
    selectIdentity: (state: IKey, action: PayloadAction<number>) => {
      state.selectedIdentityId = action.payload;
    },
    addIdentity: (state: IKey, action: PayloadAction<IIdentity>) => {
      state.identity.push(action.payload);
    },
    selectChain: (state: IKey, action: PayloadAction<number>) => {
      state.selectedChainId = action.payload;
    },
    setIdentityCheckState: (state: IKey, action: PayloadAction<IChainState>) => {
      state.identity[action.payload.identity][action.payload.chain].allowed = action.payload.state;
    }
  }
});

export const { setKeys, selectIdentity, addIdentity, selectChain, setIdentityCheckState } = menuSlice.actions;

export default menuSlice.reducer;

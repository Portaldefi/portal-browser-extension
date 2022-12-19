import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IMenuItem } from '../types/menu';

interface menuState {
  items: Array<IMenuItem>,
  transactions: Array<any>
}

const initialState: menuState = { items: [], transactions: [] };

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setItems: (state: menuState, action: PayloadAction<Array<IMenuItem>>) => {
      state.items = action.payload;
    },
    setTransactions: (state: menuState, action: PayloadAction<Array<any>>) => {
      state.transactions = action.payload;
    }
  }
});

export const { setItems, setTransactions } = menuSlice.actions;
export default menuSlice.reducer;

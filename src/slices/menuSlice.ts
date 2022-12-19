import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IMenuItem } from '../types/menu';

interface menuState {
  items: Array<IMenuItem>
}

const initialState: menuState = {
  items: []
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setItems: (state: menuState, action: PayloadAction<Array<IMenuItem>>) => {
      state.items = action.payload;
    }
  }
});

export const { setItems } = menuSlice.actions;

export default menuSlice.reducer;

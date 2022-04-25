import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface importState {
  SRF_Length: Number,
  SRF: Array<String>
}

const initialState: importState = {
  SRF_Length: 12,
  SRF: []
};

export const importSlice = createSlice({
  name: 'import',
  initialState,
  reducers: {
    setSRFLength: (state: importState, action: PayloadAction<Number>) => {
      state.SRF_Length = action.payload;
    }
  }
});

export const { setSRFLength } = importSlice.actions;

export default importSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface phraseState {
  SRF_Length: number,
  SRF_List: Array<string>
}

const initialState: phraseState = {
  SRF_Length: 12,
  SRF_List: []
};

export const phraseSlice = createSlice({
  name: 'phrase',
  initialState,
  reducers: {
    setSRFLength: (state: phraseState, action: PayloadAction<number>) => {
      state.SRF_Length = action.payload;
    },
    setSRFList: (state: phraseState, action: PayloadAction<Array<string>>) => {
      state.SRF_List = [...action.payload];
    }
  }
});

export const { setSRFLength, setSRFList } = phraseSlice.actions;

export default phraseSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface phraseState {
  SRF_Length: number,
  SRF_List: Array<string>,
  password: string
}

const initialState: phraseState = {
  SRF_Length: 0,
  SRF_List: [],
  password: ''
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
    },
    setPassword: (state: phraseState, action: PayloadAction<string>) => {
      state.password = action.payload;
    }
  }
});

export const { setSRFLength, setSRFList, setPassword } = phraseSlice.actions;

export default phraseSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TempState {
  dataJson: Object[],
  headers: String[],
}

let initialState: TempState = {
  dataJson: [],
  headers: [],
}

export const counterSlice = createSlice({
  name: 'dataJson',
  initialState,
  reducers: {
    setDataJson: (state, action: PayloadAction<Object[]>) => {
      state.dataJson = action.payload
    },
    clearDataJson: (state) => {
      state.dataJson = []
    },
    setHeaders: (state, action: PayloadAction<String[]>) => {
      state.headers = action.payload
    },
    clearHeaders: (state) => {
      state.headers = []
    },
  },
})

// Action creators are generated for each case reducer function
export const {setDataJson, clearDataJson, setHeaders, clearHeaders} = counterSlice.actions

export default counterSlice.reducer
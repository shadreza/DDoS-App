import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface TempState {
  tmpVariable: number
}

const initialState: TempState = {
  tmpVariable: 0,
}

export const counterSlice = createSlice({
  name: 'tmp',
  initialState,
  reducers: {
    incrementTemp: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.tmpVariable += 1
    },
    decrementTemp: (state) => {
      state.tmpVariable -= 1
    },
    incrementTempByAmount: (state, action: PayloadAction<number>) => {
      state.tmpVariable += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { incrementTemp, decrementTemp, incrementTempByAmount } = counterSlice.actions

export default counterSlice.reducer
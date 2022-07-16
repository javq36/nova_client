import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  inventory: [],
  isLoading: false,
}

export const fordSlice = createSlice({
  name: 'ford',
  initialState,
  reducers: {
    getInventory: (state, action) => {
        state.inventory = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { getInventory } = fordSlice.actions

export default fordSlice.reducer
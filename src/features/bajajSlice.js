import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  inventory: [],
  isLoading: false,
}

export const bajajSlice = createSlice({
  name: 'bajaj',
  initialState,
  reducers: {
    getInventory: (state, action) => {
        state.inventory = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { getInventory } = bajajSlice.actions

export default bajajSlice.reducer
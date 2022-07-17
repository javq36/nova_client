import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  inventory: [],
  isLoading: false,
}

export const fcaSlice = createSlice({
  name: 'bajaj',
  initialState,
  reducers: {
    getInventory: (state, action) => {
        state.inventory = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { getInventory } = fcaSlice.actions

export default fcaSlice.reducer
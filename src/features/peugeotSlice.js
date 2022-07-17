import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  inventory: [],
  isLoading: false,
}

export const peugeotSlice = createSlice({
  name: 'peugeot',
  initialState,
  reducers: {
    getInventory: (state, action) => {
        state.inventory = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { getInventory } = peugeotSlice.actions

export default peugeotSlice.reducer
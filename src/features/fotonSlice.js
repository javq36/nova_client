import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  inventory: [],
  isLoading: false,
}

export const fotonSlice = createSlice({
  name: 'foton',
  initialState,
  reducers: {
    getInventory: (state, action) => {
        state.inventory = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { getInventory } = fotonSlice.actions

export default fotonSlice.reducer
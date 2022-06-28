import { createSlice } from '@reduxjs/toolkit'
import { insuranceApi } from '../store/apis'

const initialState = {
  companies: [],
  isLoading: false,
}

export const insuranceSlice = createSlice({
  name: 'insuranceCompanies',
  initialState,
  reducers: {
    getCompanies: (state, action) => {
        state.companies = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { getCompanies } = insuranceSlice.actions

export default insuranceSlice.reducer
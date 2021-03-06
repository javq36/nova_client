import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: [],
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      /* return { ...state, user: action.payload.user, token: action.payload.token }; */
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editTicket: [],
};

export const ticketSlice = createSlice({
  name: "ticketReducer",
  initialState,
  reducers: {
    setEditTiket: (state, action) => {
      return {
        ...state,
        editTicket: {
          id: action.payload.id,
          subject: action.payload.subject,
          description: action.payload.description,
        },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEditTiket } = ticketSlice.actions;

//Selectors
export const selectEditTicket = (state) => state.ticketReducer.editTicket;

export default ticketSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    tickets: [],
  },
  reducers: {
    setTickets: (state, action) => {
      return { ...state, tickets: [...action.payload] };
    },
    addTicket: (state, action) => {
      return { ...state, tickets: [...state.tickets, action.payload] };
    },
    editTicket: (state, action) => {
      return {
        ...state,
        tickets: [
          ...state.tickets.map((ticket) =>
            ticket.id === action.payload.id ? action.payload : ticket
          ),
        ],
      };
    },
    deleteTicket: (state, action) => {
      const tickets = state.tickets.filter((ticket) => ticket.id !== action.payload.id);
      return { ...state, tickets: [...tickets] };
    },
  },
});

export const { setTickets, addTicket, editTicket, deleteTicket } = ticketSlice.actions;

export default ticketSlice.reducer;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:8080/api";
const createRequest = (url) => ({ url });
const createRequestToken = (url) => ({ url, headers: ticketHeaders });
const createPostRequest = (url, method = "POST", token, body) => ({
  url,
  method,
  body,
  headers: { Authorization: token },
});

const createPostRequestImg = (url, method = "POST", body) => ({
  url,
  method,
  body,
  headers: ticketHeadersImg,
});

/* https://www.youtube.com/watch?v=3QLpHlmdW_U */

export const ticketApi = createApi({
  reducerPath: "ticket",
  baseQuery: fetchBaseQuery(baseURL),
  tagTypes: ["Tickets"],
  endpoints: (builder) => ({
    setTicketsEmployee: builder.mutation({
      /* query: ( id ) => createRequest(`${baseURL}/api/tickets/employee/${id}`), */
      query: (id) => ({
        url: `${baseURL}/tickets/employee/${id}`,
        method: "get",
      }),
      invalidatesTags: ["Tickets"],
    }),
    createTicket: builder.mutation({
      query: ({ body, token }) => createPostRequest(`${baseURL}/tickets`, "POST", token, body),
      invalidatesTags: ["Tickets"],
    }),
    createTicketImage: builder.mutation({
      query: ({ id, file }) => ({
        url: `${baseURL}/uploads/${id}`,
        method: "POST",
        body: file,
      }),
    }),
    editTicket: builder.mutation({
      query: ({ body, token, id }) => ({
        url: `${baseURL}/tickets/${id}`,
        method: "PUT",
        body,
        headers: { Authorization: token },
      }),
      invalidatesTags: ["Tickets"],
    }),
    /* EditTicket: builder.mutation({
      query: ({ body, token, id }) =>
        createPostRequest(`${baseURL}/tickets/${id}`, "PUT", token, body),
      invalidatesTags: ["Tickets"],
    }), */
  }),
});

export const {
  useGetTicketQuery,
  useCreateTicketMutation,
  useCreateTicketImageMutation,
  useSetTicketsEmployeeMutation,
  useEditTicketMutation,
} = ticketApi;

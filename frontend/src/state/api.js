import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { apiUrl } from 'config/server';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `users/getrecent`
    })
  })
});

export const { useGetUsersQuery } = api;

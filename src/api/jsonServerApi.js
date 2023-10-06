import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const jsonServerApi = createApi({
  reducerPath: 'jsonServerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.142.28/api/' }),
  endpoints: (builder) => ({
    getAlbums: builder.query({
        query: (page = 1) => {
            console.log('12111');
            return ({
                url: 'hello',
                method: 'GET'
            });
        }
    }),
  }),
});

export const { useGetAlbumsQuery } = jsonServerApi;
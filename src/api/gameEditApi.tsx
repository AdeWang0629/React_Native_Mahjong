import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { API } from "./config"

export const gameEditApi = createApi({
    reducerPath: 'gameEditApi',
    baseQuery: fetchBaseQuery({baseUrl: API}),
    tagTypes: ['Game'],
    endpoints: (builder) => ({
        getGame: builder.query({
            query: (page) => ({
                url: 'game',
                method: 'GET'
            }),
            providesTags: ['Game']
        }),
        createGame: builder.mutation({
            query: (body)  => ({
                url: 'game',
                method: 'POST',
                body: {body}
            }),
            invalidatesTags: ['Game']
        }),
        deleteGame: builder.mutation({
            query: (id) => {
                return {url: `game/${id}`,
                method: 'DELETE'}
            },
            invalidatesTags: ['Game']
        }),
    })
});

export const { useGetGameQuery, useCreateGameMutation, useDeleteGameMutation } = gameEditApi;
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
        updateGame: builder.mutation({
            query: ({ id, body }) => ({
                url: `game/${id}`,
                method: 'PUT',
                body: { body },
            }),
            invalidatesTags: ['Game'],
        }),
        deleteGame: builder.mutation({
            query: (id) => {
                return {
                    url: `game/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['Game']
        }),
        createGameScore: builder.mutation({
            query: (body) => ({
                url: 'game/score',
                method: 'POST',
                body: {body}
            }),
            invalidatesTags: ['Game']
        }),
        createGameChip: builder.mutation({
            query: (body) => ({
                url: 'game/chip',
                method: 'POST',
                body: {body}
            }),
            invalidatesTags: ['Game']
        })
    })
});

export const { useGetGameQuery, useCreateGameMutation, useDeleteGameMutation, useCreateGameScoreMutation, useCreateGameChipMutation, useUpdateGameMutation, } = gameEditApi;
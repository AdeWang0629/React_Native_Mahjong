import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { API } from "./config"

export const playerEditApi = createApi({
    reducerPath: 'playerEditApi',
    baseQuery: fetchBaseQuery({baseUrl: API}),
    tagTypes: ['Player'],
    endpoints: (builder) => ({
        getPlayer: builder.query({
            query: (page) => ({
                url: 'player',
                method: 'GET'
            }),
            providesTags: ['Player']
        }),
        createPlayer: builder.mutation({
            query: (p_name)  => ({
                url: 'player',
                method: 'POST',
                body: {p_name}
            }),
            invalidatesTags: ['Player']
        }),
        updatePlayer: builder.mutation({
            query: (playerlist) => {
            return {
                url: `player/`,
                method: 'POST',
                body: {playerlist}
            }},
            invalidatesTags: ['Player']
        }),
        deletePlayer: builder.mutation({
            query: (id) => {
                return {
                    url: `player/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['Player']
        }),
        getPlayerClass: builder.mutation({
            query: (data) => ({
                url: 'player/get-player-class',
                method: 'POST',
                body: data
            }),
        }),
        getPlayerMember: builder.mutation({
            query: (data) => ({
                url: `player/get-player-member`,
                method: 'POST',
                body: data
            }),
        }),
    })
});

export const { 
    useGetPlayerQuery, 
    useGetPlayerMemberMutation, 
    useGetPlayerClassMutation, 
    useCreatePlayerMutation, 
    useUpdatePlayerMutation,
    useDeletePlayerMutation 
} = playerEditApi;
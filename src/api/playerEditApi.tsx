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
            query: (id) => {
                console.log("dfddddddddd", id);
            return {
                url: `player/${id}`,
                method: 'PUT',
                body: {}
            }},
            invalidatesTags: ['Player']
        }),
        deletePlayer: builder.mutation({
            query: (id) => {
                return {url: `player/${id}`,
                method: 'DELETE'}
            },
            invalidatesTags: ['Player']
        }),
    })
});

export const { 
    useGetPlayerQuery, 
    useCreatePlayerMutation, 
    useUpdatePlayerMutation,
    useDeletePlayerMutation 
} = playerEditApi;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { API } from "./config"

export const scoreEditApi = createApi({
    reducerPath: 'scoreEditApi',
    baseQuery: fetchBaseQuery({baseUrl: API}),
    tagTypes: ['Score'],
    endpoints: (builder) => ({
        getTotalScore: builder.query({
            query: (id) => ({
                url: `score/${id}`,
                method: 'GET'
            }),
            providesTags: ['Score']
        }),
        createTotalScore: builder.mutation({
            query: (body)  => ({
                url: 'score',
                method: 'POST',
                body: {body}
            }),
            invalidatesTags: ['Score']
        })
    })
});

export const { 
    useGetTotalScoreQuery,
    useCreateTotalScoreMutation
} = scoreEditApi;
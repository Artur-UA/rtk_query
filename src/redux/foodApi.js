import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const foodsApi = createApi({
    reducerPath: 'foodsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/'}),
    tagTypes: ['Food'], 
    endpoints: (build) => ({  
        getFoods: build.query({ 
            query: (limit = '') => `foods${limit && `?_limit=${limit}` }`, 
            providesTags: ['Food']
        }),
        addNewFood: build.mutation({ 
            query: body => ({
              url: 'foods', 
              method: 'POST',
              body 
            }),
            invalidatesTags: ['Food']
        }),
        deleteFood: build.mutation({ 
            query: (id) => ({
              url: `foods/${id}`, 
              method: 'DELETE'
            }),
            invalidatesTags: ['Food']
        }),
        patchFood: build.mutation({
            query: post => ({
              url: `/foods/${post.id}`,
              method: 'PATCH',
              body: post
            }),
            invalidatesTags: ['Food']
        })
    })
});

export const { useGetFoodsQuery, useAddNewFoodMutation, useDeleteFoodMutation, usePatchFoodMutation } = foodsApi; 





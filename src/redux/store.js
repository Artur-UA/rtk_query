import {configureStore} from '@reduxjs/toolkit'
import { foodsApi } from './foodApi'

export const store =  configureStore({
    reducer: {
        [foodsApi.reducerPath]: foodsApi.reducer,   
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(foodsApi.middleware) 
})


import {configureStore} from '@reduxjs/toolkit'
import { foodsApi } from './foodApi'

export const store =  configureStore({
    reducer: {
        [foodsApi.reducerPath]: foodsApi.reducer,   // [foodsApi.reducerPath] - динамическое название достанет из файла "foodsApi"  ||  хоть и нет reducer, но он создается автоматически   по факту подключает store 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(foodsApi.middleware) // rtk создает автоматом middleware
})
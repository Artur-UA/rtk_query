import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const foodsApi = createApi({
    reducerPath: 'foodsApi', //название в общем store 
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/'}),//куда посылается запрос
    endpoints: (build) => ({ // build -неважно название 
        getFoods: build.query({  // query для данных без мутации
            query: (limit = '') => `foods${limit && `?_limit=${limit}` }`, //название которое в db.json  || limit передается из app.js
        }),
        addNewFood: build.mutation({ 
            query: body => ({
              url: 'foods', // запрос на url, добавит к localhost:3001
              method: 'POST',
              body // id генерит автоматоматически
            })
        })
    })
});

export const { useGetFoodsQuery, useAddNewFoodMutation } = foodsApi; //так как реакт, получаем тут хуки
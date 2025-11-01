import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from './utils/constants';
import { paths } from '@src/api';

export const apiSlice = createApi({
	reducerPath: 'apiSlice',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	endpoints: (builder) => ({
		getGallery: builder.query<paths['/product/']['get']['responses']['200']['content']['application/json'], void>({
			query: () => '/product/'
		}),
		sendOrder: builder.mutation<paths['/order']['post']['responses']['200']['content']['application/json'], paths['/order']['post']['requestBody']['content']['application/json']>({
			query: (body) => ({
				url: '/order',
				method: 'POST',
				body
			})
		})
	}),
})

export const { useGetGalleryQuery, useSendOrderMutation } = apiSlice
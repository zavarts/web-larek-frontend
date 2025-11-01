import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { paths } from '@src/api';

type Order = {
	payment: 'online' | 'offline'
	address: string
	email: string
	phone: string
	products: paths['/product/']['get']['responses']['200']['content']['application/json']['items']
}

const initialState: Order = {
	payment: 'online',
	address: '',
	email: '',
	phone: '',
	products: []
}

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: (create) => ({
		addProduct: create.reducer((state, action: PayloadAction<paths['/product/']['get']['responses']['200']['content']['application/json']['items'][number]>) => {
			if (!state.products.some(({id}) => id === action.payload.id)) {
				state.products.push(action.payload)
			}
		}),
		removeProduct: create.reducer((state, action: PayloadAction<string>) => {
			state.products = state.products.filter(({id}) => id !== action.payload)
		}),
		setPayment: create.reducer((state, action: PayloadAction<'online' | 'offline'>) => {
			state.payment = action.payload
		}),
		setAddress: create.reducer((state, action: PayloadAction<string>) => {
			state.address = action.payload
		}),
		setEmail: create.reducer((state, action: PayloadAction<string>) => {
			state.email = action.payload
		}),
		setPhone: create.reducer((state, action: PayloadAction<string>) => {
			state.phone = action.payload
		}),
		resetState: create.reducer(() => initialState)
	}),
	selectors: {
		selectProductsIds: createSelector([(state: Order) => state.products], (products) => products.map(({id}) => id)),
		selectProductsLength: (state) => state.products.length,
		selectProduct: (state, id: string) => state.products.find((product) => product.id === id),
		selectProductsCost: (state) => state.products.reduce((cost, {price}) => cost + price, 0),
		selectAreProductsEmpty: (state) => state.products.length === 0,
		selectIsProductAdded: (state, id: string) => state.products.some((product) => product.id === id),
		selectPayment: (state) => state.payment,
		selectAddress: (state) => state.address,
		selectIsAddressEmpty: (state) => !state.address.length,
		selectEmail: (state) => state.email,
		selectPhone: (state) => state.phone,
		selectAreContactsEmpty: (state) => !state.email || !state.phone,
		selectOrder: (state) => state
	}
})

export const { addProduct, removeProduct, setPayment, setAddress, setEmail, setPhone, resetState } = counterSlice.actions
export const {selectProductsIds, selectProductsLength, selectProduct, selectProductsCost, selectAreProductsEmpty, selectIsProductAdded, selectPayment, selectAddress, selectIsAddressEmpty, selectEmail, selectPhone, selectAreContactsEmpty, selectOrder} = counterSlice.selectors

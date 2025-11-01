# Проектная работа "Веб-ларек"
## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды
```
npm install
npm run start
```
## Сборка
```
npm run build
```
## Прочее
### Описание модели
Для реализации проекта необходимы 2 ручки:
1. Получение продуктов.
2. Отправка заказа.

Для этого воспользуемся библиотекой RTK Query (ниже описан файл api-slice.ts).
```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' // функция для создания api и модифицированный fetch, чтобы, например, каждый раз не прописывать baseURL 
import { API_URL } from './utils/constants'; // базовый URL
import { paths } from '@src/api'; // Типы, сгенерированные на основе экспортированного api в postman

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

export const { useGetGalleryQuery, useSendOrderMutation } = apiSlice // для соединения api с view 
```

Для создания заказ необходимо состояние приложения, которое реализовано в файле slice.ts
```typescript
import { createSelector, createSlice } from '@reduxjs/toolkit' // функции для создания memoized selector и состояния приложения 
import type { PayloadAction } from '@reduxjs/toolkit' // типизицация входных данных
import { paths } from '@src/api'; // описаны выше

type Order = {
	payment: 'online' | 'offline' // по требованиям только 2 варианта оплаты могут быть
	address: string // адрес доставки
	email: string // email получателя
	phone: string // телефон получателя
	products: paths['/product/']['get']['responses']['200']['content']['application/json']['items'] // продукты, которые добавлены в корзину
}

const initialState: Order = {
	payment: 'online',
	address: '',
	email: '',
	phone: '',
	products: []
} // начальное состояние заказа/приложения

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: (create) => ({
		addProduct: create.reducer((state, action: PayloadAction<paths['/product/']['get']['responses']['200']['content']['application/json']['items'][number]>) => { // добавление продукта в корзину (получаем dto продукта)
			if (!state.products.some(({id}) => id === action.payload.id)) {
				state.products.push(action.payload)
			}
		}),
		removeProduct: create.reducer((state, action: PayloadAction<string>) => { // удаление продукта из корзины (по id)
			state.products = state.products.filter(({id}) => id !== action.payload)
		}),
		setPayment: create.reducer((state, action: PayloadAction<'online' | 'offline'>) => { // изменение способа оплаты
			state.payment = action.payload
		}),
		setAddress: create.reducer((state, action: PayloadAction<string>) => { // изменение адреса получателя
			state.address = action.payload
		}),
		setEmail: create.reducer((state, action: PayloadAction<string>) => { // изменение email получателя
			state.email = action.payload
		}),
		setPhone: create.reducer((state, action: PayloadAction<string>) => { // изменение телефона получателя
			state.phone = action.payload
		}),
		resetState: create.reducer(() => initialState) // установить начальное состояние заказ после его оформления
	}),
	selectors: {
		selectProductsIds: createSelector([(state: Order) => state.products], (products) => products.map(({id}) => id)), // id продуктов в коризине
		selectProductsLength: (state) => state.products.length, // количество продуктов в коризине (для её иконки на главной странице)
		selectProduct: (state, id: string) => state.products.find((product) => product.id === id), // выбираем продукт по его id
		selectProductsCost: (state) => state.products.reduce((cost, {price}) => cost + price, 0), // текущая цена корзины
		selectAreProductsEmpty: (state) => state.products.length === 0, // обработка случая, когда корзина пуста
		selectIsProductAdded: (state, id: string) => state.products.some((product) => product.id === id), // по требованиям количество продукта максимум 1
		selectPayment: (state) => state.payment, // текущий способ оплаты
		selectAddress: (state) => state.address, // текущий адрес получателя
		selectIsAddressEmpty: (state) => !state.address.length, // заполнено ли поле адреса получателя
		selectEmail: (state) => state.email, // текущая почта получателя
		selectPhone: (state) => state.phone, // текущий телефон получателя
		selectAreContactsEmpty: (state) => !state.email || !state.phone, // заполнения ли телефон с почтой получателя
		selectOrder: (state) => state // выбора всего заказа для его дальнейшего отправления на сервер
	}
})

export const { addProduct, removeProduct, setPayment, setAddress, setEmail, setPhone, resetState } = counterSlice.actions
export const {selectProductsIds, selectProductsLength, selectProduct, selectProductsCost, selectAreProductsEmpty, selectIsProductAdded, selectPayment, selectAddress, selectIsAddressEmpty, selectEmail, selectPhone, selectAreContactsEmpty, selectOrder} = counterSlice.selectors
```

### Описание view
```
└── components
    ├── cart
    │   ├── elems
    │   │   └── cart-modal
    │   │       ├── elems
    │   │       │   ├── cart-contacts
    │   │       │   │   ├── elems
    │   │       │   │   │   ├── cart-email
    │   │       │   │   │   │   ├── cart-email.tsx // ввод email получателя
    │   │       │   │   │   │   └── index.ts
    │   │       │   │   │   ├── cart-pay-button
    │   │       │   │   │   │   ├── cart-pay-button.tsx // переход на следующий шаг (оформить заказ)
    │   │       │   │   │   │   └── index.ts
    │   │       │   │   │   └── cart-phone
    │   │       │   │   │       ├── cart-phone.tsx // ввод телефона получателя
    │   │       │   │   │       └── index.ts
    │   │       │   │   ├── cart-contacts.tsx // ввод контактных данных получателя
    │   │       │   │   └── index.ts
    │   │       │   ├── cart-order
    │   │       │   │   ├── elems
    │   │       │   │   │   ├── cart-address
    │   │       │   │   │   │   ├── cart-address.tsx // ввод адреса получателя
    │   │       │   │   │   │   └── index.ts
    │   │       │   │   │   ├── cart-next-button
    │   │       │   │   │   │   ├── cart-next-button.tsx // переход на следующий шаг (ввод контактных данных)
    │   │       │   │   │   │   └── index.ts
    │   │       │   │   │   └── cart-payment
    │   │       │   │   │       ├── cart-payment.tsx // выбор способа оплаты
    │   │       │   │   │       └── index.ts
    │   │       │   │   ├── cart-order.tsx // ввод способа оплаты и адреса получателя
    │   │       │   │   └── index.ts
    │   │       │   ├── cart-products
    │   │       │   │   ├── elems
    │   │       │   │   │   ├── cart-cost
    │   │       │   │   │   │   ├── cart-cost.tsx // стоимость корзины
    │   │       │   │   │   │   └── index.ts
    │   │       │   │   │   ├── cart-order-button
    │   │       │   │   │   │   ├── cart-order-button.tsx // переход на следующий шаг (оформление заказа)
    │   │       │   │   │   │   └── index.ts
    │   │       │   │   │   └── cart-product
    │   │       │   │   │       ├── cart-product.tsx // продукт корзины
    │   │       │   │   │       └── index.ts
    │   │       │   │   ├── cart-products.tsx // список продуктов корзины
    │   │       │   │   └── index.ts
    │   │       │   └── cart-success
    │   │       │       ├── elems
    │   │       │       │   └── cart-total
    │   │       │       │       ├── cart-total.tsx // цена оформленного заказа
    │   │       │       │       └── index.ts
    │   │       │       ├── cart-success.tsx // экран оформленного заказа
    │   │       │       └── index.ts
    │   │       ├── cart-modal.tsx // модалка корзины
    │   │       └── index.ts
    │   ├── cart.tsx // коризина
    │   └── index.ts
    └── gallery
        ├── elems
        │   └── gallery-item
        │       ├── elems
        │       │   ├── gallery-item-button
        │       │   │   ├── gallery-item-button.tsx // добавить продукт в корзину
        │       │   │   └── index.ts
        │       │   └── gallery-item-price
        │       │       ├── gallery-item-price.tsx // цена продукта
        │       │       └── index.ts
        │       ├── gallery-item.tsx // продукт
        │       └── index.ts
        ├── gallery.tsx // список продуктов
        └── index.ts
```

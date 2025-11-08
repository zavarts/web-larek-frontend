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
import { makeAutoObservable } from 'mobx'; // Для синхронизации view с model
import { paths } from '@src/api'; // Типы, сгенерированные на основе экспортированного api в postman

class OrderStore {
	payment: 'online' | 'offline' = 'online'; // radio двух значений
	address = '';
	email = '';
	phone = '';
	products: paths['/product/']['get']['responses']['200']['content']['application/json']['items'] = []; // содержание корзины

	constructor() {
		makeAutoObservable(this);
	}

	addProduct = (product: paths['/product/']['get']['responses']['200']['content']['application/json']['items'][number]) => {
		if (!this.products.some(({ id }) => id === product.id)) {
			this.products.push(product);
		}
	};

	removeProduct = (id: string) => {
		this.products = this.products.filter(product => product.id !== id);
	};

	setPayment = (payment: 'online' | 'offline') => {
		this.payment = payment;
	};

	setAddress = (address: string) => {
		this.address = address;
	};

	setEmail = (email: string) => {
		this.email = email;
	};

	setPhone = (phone: string) => {
		this.phone = phone;
	};

	resetState = () => {
		this.payment = 'online';
		this.address = '';
		this.email = '';
		this.phone = '';
		this.products = [];
	};

	get selectProductsIds() { // для итерации по выбранным продуктам
		return this.products.map(({ id }) => id);
	}

	get selectProductsLength() { // для отображения количества выбранных продуктов
		return this.products.length;
	}

	selectProductTitle = (id: string) => {
		return this.products.find(product => product.id === id).title;
	};

	selectProductPrice = (id: string) => {
		return this.products.find(product => product.id === id).price;
	};

	get selectProductsCost() {
		return this.products.reduce((cost, { price }) => cost + price, 0);
	}

	get selectAreProductsEmpty() {
		return this.products.length === 0;
	}

	selectIsProductAdded = (id: string) => {
		return this.products.some(product => product.id === id);
	};

	get selectPayment() {
		return this.payment;
	}

	get selectAddress() {
		return this.address;
	}

	get selectIsAddressEmpty() {
		return !this.address.length;
	}

	get selectEmail() {
		return this.email;
	}

	get selectPhone() {
		return this.phone;
	}

	get selectAreContactsEmpty() {
		return !this.email || !this.phone;
	}

	get selectOrder(): {
		payment: 'online' | 'offline';
		address: string;
		email: string;
		phone: string;
		products: paths['/product/']['get']['responses']['200']['content']['application/json']['items'];
	} {
		return {
			payment: this.payment,
			address: this.address,
			email: this.email,
			phone: this.phone,
			products: this.products
		};
	}
}

export const orderStore = new OrderStore();
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

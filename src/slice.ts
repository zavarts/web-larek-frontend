import { makeAutoObservable } from 'mobx';
import { paths } from '@src/api';

class OrderStore {
	payment: 'online' | 'offline' = 'online';
	address = '';
	email = '';
	phone = '';
	products: paths['/product/']['get']['responses']['200']['content']['application/json']['items'] = [];

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

	get selectProductsIds() {
		return this.products.map(({ id }) => id);
	}

	get selectProductsLength() {
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

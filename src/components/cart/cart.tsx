import { useState } from 'react';
import { CartModal } from './elems/cart-modal';
import { orderStore } from '@src/slice';
import { observer } from 'mobx-react-lite';

export const Cart = observer(()=> {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button className="header__basket" onClick={() => setIsOpen(true)}>
				<span className="header__basket-counter">{orderStore.selectProductsLength}</span>
			</button>
			{isOpen && <CartModal onClose={() => setIsOpen(false)} />}
		</>
	);
})
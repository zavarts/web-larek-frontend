import { useAppSelector } from '@src/store';
import { selectProductsLength } from '@src/slice';
import { useState } from 'react';
import { CartModal } from './elems/cart-modal';

export function Cart() {
	const [isOpen, setIsOpen] = useState(false);
	const count = useAppSelector(selectProductsLength);

	return (
		<>
			<button className="header__basket" onClick={() => setIsOpen(true)}>
				<span className="header__basket-counter">{count}</span>
			</button>
			{isOpen && <CartModal onClose={() => setIsOpen(false)} />}
		</>
	);
}
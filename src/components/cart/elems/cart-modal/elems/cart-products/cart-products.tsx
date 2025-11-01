import { useAppSelector } from '@src/store';
import { selectProductsIds } from '@src/slice';
import { CartProduct } from './elems/cart-product';
import { CartOrderButton } from './elems/cart-order-button';
import { CartCost } from './elems/cart-cost';

export function CartProducts({next}: { next: () => void }) {
	const productsIds = useAppSelector(selectProductsIds);

	return <div className="basket">
		<h2 className="modal__title">Корзина</h2>
		<ul className="basket__list">
			{productsIds.map((id, index) => <CartProduct id={id} index={index} key={id} />)}
		</ul>
		<div className="modal__actions">
			<CartOrderButton next={next} />
			<CartCost />
		</div>
	</div>
}
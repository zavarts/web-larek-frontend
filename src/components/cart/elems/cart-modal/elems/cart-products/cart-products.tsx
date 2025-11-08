import { CartProduct } from './elems/cart-product';
import { CartOrderButton } from './elems/cart-order-button';
import { CartCost } from './elems/cart-cost';
import { orderStore } from '@src/slice';
import { observer } from 'mobx-react-lite';

export const CartProducts = observer(({next}: { next: () => void })=> {
	return <div className="basket">
		<h2 className="modal__title">Корзина</h2>
		<ul className="basket__list">
			{orderStore.selectProductsIds.map((id, index) => <CartProduct id={id} index={index} key={id} />)}
		</ul>
		<div className="modal__actions">
			<CartOrderButton next={next} />
			<CartCost />
		</div>
	</div>
})
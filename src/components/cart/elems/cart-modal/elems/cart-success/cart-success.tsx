import {
	CartTotal
} from './elems/cart-total';

export function CartSuccess({next}: {next: () => void} ) {
	return <div className="order-success">
		<h2 className="film__title">Заказ оформлен</h2>
		<CartTotal />
		<button className="button order-success__close" onClick={next}>За новыми покупками!</button>
	</div>
}
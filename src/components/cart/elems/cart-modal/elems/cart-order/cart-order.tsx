import { CartAddress } from './elems/cart-address';
import { CartPayment } from './elems/cart-payment';
import { CartNextButton } from './elems/cart-next-button';

export function CartOrder({next}: {next: () => void}) {
	return <form className="form">
		<div className="order">
			<div className="order__field">
				<h2 className="modal__title">Способ оплаты</h2>
				<div className="order__buttons">
					<CartPayment />
				</div>
			</div>
			<label className="order__field">
				<span className="form__label modal__title">Адрес доставки</span>
				<CartAddress />
			</label>
		</div>
		<div className="modal__actions">
			<CartNextButton next={next} />
		</div>
	</form>
}
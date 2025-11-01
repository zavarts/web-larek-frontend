import { CartEmail } from './elems/cart-email';
import { CartPhone } from './elems/cart-phone';
import { CartPayButton } from './elems/cart-pay-button';

export function CartContacts({next}: {next: () => void}) {
	return <form className="form">
		<div className="order">
			<label className="order__field">
				<span className="form__label modal__title">Email</span>
				<CartEmail />
			</label>
			<label className="order__field">
				<span className="form__label modal__title">Телефон</span>
				<CartPhone />
			</label>
		</div>
		<div className="modal__actions">
			<CartPayButton next={next} />
		</div>
	</form>
}
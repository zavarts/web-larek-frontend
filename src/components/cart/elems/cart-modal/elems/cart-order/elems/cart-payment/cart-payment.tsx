import { orderStore } from '@src/slice';
import { observer } from 'mobx-react-lite';

export const CartPayment = observer(() => {
	return (
		<>
			<button
				type="button"
				className={`button button_alt ${
					orderStore.selectPayment === 'online' ? 'button_alt-active' : ''
				}`}
				onClick={() => {
					orderStore.setPayment('online');
				}}
			>
				Онлайн
			</button>
			<button type="button" className={`button button_alt ${orderStore.selectPayment === 'offline' ? 'button_alt-active' : ''}`} onClick={() => {
				orderStore.setPayment('offline');
			}}>
				При получении
			</button>
		</>
	);
})
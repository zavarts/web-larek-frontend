import { useAppDispatch, useAppSelector } from '@src/store';
import { selectPayment, setPayment } from '@src/slice';


export function CartPayment() {
	const payment = useAppSelector(selectPayment);
	const dispatch = useAppDispatch();
	return (
		<>
			<button
				type="button"
				className={`button button_alt ${
					payment === 'online' ? 'button_alt-active' : ''
				}`}
				onClick={() => {
					dispatch(setPayment('online'));
				}}
			>
				Онлайн
			</button>
			<button type="button" className={`button button_alt ${payment === 'offline' ? 'button_alt-active' : ''}`} onClick={() => {
				dispatch(setPayment('offline'));
			}}>
				При получении
			</button>
		</>
	);
}
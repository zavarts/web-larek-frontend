import { useAppDispatch, useAppSelector } from '@src/store';
import { selectAddress, setAddress } from '@src/slice';

export function CartAddress() {
	const address = useAppSelector(selectAddress);
	const dispatch = useAppDispatch();
	return <input className="form__input" type="text" placeholder="Введите адрес" value={address} onChange={(e) => dispatch(setAddress(e.target.value))} />
}
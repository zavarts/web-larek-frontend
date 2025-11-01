import { useAppDispatch, useAppSelector } from '@src/store';
import { selectPhone, setPhone } from '@src/slice';

export function CartPhone() {
	const phone = useAppSelector(selectPhone)
	const dispatch = useAppDispatch();
	return <input className="form__input" type="tel" placeholder="+7 (" value={phone} onChange={(e) => dispatch(setPhone(e.target.value))} />
}
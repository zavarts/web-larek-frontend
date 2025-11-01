import { useAppDispatch, useAppSelector } from '@src/store';
import { selectEmail, setEmail } from '@src/slice';

export function CartEmail() {
	const email = useAppSelector(selectEmail)
	const dispatch = useAppDispatch();
	return <input className="form__input" type="email" placeholder="Введите Email" value={email} onChange={(e) => dispatch(setEmail(e.target.value))} />
}
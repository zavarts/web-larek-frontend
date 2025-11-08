import { orderStore } from '@src/slice';
import { observer } from 'mobx-react-lite';

export const CartEmail = observer(() => {
	return <input className="form__input" type="email" placeholder="Введите Email" value={orderStore.selectEmail} onChange={(e) => orderStore.setEmail(e.target.value)} />
})
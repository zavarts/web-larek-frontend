import { observer } from 'mobx-react-lite';
import { orderStore } from '@src/slice';

export const CartPhone = observer(() => {
	return <input className="form__input" type="tel" placeholder="+7 (" value={orderStore.selectPhone} onChange={(e) => orderStore.setPhone(e.target.value)} />
})
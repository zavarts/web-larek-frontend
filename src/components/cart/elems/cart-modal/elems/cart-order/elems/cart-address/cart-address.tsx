import { orderStore } from '@src/slice';
import { observer } from 'mobx-react-lite';

export const CartAddress = observer(() => {
	return <input className="form__input" type="text" placeholder="Введите адрес" value={orderStore.selectAddress} onChange={(e) => orderStore.setAddress(e.target.value)} />
})
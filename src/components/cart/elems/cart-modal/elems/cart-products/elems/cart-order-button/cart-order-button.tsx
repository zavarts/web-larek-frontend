import { orderStore } from '@src/slice';
import { observer } from 'mobx-react-lite';

export const CartOrderButton = observer(({next}: {next: () => void}) => {
	if (orderStore.selectAreProductsEmpty) {
		return null
	}
	return <button className="button" onClick={next}>Оформить</button>
})
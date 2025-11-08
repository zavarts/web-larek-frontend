import {
	orderStore,
} from '@src/slice';
import { useSendOrderMutation } from '@src/api-slice';
import { observer } from 'mobx-react-lite';

export const CartPayButton = observer(({next}: {next: () => void}) => {
	const [sendOrder, {isLoading}] = useSendOrderMutation({
		fixedCacheKey: 'order'
	})
	return <button disabled={orderStore.selectAreContactsEmpty || isLoading} className="button" onClick={() => {
		sendOrder({...orderStore.selectOrder,
			total: orderStore.selectProductsCost,
			items: orderStore.selectOrder.products.map(({id}) => id),
		}).unwrap().then(() => {
			next()
			orderStore.resetState()
		})
	}}>Оплатить</button>
})
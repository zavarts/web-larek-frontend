import { useAppDispatch, useAppSelector } from '@src/store';
import {
	resetState,
	selectAreContactsEmpty,
	selectOrder,
	selectProductsCost,
} from '@src/slice';
import { useSendOrderMutation } from '@src/api-slice';

export function CartPayButton({next}: {next: () => void}) {
	const areContactsEmpty = useAppSelector(selectAreContactsEmpty)
	const [sendOrder, {isLoading}] = useSendOrderMutation({
		fixedCacheKey: 'order'
	})
	const order = useAppSelector(selectOrder)
	const total = useAppSelector(selectProductsCost)
	const dispatch = useAppDispatch();
	return <button disabled={areContactsEmpty || isLoading} className="button" onClick={() => {
		sendOrder({...order,
			total,
			items: order.products.map(({id}) => id),
		}).unwrap().then(() => {
			next()
			dispatch(resetState())
		})
	}}>Оплатить</button>
}
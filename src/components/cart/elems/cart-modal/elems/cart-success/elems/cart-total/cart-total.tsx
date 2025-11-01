import { numberFormatter } from '@src/utils/utils';
import { useSendOrderMutation } from '@src/api-slice';

export function CartTotal() {
	const [, {data}] = useSendOrderMutation({
		fixedCacheKey: 'order'
	})
	return <p className="film__description">Списано {numberFormatter.format(data.total)} синапсов</p>
}
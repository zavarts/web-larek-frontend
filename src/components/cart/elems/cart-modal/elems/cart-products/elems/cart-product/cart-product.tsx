import { numberFormatter } from '@src/utils/utils';
import { orderStore } from '@src/slice';
import { observer } from 'mobx-react-lite';

export const CartProduct = observer(({id, index}: {id: string, index: number})=> {
	return (
		<li className="basket__item card card_compact">
			<span className="basket__item-index">{index + 1}</span>
			<span className="card__title">{orderStore.selectProductTitle(id)}</span>
			<span className="card__price">{numberFormatter.format(orderStore.selectProductPrice(id))} синапсов</span>
			<button className="basket__item-delete" aria-label="удалить" onClick={() => orderStore.removeProduct(id)}></button>
		</li>
	);
})
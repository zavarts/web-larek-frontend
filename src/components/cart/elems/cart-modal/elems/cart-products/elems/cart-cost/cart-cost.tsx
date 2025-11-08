import { numberFormatter } from '@src/utils/utils';
import { orderStore } from '@src/slice';
import { observer } from 'mobx-react-lite';

export const CartCost = observer(() => {
	return <span className="basket__price">{numberFormatter.format(orderStore.selectProductsCost)} синапсов</span>
})
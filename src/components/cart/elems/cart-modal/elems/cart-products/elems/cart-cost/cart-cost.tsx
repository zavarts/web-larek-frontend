import { useAppSelector } from '@src/store';
import { selectProductsCost } from '@src/slice';
import { numberFormatter } from '@src/utils/utils';

export function CartCost() {
	const cost = useAppSelector(selectProductsCost)
	return <span className="basket__price">{numberFormatter.format(cost)} синапсов</span>
}
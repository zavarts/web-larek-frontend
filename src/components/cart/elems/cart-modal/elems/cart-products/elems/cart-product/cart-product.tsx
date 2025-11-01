import { useAppDispatch, useAppSelector } from '@src/store';
import { removeProduct, selectProduct } from '@src/slice';
import { numberFormatter } from '@src/utils/utils';

export function CartProduct({id, index}: {id: string, index: number}) {
	const { title, price } = useAppSelector((state) => selectProduct(state, id));
	const dispatch = useAppDispatch();
	return (
		<li className="basket__item card card_compact">
			<span className="basket__item-index">{index + 1}</span>
			<span className="card__title">{title}</span>
			<span className="card__price">{numberFormatter.format(price)} синапсов</span>
			<button className="basket__item-delete" aria-label="удалить" onClick={() => dispatch(removeProduct(id))}></button>
		</li>
	);
}
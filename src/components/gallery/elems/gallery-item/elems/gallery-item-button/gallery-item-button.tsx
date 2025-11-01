import { addProduct, selectIsProductAdded } from '@src/slice';
import { paths } from '@src/api';
import { useAppDispatch, useAppSelector } from '@src/store';

export function GalleryItemButton({
																		id,
																		category,
																		title,
																		image,
																		price,
																		description
																	}: paths['/product/']['get']['responses']['200']['content']['application/json']['items'][number]) {
	const dispatch = useAppDispatch()
	const isAdded = useAppSelector((state) => selectIsProductAdded(state, id))

	return isAdded ? <span className="card__price">Уже в корзине</span> :<button className="button" onClick={() => {
		dispatch(addProduct({
			id,
			category,
			title,
			image,
			price,
			description
		}));
	}}>В корзину</button>
}
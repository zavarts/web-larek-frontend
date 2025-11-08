import { paths } from '@src/api';
import { orderStore } from '@src/slice';
import { observer } from 'mobx-react-lite';

export const GalleryItemButton = observer(({
																		id,
																		category,
																		title,
																		image,
																		price,
																		description
																	}: paths['/product/']['get']['responses']['200']['content']['application/json']['items'][number]) => {
	return orderStore.selectIsProductAdded(id) ? <span className="card__price">Уже в корзине</span> :<button className="button" onClick={() => {
		orderStore.addProduct({
			id,
			category,
			title,
			image,
			price,
			description
		});
	}}>В корзину</button>
})
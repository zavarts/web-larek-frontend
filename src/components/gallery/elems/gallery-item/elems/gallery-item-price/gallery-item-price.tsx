import { orderStore } from '@src/slice';
import { observer } from 'mobx-react-lite';

export const GalleryItemPrice = observer(({formattedPrice, id}: {formattedPrice: string; id: string}) => {
	if (orderStore.selectIsProductAdded(id)) {
		return null
	}

	return <span className="card__price">{formattedPrice}</span>
})
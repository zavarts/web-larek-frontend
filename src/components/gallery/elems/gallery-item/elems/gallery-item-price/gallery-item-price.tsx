import { useAppSelector } from '@src/store';
import { selectIsProductAdded } from '@src/slice';

export function GalleryItemPrice({formattedPrice, id}: {formattedPrice: string; id: string}) {
	const isAdded = useAppSelector((state) => selectIsProductAdded(state, id))
	if (isAdded) {
		return null
	}

	return <span className="card__price">{formattedPrice}</span>
}
import { useGetGalleryQuery } from '@src/api-slice';
import { GalleryItem } from './elems/gallery-item';

export function Gallery() {
	const {data} = useGetGalleryQuery()

	if (!data) {
		return null
	}

	return (
		<main className="gallery">
			{data.items.map((item) => <GalleryItem {...item} key={item.id} />)}
		</main>
	);
}
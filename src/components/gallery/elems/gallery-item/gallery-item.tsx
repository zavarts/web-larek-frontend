import { useState } from 'react';
import { GalleryItemButton } from './elems/gallery-item-button';
import { paths } from '@src/api';
import { GalleryItemPrice } from './elems/gallery-item-price';
import { numberFormatter, useModalClose } from '@src/utils/utils';


export function GalleryItem({
	id,
	category,
	title,
	image,
	price,
	description
}: paths['/product/']['get']['responses']['200']['content']['application/json']['items'][number]) {
	const [isOpen, setIsOpen] = useState(false);
	const formattedPrice = price === null ? 'Бесценно' : `${numberFormatter.format(price)} синапсов`
	const ref = useModalClose(() => setIsOpen(false));

	return (
		<>
			<button className="gallery__item card" onClick={() => setIsOpen(true)}>
				<span className="card__category card__category_soft">{category}</span>
				<h2 className="card__title">{title}</h2>
				<img
					className="card__image"
					src={require(`@src/images${image}`)}
					alt={title}
				/>
				<span className="card__price">
					{formattedPrice}
				</span>
			</button>
			{isOpen && (
				<div className="modal modal_active">
					<div className="modal__container" ref={ref}>
						<button
							className="modal__close"
							aria-label="закрыть"
							onClick={() => setIsOpen(false)}
						></button>
						<div className="modal__content">
							<div className="card card_full">
								<img
									className="card__image"
									src={require(`@src/images${image}`)}
									alt=""
								/>
								<div className="card__column">
									<span className="card__category card__category_other">
										{category}
									</span>
									<h2 className="card__title">{title}</h2>
									<p className="card__text">
										{description}
									</p>
									<div className="card__row">
										{price !== null && <GalleryItemButton id={id}
											category={category}
											title={title}
											image={image}
											price={price}
											description={description} />}
										<GalleryItemPrice formattedPrice={formattedPrice} id={id} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
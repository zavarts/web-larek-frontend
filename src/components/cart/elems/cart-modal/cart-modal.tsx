import { useModalClose } from '@src/utils/utils';
import { useState } from 'react';
import { CartProducts } from './elems/cart-products';
import { CartOrder } from './elems/cart-order';
import { CartContacts } from './elems/cart-contacts';
import { CartSuccess } from './elems/cart-success';

export function CartModal({onClose}: {onClose: () => void}) {
	const ref = useModalClose(onClose);
	const [activeStep, setActiveStep] = useState(0);

	function next(){
		setActiveStep(activeStep + 1)
	}

	return <div className="modal modal_active">
		<div className="modal__container" ref={ref}>
			<button className="modal__close" aria-label="закрыть" onClick={onClose}></button>
			<div className="modal__content">
				{activeStep === 0 && <CartProducts next={next} />}
				{activeStep === 1 && <CartOrder next={next} />}
				{activeStep === 2 && <CartContacts next={next} />}
				{activeStep === 3 && <CartSuccess next={onClose} />}
			</div>
		</div>
	</div>
}
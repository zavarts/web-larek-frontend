import { useAppSelector } from '@src/store';
import { selectAreProductsEmpty } from '@src/slice';

export function CartOrderButton({next}: {next: () => void}) {
	const areProductsEmpty = useAppSelector(selectAreProductsEmpty)
	if (areProductsEmpty) {
		return null
	}
	return <button className="button" onClick={next}>Оформить</button>
}
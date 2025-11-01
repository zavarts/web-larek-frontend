import { useAppSelector } from '@src/store';
import { selectIsAddressEmpty } from '@src/slice';

export function CartNextButton({next}: {next: () => void}) {
	const isAddressEmpty = useAppSelector(selectIsAddressEmpty)
	return <button disabled={isAddressEmpty} onClick={next} className="button">Далее</button>
}
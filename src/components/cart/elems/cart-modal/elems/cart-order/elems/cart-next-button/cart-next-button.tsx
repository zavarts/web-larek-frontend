import { orderStore } from '@src/slice';
import { observer } from 'mobx-react-lite';

export const CartNextButton = observer(({next}: {next: () => void})=> {
	return <button disabled={orderStore.selectIsAddressEmpty} onClick={next} className="button">Далее</button>
})
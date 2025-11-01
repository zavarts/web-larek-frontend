import './scss/styles.scss';

import { createRoot } from 'react-dom/client';
import { store } from './store';
import { Provider } from 'react-redux';
import { Gallery } from './components/gallery';
import { Cart } from './components/cart';


const root = createRoot(document.getElementById('app'));
root.render(
	<Provider store={store}>
	<div className="page__wrapper">
		<header className="header">
			<div className="header__container">
				<a className="header__logo" href="/">
					<img
						className="header__logo-image"
						src={require('./images/logo.svg')}
						alt="Film! logo"
					/>
				</a>
				<Cart />
			</div>
		</header>

		<Gallery />
	</div>
	</Provider>
);
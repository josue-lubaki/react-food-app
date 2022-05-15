import React, { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import CartProvider from '../../store/CartProvider';

const Header = (props) => {
	return (
		<CartProvider>
			<header className={classes.header}>
				<h1>ReactMeals</h1>
				<HeaderCartButton onClick={props.onShowCart} />
			</header>
			<div className={classes['main-image']}>
				<img src={mealsImage} alt='A table full of delicious food' />
			</div>
		</CartProvider>
	);
};

export default Header;

import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';
import useHttp from '../../hooks/use-http';

const Cart = (props) => {
	const { sendRequest: saveOrder } = useHttp();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const [isCheckout, setIsCheckout] = useState(false);
	const cartCtx = useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		cartCtx.addItem(item);
	};

	const orderHandler = () => {
		setIsCheckout(true);
	};

	const submitOrderHandler = (userData) => {
		setIsSubmitting(true);
		const transformData = (orderData) => {
			const order = {
				user: userData,
				orderedItems: cartCtx.items,
			};

			return order;
		};

		saveOrder(
			{
				url: 'https://react-movie-http-1a272-default-rtdb.firebaseio.com/orders.json',
				method: 'POST',
				body: {
					user: userData,
					orderedItems: cartCtx.items,
				},
			},
			transformData
		);
		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.clearCart();
	};

	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const modalActions = (
		<div className={classes.actions}>
			<button className={classes['button--alt']} onClick={props.onClose}>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const isSubmittingModalContent = <p>Sending order data...</p>;

	const didSubmitModalContent = (
		<React.Fragment>
			<p>Successfully sent the order !</p>
			<div className={classes.actions}>
				<button className={classes['button--alt']} onClick={props.onClose}>
					Close
				</button>
			</div>
		</React.Fragment>
	);

	const cartModalContent = (
		<React.Fragment>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && (
				<Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
			)}
			{!isCheckout && modalActions}
		</React.Fragment>
	);

	return (
		<Modal onClose={props.onClose}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;

import classes from './Checkout.module.css';
import useInput from '../../hooks/use-input';

const isNotEmpty = (value) => value.trim() !== '';

const Checkout = (props) => {
	const {
		enteredValue: enteredName,
		isValid: nameIsValid,
		hasError: nameHasError,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		reset: resetName,
	} = useInput(isNotEmpty);

	const {
		enteredValue: enteredStreet,
		isValid: streetIsValid,
		hasError: streetHasError,
		valueChangeHandler: streetChangeHandler,
		inputBlurHandler: streetBlurHandler,
		reset: resetStreet,
	} = useInput(isNotEmpty);

	const {
		enteredValue: enteredZip,
		isValid: zipIsValid,
		hasError: zipHasError,
		valueChangeHandler: zipChangeHandler,
		inputBlurHandler: zipBlurHandler,
		reset: resetZip,
	} = useInput(isNotEmpty);

	const {
		enteredValue: enteredCity,
		isValid: cityIsValid,
		hasError: cityHasError,
		valueChangeHandler: cityChangeHandler,
		inputBlurHandler: cityBlurHandler,
		reset: resetCity,
	} = useInput(isNotEmpty);

	let formIsValid;

	if (nameIsValid && streetIsValid && cityIsValid && zipIsValid) {
		formIsValid = true;
	}

	const confirmHandler = (event) => {
		event.preventDefault();

		if (!formIsValid) {
			return;
		}

		props.onConfirm({
			name: enteredName,
			street: enteredStreet,
			city: enteredCity,
			postalCode: enteredZip,
		});

		resetName();
		resetStreet();
		resetCity();
		resetZip();
	};

	const nameControlClasses = nameHasError
		? `${classes.control} ${classes.invalid}`
		: `${classes.control}`;

	const streetControlClasses = streetHasError
		? `${classes.control} ${classes.invalid}`
		: `${classes.control}`;

	const cityControlClasses = cityHasError
		? `${classes.control} ${classes.invalid}`
		: `${classes.control}`;

	const postalCodeControlClasses = zipHasError
		? `${classes.control} ${classes.invalid}`
		: `${classes.control}`;

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={nameControlClasses}>
				<label htmlFor='name'>Your Name</label>
				<input
					type='text'
					id='name'
					value={enteredName}
					onChange={nameChangeHandler}
					onBlur={nameBlurHandler}
				/>
				{nameHasError && (
					<p className='error-text'>Please enter a valid name!</p>
				)}
			</div>
			<div className={streetControlClasses}>
				<label htmlFor='street'>Street</label>
				<input
					type='text'
					id='street'
					value={enteredStreet}
					onChange={streetChangeHandler}
					onBlur={streetBlurHandler}
				/>
				{streetHasError && (
					<p className='error-text'>Please enter a valid street!</p>
				)}
			</div>
			<div className={postalCodeControlClasses}>
				<label htmlFor='postal'>Postal Code</label>
				<input
					type='text'
					id='postal'
					value={enteredZip}
					onChange={zipChangeHandler}
					onBlur={zipBlurHandler}
				/>
				{zipHasError && (
					<p className='error-text'>Please enter a valid postal code!</p>
				)}
			</div>
			<div className={cityControlClasses}>
				<label htmlFor='city'>City</label>
				<input
					type='text'
					id='city'
					value={enteredCity}
					onChange={cityChangeHandler}
					onBlur={cityBlurHandler}
				/>
				{cityHasError && (
					<p className='error-text'>Please enter a valid city!</p>
				)}
			</div>
			<div className={classes.actions}>
				<button type='button' onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;

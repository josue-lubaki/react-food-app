import { useState } from 'react';

const useInput = (validateValueFn) => {
	const [enteredValue, setEnteredValue] = useState('');
	const [valueIsTouched, setIsValueIsTouched] = useState(false);

	// conditional validate
	const isValid = validateValueFn(enteredValue);
	const hasError = !isValid && valueIsTouched;

	const valueChangeHandler = (event) => {
		setEnteredValue(event.target.value);
	};

	const inputBlurHandler = () => {
		setIsValueIsTouched(true);
	};

	const reset = () => {
		setEnteredValue('');
		setIsValueIsTouched(false);
	};

	return {
		enteredValue,
		isValid,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
		reset,
	};
};

export default useInput;

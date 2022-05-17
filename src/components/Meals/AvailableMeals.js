import React, { useState, useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const { isLoading, error, sendRequest: fetchMeals } = useHttp();

	useEffect(() => {
		// transformation function
		const transformData = (mealsData) => {
			let mealsArray = [];

			for (let key in mealsData) {
				mealsArray.push({
					id: key,
					name: mealsData[key].name,
					description: mealsData[key].description,
					price: mealsData[key].price,
				});
			}

			setMeals(mealsArray);
		};

		fetchMeals(
			{
				url: 'https://react-movie-http-1a272-default-rtdb.firebaseio.com/meals.json',
			},
			transformData
		);
	}, [fetchMeals]);

	const mealsList = meals.map((meal) => (
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	if (isLoading) {
		return (
			<section className={classes.mealsLoading}>
				<p>Loading...</p>
			</section>
		);
	}

	if (error) {
		return (
			<section className={classes.mealsError}>
				<p>{error}</p>
			</section>
		);
	}

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;

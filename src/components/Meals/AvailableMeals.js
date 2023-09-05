import { useState, useEffect } from 'react'

import Card from "../UI/Card";
import MealItem from './MealItem/MealItem';
import cls from "./AvailableMeals.module.css";


const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);


  useEffect(() => {
    const fetchMeals = async () => {
      const result = await fetch('https://react-http-42c70-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');

      if(!result.ok) {
        throw new Error("Something went wrong");
      }

      const resp = await result.json();
      // console.log("resp ", resp);

      const loadedMeals = [];

      for (const key in resp) {
        loadedMeals.push({...resp[key], id: key});
      }
      // console.log(loadedMeals);
      setMeals(loadedMeals);
      setIsLoading(false);
    };


    fetchMeals().catch(error => {
      setIsLoading(false);
      setHasError(true);
    });
  }, []);

  if(isLoading) {
    return (
      <section className={cls.mealsLoading}> 
        <h4>Loading...</h4>
      </section>
    );
  }

  if(hasError) {
    return (
      <section className={cls.mealsHasError}>
        <h4>Something went wrong.</h4>
      </section>
    );
  }


  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={cls.meals}>
      <Card>
        <ul>
          {mealsList}
        </ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
import cls from "./MealItem.module.css";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className={cls.meal}>
      <div>
        <h3>{props.name}</h3>
        <p className={cls.description}>{props.description}</p>
        <p className={cls.price}>{price}</p>
      </div>
      <div></div>
    </li>
  );
};

export default MealItem;

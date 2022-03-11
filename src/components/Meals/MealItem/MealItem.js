import { useContext } from "react";

import MealItemForm from "./MealItemForm";
import cls from "./MealItem.module.css";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const onAddToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price 
    });
  }


  return (
    <li className={cls.meal}>
      <div>
        <h3>{props.name}</h3>
        <p className={cls.description}>{props.description}</p>
        <p className={cls.price}>{price}</p>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={onAddToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;

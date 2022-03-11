import { useContext } from 'react';
import CartContext from '../../store/cart-context'; 
import CartIcon from "../../assets/CartIcon";
import cls from "./HeaderCartButton.module.css";

const HeaderCartButton = props => {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((currNumber, item) => {
    return Number(currNumber) + Number(item.amount);
  }, 0);

  return (
    <button className={cls.button} onClick={props.onShowCart}>
      <span className={cls.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={cls.badge}>{numberOfCartItems}</span>
    </button>
  )
};

export default HeaderCartButton;
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context'; 
import CartIcon from "../../assets/CartIcon";
import cls from "./HeaderCartButton.module.css";

const HeaderCartButton = props => {
  const cartCtx = useContext(CartContext);
  const [isBtnBump, setIsBtnBump] = useState(false);
  
  const numberOfCartItems = cartCtx.items.reduce((currNumber, item) => {
    return Number(currNumber) + Number(item.amount);
  }, 0);
  
  const btnClasses = `${cls.button} ${isBtnBump ? cls.bump : ''}`;

  useEffect(() => {
    if(cartCtx.items.length > 0) {
      setIsBtnBump(true);
    }

    const timer = setTimeout(() => {
      setIsBtnBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [cartCtx.items]);

  return (
    <button className={btnClasses} onClick={props.onShowCart}>
      <span className={cls.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={cls.badge}>{numberOfCartItems}</span>
    </button>
  )
};

export default HeaderCartButton;
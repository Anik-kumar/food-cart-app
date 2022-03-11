import {useContext } from 'react';

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import cls from "./Cart.module.css";
import CartContext from '../../store/cart-context';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasCartItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    //
  };

  const cartItemAddHandler = item => {
    //
  };

  const cartItems = (
    <ul className={cls["cart-items"]}>
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
  

  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={cls.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={cls.actions}>
        <button className={cls["button--alt"]} onClick={props.onHideCart}>Close</button>
        { hasCartItems && <button className={cls.button}>Order</button> }
      </div>
    </Modal>
  );
};

export default Cart;
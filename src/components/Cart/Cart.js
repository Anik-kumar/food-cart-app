import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);


  const cartItemRemoveHandler = (id) => {
    console.log("cartItemRemoveHandler ", id);
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    // console.log("cartItemAddHandler ", item);
    cartCtx.addItem({...item, amount: 1});
  };

  const orderClickHandler = () => {
    setIsCheckout(true);
  };

  const orderSubmitHandler = (userData) => {
    setIsSubmitting(true);
    
    const submitForm = async () => {
      const params = {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items
        })
      };
  
      const result = await fetch("https://react-http-42c70-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json", params);
      setIsSubmitting(false);

      if(!result.ok) {
        setSubmitSuccess(false);
        throw new Error('Form submission failed');
      }
    
      setSubmitSuccess(true);
      // console.log("resp ", resp);
      cartCtx.clearCart();
    }
    
    submitForm().catch(err => {
      console.log("error ", err);
    });
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

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderClickHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onClose} onSubmitOrder={orderSubmitHandler} />}
      {!isCheckout && modalAction}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const submitSuccessModalContent = (
    <>
      <p>Order submitted successfully.</p>
      <button onClick={props.onClose} type='button' className={classes.button}>Close</button>
    </>
  );

  return (
    <Modal onClose={props.onHideCart}>
      {!isSubmitting && !submitSuccess && cartModalContent}
      {isSubmitting && !submitSuccess && isSubmittingModalContent}
      {!isSubmitting && submitSuccess && submitSuccessModalContent}
    </Modal>
  );
};

export default Cart;
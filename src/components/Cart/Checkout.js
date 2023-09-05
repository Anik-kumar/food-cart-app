// import React from 'react';
import { useRef, useState } from 'react';
import styles from './Checkout.module.css';


const isEmpty = (value) => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;


const Checkout = (props) => {
  const [formsInputValidity, setFormsInputValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const postalCodeIsValid = isFiveChars(enteredPostalCode);
    const cityIsValid = !isEmpty(enteredCity);

    setFormsInputValidity({
      name: nameIsValid,
      street: streetIsValid,
      postalCode: postalCodeIsValid,
      city: cityIsValid
    });

    const formIsValid = nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

    if(!formIsValid) {
      return;
    }

    props.onSubmitOrder({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity
    });

  };
  
  return (
    <form onSubmit={confirmHandler} className={styles.form}>
      <div className={`${styles.control} ${formsInputValidity.name ? '' : styles.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id='name' ref={nameInputRef}/>
        {!formsInputValidity.name && <p className={styles.invalidText}>Invalid Name</p>}
      </div>
      <div className={`${styles.control} ${formsInputValidity.street ? '' : styles.invalid}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id='street' ref={streetInputRef}/>
        {!formsInputValidity.street && <p className={styles.invalidText}>Invalid Street</p>}
      </div>
      <div className={`${styles.control} ${formsInputValidity.postalCode ? '' : styles.invalid}`}>
        <label htmlFor="postalCode">Postal Code</label>
        <input type="text" id='postalCode' ref={postalCodeInputRef}/>
        {!formsInputValidity.postalCode && <p className={styles.invalidText}>Please enter a valid postal code (5 characters)</p>}
      </div>
      <div className={`${styles.control} ${formsInputValidity.city ?  '' : styles.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" id='city' ref={cityInputRef}/>
        {!formsInputValidity.city && <p className={styles.invalidText}>Invalid City</p>}
      </div>
      <div className={styles.actions}>
        <button className={styles['button--alt']} type='button' onClick={props.onCancel}>Cancel</button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
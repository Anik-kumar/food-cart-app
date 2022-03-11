import React, { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";

import mealImage from "../../assets/meals.jpeg";
import classes from "./Header.module.css";

const Header = props => {
  
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onShowCart={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealImage} alt="Foods" />
      </div>
    </Fragment>
  );
};

export default Header;
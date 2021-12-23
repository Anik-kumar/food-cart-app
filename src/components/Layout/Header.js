import React, { Fragment } from "react";

import mealImage from "../../assets/meals.jpeg";
import classes from "./Header.module.css";

const Header = props => {
  
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <button>Cart</button>
      </header>
      <div className={classes['main-image']}>
        <img src={mealImage} alt="Foods Image" />
      </div>
    </Fragment>
  );
};

export default Header;
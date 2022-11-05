import React from "react";
import { scaleRotate as Menu } from "react-burger-menu";
import { BrowserRouter as Router, Link } from 'react-router-dom';

export default props => {
  return (
    // Pass on our props
      <Menu {...props} >
        <Link className="menu-item" to="/">
          Home
        </Link>

        <Link className="menu-item" to="/36HoursForecast">
          36 Hours Forecast
        </Link>

        <Link className="menu-item" to="/7DaysForecast">
          7 Days Forecast
        </Link>

        <Link className="menu-item" to="/about">
          About
        </Link>
      </Menu>
  );
};
import React from "react";
import { scaleRotate as Menu } from "react-burger-menu";
// import styles from '../../components/sideMenu/SideMenu.module.css';


export default props => {
  return (
    // Pass on our props
    <Menu {...props} >
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/36HoursForecast">
        36 Hours Forecast
      </a>

      <a className="menu-item" href="/7DaysForecast">
        7 Days Forecast
      </a>

      <a className="menu-item" href="/about">
        About
      </a>
    </Menu>
  );
};
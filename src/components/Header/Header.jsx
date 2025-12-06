import React from "react";
import { NavLink } from "react-router-dom";
import Login from "../Login/Login.jsx";
import Registration from "../Registration/Registration.jsx";
import styles from "./Header.module.css";

const Header = () => {
  const setActiveClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <div className={styles.header}>
      <header className={styles.headerBox}>
        <div>
          <NavLink to="/" end className={setActiveClass}>
            <svg className={`${styles.icon} ${styles.iconLogo1}`}>
              <use xlinkHref="/symbol-defs.svg#icon-Logo-1" />
            </svg>

            <svg className={`${styles.icon} ${styles.iconLogo2}`}>
              <use xlinkHref="/symbol-defs.svg#icon-read-journey-1" />
            </svg>
          </NavLink>
        </div>

        <nav className={styles.nav}>
          <NavLink className={setActiveClass} to="/" end>
            Home
          </NavLink>
          <NavLink className={setActiveClass} to="/library">
            My library
          </NavLink>
        </nav>
        <nav className={styles.nav2}>
          <NavLink className={`${setActiveClass} ${styles.login}`} to="/login">
            Login
          </NavLink>
          <NavLink
            className={`${setActiveClass} ${styles.login}`}
            to="/registration"
          >
            Registration
          </NavLink>
        </nav>
      </header>
    </div>
  );
};

export default Header;

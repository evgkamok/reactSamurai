import React from 'react';
import styles from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
  return (
    <header className={styles.header}>
      <img src='https://www.studioadhoc.de/wp-content/uploads/2013/04/TYPO_Berlin_2008_img_Logo.png' alt='Logo'/>
      {
        props.dataUserLogin.isAuthorized
          ? <div className={styles.userAuth}>
            {props.dataUserLogin.login}
            <button onClick={props.logoutUser}>Log out</button>
          </div>
          : <div className={styles.userAuth}>
           <NavLink to={'/login'}>Please login</NavLink>
          </div>
      }
    </header>
  )
}

export default Header
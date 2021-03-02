import React from 'react';
import styles from './Navbar.module.css';
import {NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div>
        <NavLink activeClassName={styles.active} to='/profile'>Profile</NavLink>
      </div>
      <div>
        <NavLink activeClassName={styles.active} to='/dialogs'>Messages</NavLink>
      </div>
      <div>
        <NavLink activeClassName={styles.active} to='/users'>Users</NavLink>
      </div>
      <div>
        <NavLink activeClassName={styles.active} to='/news'>News</NavLink>
      </div>
      <div>
        <NavLink activeClassName={styles.active} to='/music'>Music</NavLink>
      </div>
      <div>
        <NavLink activeClassName={styles.active} to='/settings'>Settings</NavLink>
      </div>
    </nav>
  )
}

export default Navbar
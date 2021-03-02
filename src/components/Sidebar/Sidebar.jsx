import React from 'react';
import Navbar from './Navbar/Navbar';
import Freindsbar from './Freindsbar/Freindsbar';
import styles from './Sidebar.module.css';

const Sidebar = (props) => {
  return (
    <div className={styles.sidebar}>
      <Navbar />
      <Freindsbar state={props.state.freindsbar}/>
    </div>
  )
}

export default Sidebar

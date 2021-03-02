import React from 'react';
import styles from './Freindsbar.module.css';
import FreindList from './FreindList/FreindList';

const Freindsbar = (props) => {
  return (
    <div className={styles.freindsbar}>
      <span className={styles.title}>Freinds</span>
      <FreindList freinds={props.state}/>
    </div>
  )
}

export default Freindsbar;
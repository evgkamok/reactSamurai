import React from 'react';
import preloader from "../../../assets/preloader.svg";
import styles from './Preloader.module.css';

const Preloader = () => {
  return <div className={styles.preloader}>
    <img src={preloader} alt="loading data"/>
    </div>
}

export default Preloader;
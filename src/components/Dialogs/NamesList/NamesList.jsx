import React from 'react';
import styles from './NamesList.module.css';

const NamesList = (props) => {
  return (
    <div className={styles.namesList}>
      {props.namesList}
    </div>
  )
}

export default NamesList;


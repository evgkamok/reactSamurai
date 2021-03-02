import React from 'react';
import styles from './FreindList.module.css';

const FreindList = (props) => { 
  const freindList = props.freinds.map( (freind) => {
    return (
    <div className={styles.freind} key={freind.id}>
      <img src={freind.avatarUrl} alt={freind.name}/>
      {freind.name}
    </div>
    )
  })

  return (
    <div className={styles.freindList}>
      {freindList}
    </div>
  )
}

export default FreindList;
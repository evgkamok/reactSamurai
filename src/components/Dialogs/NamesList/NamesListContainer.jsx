import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './NamesList.module.css';
import {connect} from "react-redux";
import NamesList from "./NamesList";

const mapStateToProps = (state) => {
  const namesList = state.dialogsPage.namesData.map(nameData => {

    const {id, name, avatarUrl} = nameData;
    const path = `/dialogs/${id}`

    return (
      <div className={styles.person} key={id}>
        <img src={avatarUrl} alt='avatar'/>
        <NavLink to={path} className={styles.name} activeClassName={styles.active}>{name}</NavLink>
      </div>
    )
  })

  return {
    namesList: namesList
  }
}

const NamesListContainer = connect(mapStateToProps)(NamesList);

export default NamesListContainer



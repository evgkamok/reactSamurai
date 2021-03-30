import React, {useState} from 'react';
import styles from "./ProfileInfo.module.css";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormControl/FormsControl";
import ProfileStatusHook from "../ProfileStatus/ProfileSatusHOOK";
import {required} from "../../../utils/validator/validator";

const InputField = ({displayName, fieldName, type = null, validate, ...props}) => {
  return (
    <div className={styles.inputField}>
      <label htmlFor={fieldName}>{displayName}</label>
      <Field component={Input} name={fieldName} validate={validate} type={type} {...props}/>
    </div>
  )
}

const contactsArray = (contacts) => {
  const resultArray = [];
  Object.keys(contacts).map((propName, id) => {
    const contact =
      <div key={id} className={styles.contact}>
        <InputField displayName={propName} fieldName={`contacts.${propName}`} placeholder={propName}/>
      </div>
    resultArray.push(contact)
  })
  return resultArray;
}

const ProfileInfoEditForm = (props) => {
  const {contacts} = props.profile;
  return (

    <form onSubmit={props.handleSubmit}>
      {props.error &&
      <div className={styles.serverError}>
        {props.error}
      </div>
      }
      <ProfileStatusHook status={props.status} setUserStatusMessage={props.setUserStatusMessage} isOwner={props.isOwner}/>
      <InputField displayName={'Name: '} fieldName={'fullName'} validate={[required]}/>
      <InputField displayName={'About me: '} fieldName={'aboutMe'} validate={[required]}/>
      <InputField displayName={'Looking for a job: '} fieldName={'lookingForAJob'} type={'checkbox'}
                  validate={[required]}/>
      <InputField displayName={'Status job: '} fieldName={'lookingForAJobDescription'} validate={[required]}/>
      <b>Contacts: </b>
      {contactsArray(contacts)}
      <button>Save</button>
      <button onClick={props.stopEditMode}>Cancel</button>
    </form>
  )
}

export default reduxForm({form: 'editProfileForm'})(ProfileInfoEditForm);
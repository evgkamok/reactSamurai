import React, {useState} from 'react';
import styles from "./ProfileInfo.module.css";
import ProfileStatusHook from "../ProfileStatus/ProfileSatusHOOK";

const ProfileField = ({nameField, dataField, ...props}) => {
  return (
    <div {...props}>
      <b>{nameField}</b> {dataField}
    </div>
  )
}

const ProfileInfoData = ({profile, status, isOwner, setUserStatusMessage, setEditMode}) => {
  return (
    <div className={styles.profileData}>
      <ProfileStatusHook status={status} setUserStatusMessage={setUserStatusMessage} isOwner={isOwner}/>
      <ProfileField nameField={'Name:'} dataField={profile.fullName}/>
      <ProfileField nameField={'About me:'} dataField={profile.aboutMe}/>
      <ProfileField nameField={'Looking for a job:'} dataField={profile.lookingForAJob ? 'yes' : 'no'}/>
      {
        profile.lookingForAJob &&
        <ProfileField nameField={'Status job:'} dataField={profile.lookingForAJobDescription}/>
      }
      <b>Contacts: </b>
      {
        Object.keys(profile.contacts).map((propName, id) => {
          if (profile.contacts[propName]) {
            return <ProfileField key={id} nameField={propName} dataField={profile.contacts[propName]}/>
          }
          return null
        })
      }
      {isOwner &&
      <button onClick={setEditMode}>Edit profile</button>}
    </div>
  )
}

export default ProfileInfoData;
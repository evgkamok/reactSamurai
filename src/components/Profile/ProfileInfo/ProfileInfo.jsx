import React from 'react';
import styles from './ProfileInfo.module.css'
import Preloader from "../../common/prelodaer/Preloader";
import ProfileStatusHook from "../ProfileStatus/ProfileSatusHOOK";

const ProfileInfo = (props) => {

  if (!props.profile) {
    return <Preloader/>
  }
  return (
    <div className={styles.profileInfoWrapper}>
      {/*<img className={styles.profileInfoBanner}*/}
      {/*     src='https://debthelpers.ca/wp-content/uploads/2015/09/header-bg-skygrass.jpg' alt='banner'/>*/}
      <div className={styles.profileInfoData}>
        <div className={styles.profileInfoPhoto}>
          <img src={props.profile.photos.large} alt="photo"/>
        </div>
        <div className={styles.profileInfoInformation}>
          <div><b>Name: </b> {props.profile.fullName}</div>
          <div><b>Status job: </b>{props.profile.lookingForAJobDescription}</div>
          <div><b>Contacts: </b></div>
          <ul>
            <li>{props.profile.contacts.github}</li>
            <li>{props.profile.contacts.vk}</li>
            <li>{props.profile.contacts.facebook}</li>
            <li>{props.profile.contacts.twitter}</li>
          </ul>
        </div>
        <ProfileStatusHook status={props.status} setUserStatusMessage={props.setUserStatusMessage}/>
      </div>


    </div>
  )
}

export default ProfileInfo
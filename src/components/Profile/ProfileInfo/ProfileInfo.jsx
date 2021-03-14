import React from 'react';
import styles from './ProfileInfo.module.css'
import Preloader from "../../common/prelodaer/Preloader";
import ProfileStatusHook from "../ProfileStatus/ProfileSatusHOOK";

const ProfileInfo = (props) => {

  if (!props.profile) {
    return <Preloader/>
  }

  const {github, vk, facebook, twitter} = props.profile.contacts;
  return (
    <div className={styles.profileInfoWrapper}>
      <div className={styles.profileInfoData}>
        <div className={styles.profileInfoPhoto}>
          <img src={props.profile.photos.large} alt="photo"/>
        </div>
        <div className={styles.profileInfoInformation}>
          <div><b>Name: </b> {props.profile.fullName}</div>
          <div><b>Status job: </b>{props.profile.lookingForAJobDescription}</div>
          <div><b>Contacts: </b></div>
          <ul>
            {github ? <li>{github}</li> : null}
            {vk ? <li>{vk}</li> : null}
            {facebook ? <li>{facebook}</li> : null}
            {twitter ? <li>{twitter}</li> : null}
          </ul>
        </div>
        <ProfileStatusHook status={props.status} setUserStatusMessage={props.setUserStatusMessage}/>
      </div>
    </div>
  )
}

export default ProfileInfo
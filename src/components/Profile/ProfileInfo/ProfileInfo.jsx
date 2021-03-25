import React from 'react';
import styles from './ProfileInfo.module.css'
import Preloader from "../../common/prelodaer/Preloader";
import ProfileStatusHook from "../ProfileStatus/ProfileSatusHOOK";
import noneAvatar from "../../../assets/noneAvatar.png";

const ProfileInfo = (props) => {

  const onLoadPhotoFile = (event) => {
    if (event.target.files.length > 0) {
      props.uploadPhotoFile(event.target.files[0]);
    }
  }

  if (!props.profile) {
    return <Preloader/>
  }
  const {github, vk, facebook, twitter} = props.profile.contacts;

  return (
    <div className={styles.profileInfoWrapper}>
      <div className={styles.profileInfoData}>
        <div className={styles.profileInfoPhotoContainer}>
          <img src={props.profile.photos.large || noneAvatar} alt="photo" className={styles.profileInfoPhoto}/>
        </div>
        <div>
          <ProfileStatusHook status={props.status} setUserStatusMessage={props.setUserStatusMessage}/>
          {props.match.params.userId
            ? null
            : <>
              <label htmlFor='uploadPhotoInput'>Upload photo</label>
              <input type={'file'}
                onChange={onLoadPhotoFile}
                     id={'uploadPhotoInput'}
                     className={styles.uploadPhotoInput}/>
            </>}
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
      </div>
    </div>
  )
}

export default ProfileInfo
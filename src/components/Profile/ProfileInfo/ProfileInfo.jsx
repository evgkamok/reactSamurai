import React, {useState} from 'react';
import styles from './ProfileInfo.module.css'
import Preloader from "../../common/prelodaer/Preloader";
import noneAvatar from "../../../assets/noneAvatar.png";
import ProfileInfoEditForm from "./ProfileInfoEditForm";
import ProfileInfoData from "./ProfileInfoData";

const ProfileInfo = (props) => {
  const onLoadPhotoFile = (event) => {
    if (event.target.files.length > 0) {
      props.uploadPhotoFile(event.target.files[0]);
    }
  }

  const onSubmit = (formData) => {
    props.saveData(formData);
    setEditMode(false);
  }

  const [isEditMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader/>
  }

  return (
    <>
      <div className={styles.profileInfoPhoto}>
        <img src={props.profile.photos.large || noneAvatar} alt="photo" className={styles.profileInfoPhoto}/>
        <div className={styles.uploadPhotoButton}>
          {!props.isOwner
            ? null
            : <>
              <label htmlFor='uploadPhotoInput' className={styles.uploadPhotoLabel}>Upload photo</label>
              <input type={'file'}
                     onChange={onLoadPhotoFile}
                     id={'uploadPhotoInput'}
                     className={styles.uploadPhotoInput}/>
            </>}
        </div>
      </div>

      {
        isEditMode
          ? <ProfileInfoEditForm {...props} initialValues={props.profile}
                                 stopEditMode={()=>setEditMode(false)}
                                 onSubmit={onSubmit} />
          : <ProfileInfoData {...props} setEditMode={() => setEditMode(true)}/>
      }
    </>
  )
}

export default ProfileInfo;
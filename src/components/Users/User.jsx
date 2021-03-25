import React from 'react';
import styles from './UsersPage.module.css';
import noneAvatar from "../../assets/noneAvatar.png";
import {NavLink} from "react-router-dom";

const User = (props) => {

  const {userId, userPhotoSmall, userName, userFollowed, userStatus, disableFollowButtonArray, follow, unFollow} = props
  return (
    <div className={styles.user} key={userId}>
      <div className={styles.userInfo}>
        <NavLink to={'/profile/' + userId}>
          <img src={userPhotoSmall !== null ? userPhotoSmall : noneAvatar} alt={userName}/>
        </NavLink>
        <div>{userName}</div>
        {userFollowed
          ? <button disabled={disableFollowButtonArray.some(id => id === userId)}
                    onClick={(event) => {
                      follow(userId)
                    }}>Unfollow</button>
          : <button disabled={disableFollowButtonArray.some(id => id === userId)}
                    onClick={(event) => {
                      unFollow(userId)
                    }}>follow</button>
        }
      </div>
      <div className={styles.userStatus}>
        <div>Status: {userStatus != null ? userStatus : 'Default status message'}</div>
        <div>{'user.location.town'}</div>
        <div>{'user.location.country'}</div>
      </div>
    </div>
  )
}

export default User;




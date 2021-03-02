import React from 'react';
import styles from './Profile.module.css';
import MyPostsContainer from './MyPost/MyPostsContainer'
import ProfileInfoContainer from './ProfileInfo/ProfileInfoContainer'
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


class Profile extends React.Component{

  render() {
    return (
      <div className={styles.profile}>
        <ProfileInfoContainer />
        <MyPostsContainer />
      </div>
    )
  }
}

export default compose(
  withAuthRedirect
)(Profile)
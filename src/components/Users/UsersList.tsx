import React, {FC} from 'react';
import styles from './UsersPage.module.css';
import User from "./User";
import {UserType} from '../../types/types';

type Props = {
  users: Array<UserType>
  disableFollowButtonArray: Array<number>
  follow: (userId: number) => void
  unFollow: (userId: number) => void
}

const UsersList: FC<Props> = ({users, disableFollowButtonArray, follow, unFollow}) => {
  return (
    <div className={styles.usersWrapper}>
      {
        users.map(user => {
          return <User className={styles.user}
                       userId={user.id}
                       userPhotoSmall={user.photos.small}
                       userName={user.name}
                       userFollowed={user.followed}
                       userStatus={user.status}
                       disableFollowButtonArray={disableFollowButtonArray}
                       follow={follow}
                       unFollow={unFollow}
          />
        })
      }
    </div>
  )
}

export default UsersList;

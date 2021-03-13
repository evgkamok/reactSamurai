import React from 'react';
import UsersPagination from "./UsersPagination";
import Preloader from "../common/prelodaer/Preloader";
import UsersPageList from "./UsersPageList";

const UsersPage = (props) => {
  return (
    <>
      <UsersPagination countUsers={props.countUsers}
                       countUsersOnPage={props.countUsersOnPage}
                       currentPage={props.currentPage}
                       onChangePage={props.onChangePage}/>
      {
        props.isFetching
          ? <Preloader/>
          : <UsersPageList
            users={props.users}
            countUsers={props.countUsers}
            countUsersOnPage={props.countUsersOnPage}
            currentPage={props.currentPage}
            disableFollowButtonArray={props.disableFollowButtonArray}
            follow={props.follow}
            unFollow={props.unFollow}
          />
      }
    </>
  )
}

export default UsersPage;

import React from 'react';
import styles from './UsersPage.module.css';
import noneAvatar from "../../assets/noneAvatar.png";
import {NavLink, Redirect} from "react-router-dom";

const UsersPage = (props) => {
  const totalPages = Math.ceil(props.countUsers / props.countUsersOnPage)
  const arrayPages = [];
  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    arrayPages.push(pageNum);
  }

  return (
    <div className={styles.personWrapper}>
      <div className={styles.paginationUsers}>
        {
          arrayPages.map(numberPage => {
            return <span
              key={numberPage}
              onClick={() => {
                props.onChangePage(numberPage)
              }}
              className={props.currentPage === numberPage ? styles.activePage : null}>{numberPage}</span>
          })
        }
      </div>

      {
        props.users.map(user => {
          return (
            <div className={styles.person} key={user.id}>
              <div className={styles.personInfo}>
                <NavLink to={'/profile/' + user.id}>
                  <img src={user.photos.small != null ? user.photos.small : noneAvatar} alt={user.name}/>
                </NavLink>
                <div>{user.name}</div>
                {user.followed
                  ? <button disabled={props.disableFollowButtonArray.some(id => id === user.id)}
                            onClick={(event) => {
                              props.follow(user.id)
                            }}>Unfollow</button>
                  : <button disabled={props.disableFollowButtonArray.some(id => id === user.id)}
                            onClick={(event) => {
                              props.unFollow(user.id)
                            }}>follow</button>
                }
              </div>
              <div className={styles.personStatus}>
                <div>{user.statusMessage != null ? user.statusMessage : 'Default status message'}</div>
                <div>{'user.location.town'}</div>
                <div>{'user.location.country'}</div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default UsersPage;

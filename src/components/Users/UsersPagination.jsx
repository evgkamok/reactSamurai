import React from 'react';
import styles from './UsersPage.module.css';

const UsersPagination = (props) => {

  const totalPages = Math.ceil(props.countUsers / props.countUsersOnPage)
  const arrayPages = [];
  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    arrayPages.push(pageNum);
  }

  return (
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
  )
}

export default UsersPagination;

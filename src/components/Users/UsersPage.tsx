import React, {FC} from 'react'
import UsersPagination from "./UsersPagination"
import Preloader from "../common/prelodaer/Preloader"
import UsersList from "./UsersList"
import { UserType } from '../../types/types'

type Props = {
  users: Array<UserType>
  countUsers: number
  countUsersOnPage: number
  currentPageNumber: number
  sizePartPagination: number
  isFetching: boolean
  disableFollowButtonArray: Array<number>
  onChangePage: (numberPage: number) => void
  follow: (userId: number) => void
  unFollow: (userId: number) => void
}

const UsersPage: FC<Props> = (props) => {
  return (
    <>
      <UsersPagination countUsers={props.countUsers}
                       countUsersOnPage={props.countUsersOnPage}
                       currentPageNumber={props.currentPageNumber}
                       onChangePage={props.onChangePage}
                       sizePartPagination={props.sizePartPagination}
      />
      {
        props.isFetching
          ? <Preloader/>
          : <UsersList
            users={props.users}
            disableFollowButtonArray={props.disableFollowButtonArray}
            follow={props.follow}
            unFollow={props.unFollow}
          />
      }
    </>
  )
}

export default UsersPage;
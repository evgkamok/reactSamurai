import React from 'react';
import UsersPage from "./UsersPage";
import {connect} from "react-redux";
import {
  requestUsers,
  follow,
  unFollow
} from "../../redux/users-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
  getUsers,
  getCountUsers,
  getCountUsersOnPage,
  getCurrentPage,
  getDisableFollowButtonArray,
  getIsFetching, getSizePartPagination
} from "../../redux/users-selectors";
import {AppStateType} from "../../redux/redux-store";
import {UserType} from "../../types/types";

type MapStateProps = {
  isFetching: boolean
  users: Array<UserType>
  countUsers: number
  countUsersOnPage: number
  sizePartPagination: number
  currentPageNumber: number
  disableFollowButtonArray: Array<number>
}

type MapDispatchProps = {
  follow: (userId: number) => void
  unFollow: (userId: number) => void
  getUsers: (countUsersOnPage: number, numberPage: number) => void
}

type Props = MapStateProps & MapDispatchProps

class UsersPageContainer extends React.Component<Props> {

  onChangePage = (numberPage: number) => {
    this.props.getUsers(this.props.countUsersOnPage, numberPage)
  }

  componentDidMount() {
    this.props.getUsers(this.props.countUsersOnPage, this.props.currentPageNumber)
  }

  render() {
    return <>
      <UsersPage {...this.props} onChangePage={this.onChangePage}/>
    </>
  }
}

const mapStateToProps = (state: AppStateType): MapStateProps => {
  return {
    isFetching: getIsFetching(state),
    users: getUsers(state),
    countUsers: getCountUsers(state),
    countUsersOnPage: getCountUsersOnPage(state),
    sizePartPagination: getSizePartPagination(state),
    currentPageNumber: getCurrentPage(state),
    disableFollowButtonArray: getDisableFollowButtonArray(state),
  }
}

export default compose(
  connect<MapStateProps, MapDispatchProps, unknown, AppStateType>(mapStateToProps, {
  follow,
  unFollow,
  getUsers: requestUsers}),
  withAuthRedirect
)(UsersPageContainer)



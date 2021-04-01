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

class UsersPageContainer extends React.Component {

  onChangePage = (numberPage) => {
    this.props.getUsers(this.props.countUsersOnPage, numberPage)
  }

  componentDidMount() {
    this.props.getUsers(this.props.countUsersOnPage, this.props.currentPage)
  }

  render() {
    return <>
      <UsersPage {...this.props} onChangePage={this.onChangePage}/>
    </>
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: getIsFetching(state),
    users: getUsers(state),
    countUsers: getCountUsers(state),
    countUsersOnPage: getCountUsersOnPage(state),
    sizePartPagination: getSizePartPagination(state),
    currentPage: getCurrentPage(state),
    disableFollowButtonArray: getDisableFollowButtonArray(state),
  }
}

export default compose(
  connect(mapStateToProps, {
  follow,
  unFollow,
  getUsers: requestUsers}),
  withAuthRedirect
)(UsersPageContainer)



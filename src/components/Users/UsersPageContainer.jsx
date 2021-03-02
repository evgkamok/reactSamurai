import React from 'react';
import UsersPage from "./UsersPage";
import Preloader from "../common/prelodaer/Preloader";
import {connect} from "react-redux";
import {
  requestUsers,
  follow,
  unFollow
} from "../../redux/usersPage-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
  getUsers,
  getCountUsers,
  getCountUsersOnPage,
  getCurrentPage,
  getDisableFollowButtonArray,
  getIsFetching
} from "../../redux/userPage-selectors";

class UsersPageContainer extends React.Component {

  onChangePage = (numberPage) => {
    this.props.getUsers(this.props.countUsersOnPage, numberPage)
  }

  componentDidMount() {
    this.props.getUsers(this.props.countUsersOnPage, this.props.currentPage)
  }

  render() {
    return <>
      {this.props.isFetching ? <Preloader/> : null}
      <UsersPage
        users={this.props.users}
        countUsers={this.props.countUsers}
        countUsersOnPage={this.props.countUsersOnPage}
        currentPage={this.props.currentPage}
        disableFollowButtonArray={this.props.disableFollowButtonArray}
        follow={this.props.follow}
        unFollow={this.props.unFollow}
        onChangePage={this.onChangePage}
      />
    </>
  }
}


const mapStateToProps = (state) => {
  return {
    isFetching: getIsFetching(state),
    users: getUsers(state),
    countUsers: getCountUsers(state),
    countUsersOnPage: getCountUsersOnPage(state),
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



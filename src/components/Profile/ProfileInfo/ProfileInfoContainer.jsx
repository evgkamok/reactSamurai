import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {setUserProfile, getUserStatusMessage, setUserStatusMessage} from "../../../redux/profilePage-reducer";
import ProfileInfo from "./ProfileInfo";
import {compose} from "redux";


class ProfileInfoContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId && this.props.initSuccess && this.props.isAuthorized) {
      userId = this.props.userId;
    }
    this.props.setUserProfile(userId);
    this.props.getUserStatusMessage(userId)
  }

  render() {
    return <ProfileInfo {...this.props} profile={this.props.profile} status={this.props.status}
                        setUserStatusMessage={this.props.setUserStatusMessage}/>
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    initSuccess: state.app.initSuccess,
    isAuthorized: state.authorizeUser.isAuthorized,
    userId: state.authorizeUser.userId
  }
}

export default compose(
  connect(mapStateToProps, {setUserProfile, setUserStatusMessage, getUserStatusMessage}),
  withRouter
)(ProfileInfoContainer)




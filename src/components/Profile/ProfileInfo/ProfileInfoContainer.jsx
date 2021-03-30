import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {
  setUserProfile,
  getUserStatusMessage,
  setUserStatusMessage,
  uploadPhotoFile,
  saveProfileData
} from "../../../redux/profilePage-reducer";
import ProfileInfo from "./ProfileInfo";
import {compose} from "redux";


class ProfileInfoContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId && this.props.initSuccess && this.props.isAuthorized) {
      userId = this.props.userId;
    }
    this.props.setUserProfile(userId);
    this.props.getUserStatusMessage(userId)
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }
  // props.match.params.userId
  render() {
    return <ProfileInfo
                        isOwner={!this.props.match.params.userId}
                        profile={this.props.profile}
                        status={this.props.status}
                        setUserStatusMessage={this.props.setUserStatusMessage}
                        uploadPhotoFile={this.props.uploadPhotoFile}
                        saveData={this.props.saveProfileData}/>
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    initSuccess: state.app.initSuccess,
    isAuthorized: state.authorizeUser.isAuthorized,
    userId: state.authorizeUser.userId,
  }
}

export default compose(
  connect(mapStateToProps, {
    setUserProfile, setUserStatusMessage,getUserStatusMessage, uploadPhotoFile, saveProfileData}),
  withRouter
)(ProfileInfoContainer)




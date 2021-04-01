import React from 'react'
import Header from "./Header";
import {connect} from "react-redux";
import {logoutUser} from "../../redux/auth-reducer";


class HeaderContainer extends React.Component {

  render() {
    return <Header {...this.props}/>
  }
}

const mapStateToProps = (state) => {
  return {
    dataUserLogin: state.authorizeUser,
  }
}

export default connect(mapStateToProps, {logoutUser})(HeaderContainer)
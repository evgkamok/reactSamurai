import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {
    isAuthorized: state.authorizeUser.isAuthorized
  }
}

export const withAuthRedirect = (Component) => {

  class RedirectComponent extends React.Component {

    render(){
      if (!this.props.isAuthorized) {
        return <Redirect to='/login' />
      }

      return <Component {...this.props} />
    }
  }

  return connect(mapStateToProps)(RedirectComponent);
}


// export const withRedirectFunc = (Component) => {
//   const withRedirectComponent = (props) => {
//     if (props.isAuthorized) {
//       return <Component {...props} />
//     }
//     return <Redirect to={'/login'}/>
//   }
//
//   return connect(mapStateToProps)(withRedirectComponent)
// }
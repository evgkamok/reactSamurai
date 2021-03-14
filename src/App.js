import React from "react";
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from "react-redux";
import {setAuthInitialize} from "./redux/app-reducer";
import './App.css';
import {withSuspense} from "./hoc/withSuspense";
import HeaderContainer from './components/Header/HeaderContainer';
import Sidebar from './components/Sidebar/Sidebar';
import Profile from './components/Profile/Profile';
import DialogsPage from './components/Dialogs/DialogsPage'
import Login from "./components/Login/Login";
import NewsContainer from "./components/News/NewsContainer";
import Preloader from "./components/common/prelodaer/Preloader";

const UsersPageContainer = React.lazy(() => import('./components/Users/UsersPageContainer'));

class App extends React.Component {

  componentDidMount() {
    this.props.setAuthInitialize();
  }

  render() {
    if (!this.props.initSuccess) {
     return <Preloader />
    }

    return (
      <BrowserRouter>
        <div className="app-wrapper">
          <HeaderContainer/>
          <Sidebar state={this.props.state.sidebar}/>
          <div className='app-wrapper-content'>
            <Route path='/dialogs' render={() => <DialogsPage/>}/>
            <Route path='/profile/:userId?' render={() => <Profile/>}/>
            <Route path='/users' render={withSuspense(UsersPageContainer)}/>
            <Route path='/login' render={() => <Login/>}/>
            <Route path='/news/:testParam?' render={() => <NewsContainer/>}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (state) => {
  return {
    initSuccess: state.app.initSuccess
  }
}

export default connect(mapDispatchToProps, {setAuthInitialize})(App);

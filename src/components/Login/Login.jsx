import React from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {required} from "../../utils/validator/validator";
import {Input} from "../common/FormControl/FormsControl";
import {loginUser} from "../../redux/authUser-reducer";
import styles from './Login.module.css'

const LoginForm = (props) => {
  return (
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field component={Input} name={'email'} placeholder={'Email'} validate={[required]}/>
        </div>
        <div>
          <Field component={Input} name={'password'} placeholder={'Password'} validate={[required]}/>
        </div>
        {props.error &&
        <div className={styles.serverError}>
          {props.error}
        </div>
        }
        <div className={styles.rememberMe}>
          <Field component={Input} name={'rememberMe'} type={'checkbox'}/>
          <span>Remember me</span>
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
  )
}

let LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {

  const onSubmit = (formData) => {
    let {email, password, rememberMe} = formData;
    props.loginUser(email, password, rememberMe)
  }

  if (props.isAuthorized) {
    return <Redirect to={'/profile'}/>
  } else {
    return (
      <div className={styles.loginWrapper}>
        <h1>Please Login !!!!</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthorized: state.authorizeUser.isAuthorized
  }
}

export default connect(mapStateToProps, {loginUser})(Login);
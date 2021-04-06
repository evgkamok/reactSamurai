import React from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {required} from "../../utils/validator/validator"
import {Input} from "../common/FormControl/FormsControl"
import {loginUser} from "../../redux/auth-reducer"
import styles from './Login.module.css'
import {AppStateType} from "../../redux/redux-store"

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginFormOwnPropsType> & LoginFormOwnPropsType> =
  ({handleSubmit, error, captcha}) => {
    return (
      <form onSubmit={handleSubmit}>
          <Field component={Input} name={'email'} placeholder={'Email'} validate={[required]}/>
          <Field component={Input} name={'password'} placeholder={'Password'} validate={[required]}/>
        {error &&
        <div className={styles.serverError}>
          {error}
        </div>
        }
        <div className={styles.rememberMe}>
          <Field component={Input} name={'rememberMe'} type={'checkbox'}/>
          <span>Remember me</span>
        </div>
        {captcha && <img src={captcha} alt="captcha"/>}
        {captcha && <Field component={Input} name={'captcha'}/>}
        <button>Login</button>
      </form>
    )
  }

let LoginReduxForm = reduxForm<LoginFormDataType, LoginFormOwnPropsType>({form: 'login'})(LoginForm)

type MapStateProps = {
  isAuthorized: boolean
  captcha: null | string
}

type MapDispatchProps = {
  loginUser: (email: string, password: string, isRememberMe: boolean, captcha: string) => void
}

type LoginFormDataType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

type LoginFormOwnPropsType = {
  captcha: string | null
}

const Login: React.FC<MapStateProps & MapDispatchProps> = (props) => {

  const onSubmit = (formData: LoginFormDataType) => {
    const {email, password, rememberMe, captcha} = formData;
    props.loginUser(email, password, rememberMe, captcha)
  }

  if (props.isAuthorized) {
    return <Redirect to={'/profile'}/>
  } else {
    return (
      <div className={styles.loginWrapper}>
        <h1>Please Login !!!!</h1>
        <LoginReduxForm onSubmit={onSubmit} captcha={props.captcha}/>
      </div>
    )
  }
}

const mapStateToProps = (state: AppStateType): MapStateProps => {
  return {
    isAuthorized: state.authorizeUser.isAuthorized,
    captcha: state.authorizeUser.captcha
  }
}

export default connect(mapStateToProps, {loginUser})(Login);
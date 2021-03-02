import React from 'react';
import styles from './MyPosts.module.css';
import {Field, reduxForm} from 'redux-form'
import {TextArea} from "../../common/FormControl/FormsControl";
import {maxLengthValidatorCreate, required} from "../../../utils/validator/validator";

const maxLengthField15 = maxLengthValidatorCreate(15);

const MyPostForm = (props) => {

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field component={TextArea}
                 validate={[required, maxLengthField15]}
                 name={'newPostText'}
                 placeholder={'Type here your new post'}/>
          <button>Send Post</button>
        </div>
      </form>
    </div>
  )
}

const MyPostFormRedux = reduxForm({form: 'newPostForm'})(MyPostForm);

const MyPosts = (props) => {

  const addPost = (value) => {
    props.addPost(value.newPostText)
  }

  return (
    <div className={styles.myposts}>
      <MyPostFormRedux onSubmit={addPost}/>
      {props.myPosts}
    </div>
  )
}

export default MyPosts
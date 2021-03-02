import React from 'react';
import styles from './SendMessage.module.css';
import {Field, reduxForm} from "redux-form";
import {TextArea} from "../../common/FormControl/FormsControl";
import {maxLengthValidatorCreate, required} from "../../../utils/validator/validator";

const maxLengthField15 = maxLengthValidatorCreate(15);

const SendMessageForm = (props) => {

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field name={'newMessageText'}
                 validate={[required, maxLengthField15]}
                 component={TextArea}
                 placeholder={'Type your message here'}/>
        </div>
        <div>
          <button>Send message</button>
        </div>
      </form>
    </div>
  )
}

const SendMessageFormRedux = reduxForm({form: 'sendMessageForm'})(SendMessageForm);

const SendMessage = (props) => {

  const onSubmit = (formData) => {
    props.sendMessage(formData.newMessageText)
  }

  return (
    <div className={styles.addPostSection}>
      <SendMessageFormRedux onSubmit={onSubmit}/>
    </div>
  )
}

export default SendMessage;
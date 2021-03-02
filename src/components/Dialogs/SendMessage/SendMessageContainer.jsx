import SendMessage from './SendMessage';
import {sendMessage} from '../../../redux/dialogsPage-reducer';
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {
    newMessageText: state.dialogsPage.newMessageText
  }
}

const SendMessageContainer = connect(mapStateToProps, {sendMessage})(SendMessage);

export default SendMessageContainer;
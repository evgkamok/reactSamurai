const SEND_MESSAGE = 'SEND_MESSAGE';

type NameType = {
  id: number,
  name: string,
}

type MessageType = {
  id: number
  message: string
}

type InitialStateType = typeof initialState;

const initialState = {
  namesData: [
    {id: 1, name: 'Dima'},
    {id: 2, name: 'Misha'},
    {id: 3, name: 'Artem'},
    {id: 4, name: 'Lesha'},
    {id: 5, name: 'Sasha'},
    {id: 6, name: 'Grisha'},
  ] as Array<NameType>,
  messagesData: [
    {id: 1, message: 'Hello'},
    {id: 2, message: 'How are you ?'},
    {id: 3, message: 'How old are you ?'}
  ] as Array<MessageType>
}

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
      const newMessage = {
        id: 999,
        message: action.textMessage,
      }
      return {
        ...state,
        messagesData: [...state.messagesData, newMessage],
      }
    default:
      return state;
  }
}

type SendMessageActionType = {
  type: typeof SEND_MESSAGE
  textMessage: string
}
export const sendMessage = (textMessage: string): SendMessageActionType => ({type: SEND_MESSAGE, textMessage});

export default dialogsReducer;

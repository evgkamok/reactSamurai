import profilePageReducer from './profile-reducer';
import dialogsPageReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';

const store = {
  _state: {
    dialogsPage: {
      namesData: [
        { id: 1, name: 'Dima', avatarUrl: 'https://www.pinclipart.com/picdir/middle/78-789013_digital-product-designer-avatar-clipart.png' },
        { id: 2, name: 'Misha', avatarUrl: 'https://yt3.ggpht.com/a/AATXAJxzipABt6i1VBC3xK1Ae4lVXtl2eYxHcpfIYTO6Yw=s900-c-k-c0xffffffff-no-rj-mo' },
        { id: 3, name: 'Artem', avatarUrl: 'https://yt3.ggpht.com/a/AATXAJzScTUctO-lhLQlG2rPVoQTkwvAsjcHR1ykquCnCA=s900-c-k-c0xffffffff-no-rj-mo' },
        { id: 4, name: 'Lesha', avatarUrl: 'https://yt3.ggpht.com/a/AATXAJwPr2tvdxxyiuih0zf9F6XIs6HSNbYvTThYU9uLF7w=s900-c-k-c0xffffffff-no-rj-mo' },
        { id: 5, name: 'Sasha', avatarUrl: 'https://yt3.ggpht.com/a/AATXAJxgKTROGfuL8fqvRGLkkdGaUNWjKETTMu1giw=s900-c-k-c0xffffffff-no-rj-mo' },
        { id: 6, name: 'Grisha', avatarUrl: 'https://im0-tub-ru.yandex.net/i?id=e0d3b461ca9ea58e6b5535ee63ea5053&ref=rim&n=33&w=150&h=150' },
      ],
      messagesData: [
        { id: 1, message: 'Hello' },
        { id: 2, message: 'How are you ?' },
        { id: 3, message: 'How old are you ?' }
      ],
      newMessageText: 'MessagesListContainer from State.js'
    },
    profilePage: {
      postsData: [
        { id: 1, message: 'Hello, it is my first post' },
        { id: 2, message: 'Hello, it is my second post' },
        { id: 3, message: 'Hello, it is my third post' }
      ],
      newPostText: 'post from State.js'
    },
    sidebar: {
      freindsbar: [
        { id: 1, name: 'Dima', avatarUrl: 'https://www.pinclipart.com/picdir/middle/78-789013_digital-product-designer-avatar-clipart.png' },
        { id: 2, name: 'Misha', avatarUrl: 'https://yt3.ggpht.com/a/AATXAJxzipABt6i1VBC3xK1Ae4lVXtl2eYxHcpfIYTO6Yw=s900-c-k-c0xffffffff-no-rj-mo' },
        { id: 3, name: 'Artem', avatarUrl: 'https://yt3.ggpht.com/a/AATXAJzScTUctO-lhLQlG2rPVoQTkwvAsjcHR1ykquCnCA=s900-c-k-c0xffffffff-no-rj-mo' },
        { id: 3, name: 'Artem', avatarUrl: 'https://yt3.ggpht.com/a/AATXAJzScTUctO-lhLQlG2rPVoQTkwvAsjcHR1ykquCnCA=s900-c-k-c0xffffffff-no-rj-mo' },
        { id: 3, name: 'Artem', avatarUrl: 'https://yt3.ggpht.com/a/AATXAJzScTUctO-lhLQlG2rPVoQTkwvAsjcHR1ykquCnCA=s900-c-k-c0xffffffff-no-rj-mo' },
        { id: 3, name: 'Artem', avatarUrl: 'https://yt3.ggpht.com/a/AATXAJzScTUctO-lhLQlG2rPVoQTkwvAsjcHR1ykquCnCA=s900-c-k-c0xffffffff-no-rj-mo' },
      ]
    }
  },

  _callSubscriber() {
    console.log('Subscribed');
  },

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.dialogsPage = dialogsPageReducer(this._state.dialogsPage, action);
    this._state.profilePage = profilePageReducer(this._state.profilePage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);
    this._callSubscriber(this._state);
  },
}

export default store;
window.state = store._state.dialogsPage.newMessageText;
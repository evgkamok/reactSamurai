import profilePageReducer, {addPost, deletePost} from "./profilePage-reducer";

const state = {
  postsData: [
    {id: 1, message: 'Hello, it is my first post'},
    {id: 2, message: 'Hello, it is my second post'},
    {id: 3, message: 'Hello, it is my third post'}
  ]
};

it('length of post should be increase', () => {
  const action = addPost('it-kama');
  const newState = profilePageReducer(state,action);
  expect(newState.postsData.length).toBe(4);
})

it('data of post should be equally data from action', () => {
  const action = addPost('it-kama');
  const newState = profilePageReducer(state,action);
  expect(newState.postsData[3].message).toBe('it-kama');
})

it('after deleting, length of post data should be decrement', () => {
  const action = deletePost(1);
  const newState = profilePageReducer(state,action);
  expect(newState.postsData.length).toBe(2)
})
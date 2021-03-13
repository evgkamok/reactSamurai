import profilePageReducer, {addPost, deletePost} from "./profilePage-reducer";

const state = {
  postsData: [
    {id: 1, message: 'Hello, it is my first post'},
    {id: 2, message: 'Hello, it is my second post'},
    {id: 3, message: 'Hello, it is my third post'}
  ]
};


it('lenght of post should be increase', () => {
  let action = addPost('it-kama');
  let newState = profilePageReducer(state,action);
  expect(newState.postsData.length).toBe(4);
})

it('data of post ecual data from action', () => {
  let action = addPost('it-kama');
  let newState = profilePageReducer(state,action);
  expect(newState.postsData[3].message).toBe('it-kama');
})

it('after deleting, length of post data shold be decrement', () => {

  const action = deletePost(1);
  let newState = profilePageReducer(state,action);
  expect(newState.postsData.length).toBe(2)
})
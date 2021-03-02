import React from 'react';
import {connect} from "react-redux";
import {addPost} from '../../../redux/profilePage-reducer';

import Post from './Post/Post';
import MyPosts from './MyPosts';

const mapStateToProps = (state) => {
      const myPosts = state.profilePage.postsData.map(post => <Post key={post.id} message={post.message}/>);
  return {
    myPosts
  }
}



export default connect(mapStateToProps, {addPost})(MyPosts);

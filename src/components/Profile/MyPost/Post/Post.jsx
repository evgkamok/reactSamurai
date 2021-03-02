import React from 'react';
import styles from './Post.module.css'

const Post = (props) => {
  return (
    <div className={styles.post}>
      <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/96be2232163929.567197ac6fb64.png" alt="avatar"/>
      <span>{props.message}</span>
    </div>
  )
}

export default Post;
import React ,{useState}from 'react';
import Comment from '../component/Main/Comment';
import styles from '../assets/scss/layout/NavRight.scss';
import Profile from '../userUpdate/Profile';

const NavRight = ({postidforComment}) => {
    
    return (
        <div className={styles.NavRight}>
            
            {// <Comment postidforComment={postidforComment}/>
            }
           
            {postidforComment==='' || postidforComment==undefined?<Profile/>:<Comment postidforComment={postidforComment}/>}
        </div>
    );
};

export default NavRight;
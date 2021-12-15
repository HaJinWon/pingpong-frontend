import React ,{useState}from 'react';
import Comment from '../component/Main/Comment';
import styles from '../assets/scss/layout/NavRight.scss'

const NavRight = ({postidforComment}) => {
    
    return (
        <div className={styles.NavRight}>
            
            {//postidforComment==='' || postidforComment==undefined?<h2>NavRight</h2>:<Comment postidforComment={postidforComment}/>
            }
            <Comment postidforComment={postidforComment}/>
            
        </div>
    );
};

export default NavRight;
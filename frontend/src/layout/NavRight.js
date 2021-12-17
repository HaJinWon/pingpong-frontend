import React ,{useState}from 'react';
import Comment from '../component/Main/Comment';
import styles from '../assets/scss/layout/NavRight.scss';
import Profile from '../userUpdate/Profile';

const NavRight = ({postidforComment, postforComment}) => {
    //navright 로 들어오는 정보를 통해 profile을 출력할지 commnet를 출력할지 결정하는 comment
    return (
        <div className={styles.NavRight}>
            {(postidforComment==='' || postidforComment==undefined||postforComment==='' || postforComment==undefined?<Profile/>:<Comment postidforComment={postidforComment} postforComment={postforComment}/>)}
        </div>
    );
};

export default NavRight;
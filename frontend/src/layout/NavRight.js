import React ,{useState}from 'react';
import Comment from '../component/Main/Comment';
import styles from '../assets/scss/layout/NavRight.scss';
import Profile from '../userUpdate/Profile';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import Button from 'react-bootstrap/esm/Button';

const NavRight = (props) => {
    //navright 로 들어오는 정보를 통해 profile을 출력할지 commnet를 출력할지 결정하는 comment
    return (
        <div className={styles.NavRight}>
            <Button onClick={props.showNavRight}>x</Button>
            {(props.postidforComment==='' || props.postidforComment==undefined||props.postforComment==='' || props.postforComment==undefined?<Profile/>:<Comment postidforComment={props.postidforComment} postforComment={props.postforComment}/>)}
        </div>
    );
};

export default NavRight;
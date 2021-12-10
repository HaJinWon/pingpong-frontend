import React ,{useState}from 'react';
import Comment from '../component/Main/Comment';
import styles from '../assets/scss/layout/NavRight.scss'

const NavRight = () => {
    return (
        <div className={styles.NavRight}>
            <h2>NavRight</h2>
            <Comment/>
        </div>
    );
};

export default NavRight;
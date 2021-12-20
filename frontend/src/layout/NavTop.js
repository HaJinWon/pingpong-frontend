import React ,{useState}from 'react';

import styles from '../assets/scss/layout/NavTop.scss'

const NavTop = (props) => {
    return (
        <header className={styles.NavTop}>
           
            <button className="OpenProfile" onClick={props.showNavRight}>프로필 열기</button>
        </header>
    );
};
export default NavTop;
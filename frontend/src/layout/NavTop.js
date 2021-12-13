import React ,{useState}from 'react';

import styles from '../assets/scss/layout/NavTop.scss'

const NavTop = ({isSearch}) => {
    return (
        <header className={styles.NavTop}>
            <form className="SearchForm">                           
                    <input type='text' className='kwd' />
                    <input type='submit' value="찾기" className='submit'/>
            </form>
            
            <button className="OpenProfile">프로필 열기</button>
        </header>
    );
};

export default NavTop;
import React ,{useState}from 'react';

import styles from '../assets/scss/layout/NavTop.scss'

const NavTop = (props) => {
    const handlerOpenNavRight=(e)=>{
        e.preventDefault()
    }
    return (
        <header className={styles.NavTop}>
            <form className="SearchForm">                   {/**삭제예정 */}                 
                    <input type='text' className='kwd' />
                    <input type='submit' value="찾기" className='submit'/>
            </form>
            
            <button className="OpenProfile" onClick={handlerOpenNavRight}>프로필 열기</button>
        </header>
    );
};
export default NavTop;
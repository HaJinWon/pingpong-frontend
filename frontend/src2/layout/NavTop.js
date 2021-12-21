import React ,{useState}from 'react';

import styles from '../assets/scss/layout/NavTop.scss'

const NavTop = (props) => {

    const handlerLogOut =async(e)=>{
        e.preventDefault();

        await fetch(`/api/member/logout`, {
            method: 'get',
            mode: 'cors',
            credentials: 'include',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrer: 'client',
            body: null
        })

        alert('로그아웃이 완료 되었습니다.');
        location.href='/login';

    }
    return (
        <header className={styles.NavTop}>
            {/*
            <form className="SearchForm">                            
                    <input type='text' className='kwd' />
                    <input type='submit' value="찾기" className='submit'/>
            </form>
            */}
             <button className="OpenProfile" onClick={props.showNavRight}>프로필 열기</button>
            <button className="LogOut" onClick={handlerLogOut}>로그아웃</button>

        </header>
    );
};
export default NavTop;
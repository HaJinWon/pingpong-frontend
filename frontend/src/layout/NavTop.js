import React ,{useState}from 'react';

import styles from '../assets/scss/layout/NavTop.scss'

const NavTop = (props) => {
    const handlerOpenNavRight=(e)=>{
        e.preventDefault()
    }

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
            <div className={styles.Block}>
                PINGPONG
            </div>
        </header>
    );
};
export default NavTop;
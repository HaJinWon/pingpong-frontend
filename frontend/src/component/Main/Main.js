import React ,{useState}from 'react';
import SiteLayout from '../../layout/SiteLayout';
import styles from '../../../assets/scss/Main.scss';

const Main = () => {
    const authUser=window.sessionStorage.getItem("loginMember");
    console.log('authUser : ', authUser);
    
    return (
        <SiteLayout >
            <h2>[Main]</h2>
        </SiteLayout>
    );
};


export default Main;
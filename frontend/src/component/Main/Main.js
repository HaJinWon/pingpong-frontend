import React ,{useState}from 'react';
import SiteLayout from '../../layout/SiteLayout';
import styles from '../../../assets/scss/Main.scss';

const Main = ({isLogin, Post}) => {
    
    return (
        <SiteLayout isLogin={isLogin} Post={Post}>
            <h2>[Main] isLogin : {isLogin}   Post : {Post}</h2>
        </SiteLayout>
    );
};


export default Main;
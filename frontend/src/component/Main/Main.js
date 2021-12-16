import React ,{useState}from 'react';
import SiteLayout from '../../layout/SiteLayout';
import styles from '../../../assets/scss/Main.scss';
import Button from 'react-bootstrap/Button';


const Main = () => {
    const authUser=window.sessionStorage.getItem("loginMember");
    console.log('authUser : ', authUser);
    
    return (
        <SiteLayout>
            <h2>[Main]</h2>
        <Button variant='집갈래'>집갈래앵</Button>
        <Button variant="outline-primary">집갈래앵</Button>{' '}
       
        </SiteLayout>
    );
};


export default Main;
import React, {useState, useEffect} from 'react';
import LoginForm from './LoginForm';
import LogoImage from './LogoImage';

export default function() {
    

    return (
        <div className='User' >
            <LogoImage/>
            <LoginForm/>
        </div>
    )
}
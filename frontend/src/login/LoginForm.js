import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from '../assets/css/LoginForm.css';

export default function() {

    const styleBtnDiv = {
        border:'1px solid blue',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }

    const [formInfo, setFormInfo] = useState({
        email: '',
        password: ''
    });

    const handlerSubmit = async (e) => {
        e.preventDefault();
        console.log(formInfo);
        
    /*
        await axios.post('http://localhost:8080/api/members', formInfo, {
        headers: { "Content-Type": `application/json`}
        }
        ).then((res) => {
            console.log(res.data);
            if(res.data !== null){
                location.href='/login';
            } else{
                alert("로그인 실패");
            }
        });
    */
    await axios.post('/api/members/login', formInfo, {
    headers: { "Content-Type": `application/json`}
    }
    ).then((res) => {
        console.log(res.data);
        if(res.data !== null){
            location.href='/login';
        } else{
            alert("로그인 실패");
        }
    });


    } 

    //changeForm 함수
    const chgForm = (e) => {
        let { name, value } = e.target;

        setFormInfo({
        ...formInfo,
        [name]: value,
        });

        console.log(formInfo);
    };
    
    return (
        <div className={styles.LoginForm}>
            <form id = 'loginForm' onSubmit={handlerSubmit}>
                <input type = 'text' name='email' placeholder='Email' onChange={chgForm}/>
                <input type = 'password' name='password' placeholder='Password' onChange={chgForm} />
                <div id='buttonDiv' style={styleBtnDiv}>
                    <input type = 'button' id='join' value='회원가입'  />
                    <input type = 'submit' value = '로그인'/>
                </div>
            </form>
            <a href=''>ID / PW 찾기</a>
        </div>
    )
}
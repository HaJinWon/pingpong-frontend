import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import styles from '../assets/css/JoinForm.css';
import Modal from 'react-bootstrap/Modal'


const JoinForm = () => {
    const styles4 ={
        width:'35vh'
    }
    const formStyle ={
        width:'35vh'
    }
    //const [email, setEmail] = useState('');
    //const [pwdChk, setPwdChk] = useState('');
    const [emailCheck, setEmailCheck] = useState('');
    const [formInfo, setFormInfo] = useState({
        "email": '',
        "password": '',
        "password2": '',
        "name": '',
        "phone": '',
        "company": ''
    });

    const handlerSubmit = async (e) => {
        e.preventDefault();

        /**
         *  빈값 확인
         */
        // if(!email_check(formInfo.email)){
        //     alert('Email 형식이 올바르지 않습니다.');
        //     return;
        // }
        if(formInfo.email == ''){
            alert("Email을 입력해주세요.");
            return;
        }
        if(formInfo.password == ''){
            alert("비밀번호를 입력해주세요.");
            return;
        }
        if(formInfo.password !== formInfo.password2){
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        if(formInfo.name == ''){
            alert("이름을 입력해주세요.");
            return;
        }
        if(formInfo.phone == ''){
            alert("전화번호를 입력해주세요.");
            return;
        }

        await axios.post('/api/member', formInfo, {
            headers: { "Content-Type": `application/json` }
        }
        ).then((res) => {
            console.log(res.data);
            if (res.data !== null) {
                location.href = '/login';
            } else {
                alert("회원가입 실패");
            }
        });
    }

    //changeForm 함수
    const chgForm = (e) => {
        let { name, value } = e.target;
        //console.log("login changeForm 함수 : ", e.target)
        setFormInfo({
            ...formInfo,
            [name]: value,
        });

    };
    // 이메일 중복 체크 함수
    const checkEmail = async (e) => {
        console.log("checkmail");

        let { name, value } = e.target;
        setFormInfo({
            ...formInfo,
            [name]: value,
        });

        if (value == '') {
            return;
        }
        console.log('value=', value)
        try {
            const response = await fetch(`/api/member/emailcheck/${value}`, {
                method: 'get',
                mode: 'cors',                          // no-cors, cors, same-origin
                credentials: 'include',                // include, omit, same-origin
                cache: 'no-cache',                     // no-cache, reload, force-cache, default*
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                redirect: 'follow',                    // follow*, error, manual(response.url)
                referrer: 'client',                    // no-refferer, *client
                body: null
            });

            const jsonResult = await response.json();
            if (jsonResult.data !== null) {
                setEmailCheck('사용중인 Email입니다.');
            } else {
                setEmailCheck('');
            }
            console.log(jsonResult.data);
        } catch (err) {
            console.error(err);
        }

    }

    // 이메일 형식 유효성 검사 함수
    const email_check =( email )=> { 
        const regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/; 
        return (email != '' && email != 'undefined' && regex.test(email)); 
    }


    const test = ()=>{

    }


    return (
        <div className={styles.JoinForm}>
            {/*
            <form   >
                <input type='text' name='email' placeholder='Email' onChange={chgForm, checkEmail} />
                <div className='emailckeck'></div>
                <input type='password' name='password' placeholder='Password' onChange={chgForm} />
                <input type='password' name='password2' placeholder='Password-re' onChange={chgForm} />
                <div className='emailckeck'>{pwdChk}</div>
                <input type='text' name='name' placeholder='Name' onChange={chgForm} />
                <input type='text' name='phone' placeholder='Phone' onChange={chgForm} />
                <input type='text' name='company' placeholder='Company' onChange={chgForm} />
                <Button variant="primary" size="lg" as='input' type='submit' value='회원가입' />
                <input type='submit' value='회원가입' />
            </form>
            */}
            <Form onSubmit={handlerSubmit} style={formStyle}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label >Email address</Form.Label>
                    <Form.Control type="email" placeholder="Email" onChange={chgForm,checkEmail} name='email'/>
                    <Form.Text className="text-muted">
                    {emailCheck}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={chgForm} name='password'/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password-Re</Form.Label>
                    <Form.Control type="password" placeholder="Password-re" onChange={chgForm} name='password2'/>
                </Form.Group>
                <Form.Text className="text-muted">

                </Form.Text>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" onChange={chgForm} name='name'/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" placeholder="Phone" onChange={chgForm} name='phone'/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Company</Form.Label>
                    <Form.Control type="text" placeholder="Company" onChange={chgForm} name='company'/>
                </Form.Group>
                <Button variant="primary" type="submit" style={styles4}>
                    회원가입
                </Button>
            </Form>
        </div>
    );
};

export default JoinForm;
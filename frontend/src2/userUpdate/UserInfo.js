import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../assets/scss/profileImg.scss'


import DefaultImage from '../assets/images/Im0.jpg';

const UserInfo = (props) => {

    const [formInfo, setFormInfo] = useState({
        "name": '',
        "avatar": '',
        "phone": '',
        "company":''
    });

    const chgForm = (e) => {

        let { name, value } = e.target;

        setFormInfo({
        ...formInfo,
        [name]: value,
        });
        
        console.log(formInfo);

    };
    
    useEffect(async () => {

        try{
            const response = await fetch('/api/member/edit', {          //로그인한 회원의 회원정보를 가져오는 부분 
                method: 'get',
                mode:'cors',                         
                credentials:'include',                
                cache:'no-cache',                    
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                redirect:'follow',                   
                referrer:'client',                   
                body: null
            });

            const jsonResult = await response.json();
            if(jsonResult.result !== 'success') {
            throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            }
            setFormInfo({'name':jsonResult.data.name,'imageFile':jsonResult.data.imageFile, 'email':jsonResult.data.email, 'phone':jsonResult.data.phone, 'company':jsonResult.data.company});
            
        } catch(err){

        }
    },[]);
    const styles ={
        backgroundImage:formInfo.avatar
    }
    return (
        <div className={styles.profileImg} >
           <div > {<Image src={DefaultImage} roundedCircle={true} className="img-responsive center-block" width='150px' alt='프로필 이미지'/>
            }</div>
           
        <div className='User UpdateForm'>
        <br/>
        <h4 >회원정보 수정</h4>
        <br/>
            <Form >

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label >Email address</Form.Label><br/>
                    <Form.Text  name='email' >{formInfo.email}</Form.Text>
                </Form.Group> 
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Name</Form.Label><br/>
                    <Form.Text  name='name' >{formInfo.name}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Phone</Form.Label><br/>
                    <Form.Text  name='phone' >{formInfo.phone}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Company</Form.Label><br/>
                    <Form.Text  name='company' >{formInfo.company}</Form.Text>
                </Form.Group>
                <Button variant="primary" type="button" onClick={props.handlerOnChangeComponent}>
                    회원정보 수정
                </Button>
               
            </Form>
        </div>
    





        </div>
    );
};

export default UserInfo;


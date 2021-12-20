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

const UserUpadteForm = (props) => {

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

    const handlerSubmit = async (e)=>{
        e.preventDefault();

        await axios.patch('/api/member/edit', formInfo, {            //회원정보 수정 부분
            headers: { "Content-Type": `application/json`}
            }
            ).then((res) => {
                console.log(res.data);
                if(res.data !== null){
                    console.log('수정된 내용 : ',formInfo)
                    props.handlerOnChangeComponent()
                } else{
                    alert('수정실패');
                }
            });
    }
    
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
            console.log(jsonResult);
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
            <Form onSubmit={handlerSubmit} >
                <input type='file' name ='imageFile' onChange={chgForm}/>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label >Email address</Form.Label>
                        <Form.Control type="email" value={formInfo.email} onChange={chgForm}  name='email' disabled />
                </Form.Group> 
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={formInfo.name} onChange={chgForm} name='name'/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" value={formInfo.phone} onChange={chgForm} name='phone'/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Company</Form.Label>
                    <Form.Control type="text" value={formInfo.company} onChange={chgForm} name='company'/>
                </Form.Group>
                <Button variant="primary" type="button" onClick={ props.handlerOnChangeComponent}>
                    돌아가기
                </Button>
                <Button variant="primary" type="submit" >
                    회원정보 수정
                </Button>
            </Form>
        </div>
    





        </div>
    );
};

export default UserUpadteForm;


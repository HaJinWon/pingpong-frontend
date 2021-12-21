import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image';
import DefaultImage from '../assets/images/Im0.jpg';
import Invitation from "../component/Main/Invitation";
import style from '../assets/scss/UserInfo.scss'
import InvitationList from '../component/Main/InvitationList';



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
       
        <div className={style.UserInfo}>
                <div className={style.img}> 
                    {<Image src={DefaultImage} roundedCircle={true} className="img-responsive center-block" width='150px' alt='프로필 이미지'/>}
                </div>
                <br/>
                <div id='avatarImage' style={styles}>{formInfo.avatar}</div>
                <div className='User UpdateForm'>
                <div className={style.form}>
                <h4 >회원정보 수정</h4>
                <br/>
                    

                        
                            <h5>Email address</h5>
                            <h6  name='email' >{formInfo.email}</h6>
                       
                            <h5>Name</h5>
                            <h6  name='name' >{formInfo.name}</h6>
                       
                            <h5>Phone</h5>
                            <h6  name='phone' >{formInfo.phone}</h6>
                       
                            <h5>Company</h5>
                            <h6  name='company' >{formInfo.company}</h6>
                        
                        <br/>
                        <div  className={style.button}>
                            <Button variant="primary" type="button" onClick={props.handlerOnChangeComponent}>
                                  {`회원정보 수정`}  
                            </Button>
                        </div>
                    
                    
                    </div>
                </div>



                <br />
                <br />
                {
                <InvitationList />
                }
                



        </div>
    );
};

export default UserInfo;


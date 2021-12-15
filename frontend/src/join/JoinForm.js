import React,{useState} from 'react';
import axios from 'axios';

const JoinForm = () => {

    //const [email, setEmail] = useState('');
    const [pwdChk, setPwdChk] = useState('');
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
        console.log(JSON.stringify(formInfo));
        
        await axios.post('/api/member', formInfo, {
        headers: { "Content-Type": `application/json`}
        }
        ).then((res) => {
            console.log(res.data);
            if(res.data !== null){
                location.href='/login';
            } else{
                alert("회원가입 실패");
            }
        });
    } 

    //changeForm 함수
    const chgForm = (e) => {
        let { name, value } = e.target;
                                                                        console.log("login changeForm 함수 : ",e.target)
        setFormInfo({
        ...formInfo,
        [name]: value,
        });
                                                                        console.log("login changeForm 함수 : ",formInfo)        
        if(formInfo.password !== formInfo.password2){
            setPwdChk('비밀번호가 일치하지 않습니다.');
        } else{
            setPwdChk('');
        }

        console.log(formInfo);
        console.log(formInfo.email);
    };
    // 이메일 중복 체크 함수
    const checkEmail = async (e)=>{
        console.log("checkmail");
        
        let { name, value } = e.target;
        setFormInfo({
            ...formInfo,
            [name]: value,
        });

        if(value==''){
            return;
        }
        console.log('value=',value)
        try{
            const response = await fetch(`/api/member/emailcheck/${value}`, {
                method: 'get',
                mode:'cors',                          // no-cors, cors, same-origin
                credentials:'include',                // include, omit, same-origin
                cache:'no-cache',                     // no-cache, reload, force-cache, default*
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                redirect:'follow',                    // follow*, error, manual(response.url)
                referrer:'client',                    // no-refferer, *client
                body: null
            });

            const jsonResult = await response.json();
            if(jsonResult.data !== null){
                    setEmailCheck('사용중인 Email입니다.');
            } else {
                setEmailCheck('');
            }
            console.log(jsonResult.data);
        } catch (err){
            console.error(err);
        }
          
    }

    

    return (
        <form className='JoinForm' onSubmit={handlerSubmit}>
            <input type='text' name='email' placeholder='Email' onChange={chgForm,checkEmail}/>
            <div className='emailckeck'>{emailCheck}</div>
            <input type='password' name='password'placeholder='Password' onChange={chgForm}/>
            <input type='password' name='password2'placeholder='Password-re'onChange={chgForm}/>
            <div className='emailckeck'>{pwdChk}</div>
            <input type='text' name='name'placeholder='Name'onChange={chgForm}/>
            <input type='text' name='phone'placeholder='Phone' onChange={chgForm}/>
            <input type='text' name='company'placeholder='Company'onChange={chgForm}/>
            <input type='submit' value='회원가입'/>
        </form>
    );
};

export default JoinForm;
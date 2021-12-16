import React, { useState,useRef, useEffect } from 'react';
import styles from '../../assets/css/InputText.css';
const InputText = ({notifyMessage}) => {

    const loginMember = JSON.parse(window.sessionStorage.getItem("loginMember"));
    
    const [MessageForm, setMessageForm] = useState('');
    const [Message, setMessage] = useState({
        sender:loginMember.name,
        senderId:loginMember.id,
        message:''
    });
    const inputRef = useRef(null);
    const chgForm =(e)=>{
        let { name, value } = e.target;
    
        // setMessageForm({
        // ...MessageForm,
        // [name]: value,
        // });

        console.log(MessageForm);
        // setMessage({...Message,message:MessageForm.message});
        setMessage({...Message,message:value});
        console.log(loginMember.name);
    }

    const handlerSubmit = (e)=>{
        e.preventDefault();
        console.log(Message);
        notifyMessage.add(Message);
        inputRef.current.reset();
        // setMessage([{...Message,message:''}]);
    }

    const test = ()=>{
        console.log(Message);
    }

    const keyPress = (e)=>{
        const {key, value} = e.target;
        if(key==='Enter'){
            handlerSubmit();
        }
    }

    return (
        <div>
            <form className={styles.Form} onSubmit={handlerSubmit} ref={inputRef}>
                <input type='text' name='message' className={styles.MessageBox} onChange={chgForm} onKeyPress={keyPress}/>
                <input type='submit' value='입력' className={styles.SubmitBtn}/>
            </form>
            <input type='button' value='test' onClick={test}/>
        </div>
    );
};

export default InputText;
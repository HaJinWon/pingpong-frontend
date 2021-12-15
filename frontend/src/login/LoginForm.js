import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from '../assets/css/LoginForm.css';

export default function() {

    //const [authUser, setAuthUser] =useState(null);

    const [selectTeam, setSelectTeam]=useState('');
    const [successAdd, setSuccessAdd]=useState(true);

    const styleBtnDiv = {
        border:'1px solid blue',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }

    const [formInfo, setFormInfo] = useState({
        'email': '',
        'password': ''
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
        await axios.post('/api/member/login', formInfo, {

        headers: { "Content-Type": `application/json`}
        }).then((res) => {
            console.log(res.data.member.id);
            if(res.data.member.id !== null){
                //setAuthUser();    
                window.sessionStorage.setItem("loginMember",JSON.stringify(res.data.member));
                //console.log(window.sessionStorage.getItem("authUser"));
                alert('로그인 성공');
                setSuccessAdd(!successAdd)
                
            } else{
                alert("로그인 실패");
            }
        }
        
        
        
        );


    } 

    useEffect(async()=>{        //nav 리스트 가져오는 useEffect
        
        teamList:{       //team
            try {
                const response = await fetch('/api/team/list', {
                method: 'get',
                mode: 'cors',                           
                credentials: 'include',                 
                cache: 'no-cache',                           
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'         
                },
                redirect: 'follow',                     
                referrer: 'client',                       
                body: null
                })
                const data = await response.json();
                console.log(data);
               
                window.sessionStorage.setItem("selectTeam",JSON.stringify(data.data.teamList[0]));  //받아온 team list 중 디폴트 team을 session storage에 할당
                //console.log('세션에 담아놨던 팀 아이디',JSON.parse(sessionStorage.getItem("selectTeam")).team_id);   //selectTeam name
                setSelectTeam(JSON.parse(sessionStorage.getItem("selectTeam")).team_id);
                console.log('select team : ',JSON.parse(sessionStorage.getItem("selectTeam")).team_id);
                //console.log('selectTeam에 담아두었던 팀아이디',selectTeam.team_id);   //selectTeam name

                selectTeam===''?null:location.href=`/main/${selectTeam}`;
            }catch(err){
                console.log(err);
            }
            
        }},[successAdd]);

    //changeForm 함수
    const chgForm = (e) => {
        let { name, value } = e.target;

        setFormInfo({
        ...formInfo,
        [name]: value,
        });

        console.log(formInfo);
    };
    
    //
    const moveJoin = (e)=>{
        e.preventDefault();
        location.href='/join';
    }
    return (
        <div className={styles.LoginForm}>
            <form id = 'loginForm' onSubmit={handlerSubmit}>
                <input type = 'text' name='email' placeholder='Email' onChange={chgForm}/>
                <input type = 'password' name='password' placeholder='Password' onChange={chgForm} />
                <div id='buttonDiv' style={styleBtnDiv}>
                    <input type = 'button' id='join' value='회원가입' onClick={moveJoin} />
                    <input type = 'submit' value = '로그인'/>
                </div>
            </form>
            <a href=''>ID / PW 찾기</a>
        </div>
    )
}
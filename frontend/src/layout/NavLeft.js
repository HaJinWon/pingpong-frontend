import React ,{useEffect, useState}from 'react';
import { NavLink } from 'react-router-dom';

import styles from '../assets/scss/layout/NavLeft.scss'


const NavLeft = ({isLogin}) => {
    const [pid, setPid] = useState(1);
    const [successAdd, setSuccessAdd]=useState(false);
    const [posts, setPosts] = useState([]);
    const [teams, setTeams] = useState([]);
    const [parts, setParts] = useState([]);
   
    useEffect(async()=>{        //nav 리스트 가져오는 useEffect
        console.log("useeffect in");
  
        try {
           // const response = await fetch('/api/team/1', {
            const response = await fetch('/api/team/1', {
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
            console.log(data.postList);
            setPosts( data.postList);
            setTeams(data.teamInfo);
            setParts(data.partList);

            
      
        }catch(err){
            console.log(err);
        }
       
       
    },[])

   
        const notifyMemu={
            // teamAdd: async ({menu})=>{
            //     try {
            //         const response = await fetch('/api/team/create', {
            //         method: 'post',
            //         mode: 'cors',                           
            //         credentials: 'include',                 
            //         cache: 'no-cache',                           
            //         headers: {
            //             'Accept': 'application/json',
            //             'Content-Type': 'application/json'         
            //         },
            //         redirect: 'follow',                     
            //         referrer: 'client',                       
            //         body: JSON.stringify(menu)
            //         })

            //         //답장 받아서 제대로 들어갔는지 확인 후 메뉴를 추가해야하므로 입력은 강사님 스타일대로 가는 것이 좋을 것 같음.
            //         //
                    
            //     }catch(err){
            //         console.log(err);
            //     }
            //         //여기도 주소값 부여를 위해! 반환값이 꼭 필요함
            
            // },
            partAdd: async ({menu})=>{
                console.log("part 추가 in:", menu);
                try {
                    const response = await fetch('/api/part/add/1', {
                    //const response = await fetch('/api/part/add/1', {
                    method: 'post',
                    mode: 'cors',                           
                    credentials: 'include',                 
                    cache: 'no-cache',                           
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'         
                    },
                    redirect: 'follow',                     
                    referrer: 'client',                       
                    body: JSON.stringify(menu)
                    })

                    //답장 받아서 제대로 들어갔는지 확인 후 메뉴를 추가해야하므로 입력은 강사님 스타일대로 가는 것이 좋을 것 같음.
                    //
                    
                }catch(err){
                    console.log(err);
                }
                
            }
        }
       

    return (
        <nav className={styles.NavLeft}>
            <h3>Team</h3>
            <ul>
                 {teams.map((team, index)=>{return (<li key ={index} > <NavLink to ={team}>{team.name}</NavLink> </li>)})}
                 {//successAdd==''?null:notifyMemu.teamAdd(successAdd)
                 }
                 <li><input className = "menuInput" placeholder={"Team 추가"} onKeyPress={(e)=>{e.key=='Enter'?notifyMemu.teamAdd(e.target.value):false}}></input></li>
            </ul>
            <h3>Part</h3>
            <ul>
            
                 {
                    parts.map((part, index)=>{
                        return (<li key = {part.id}> <NavLink  to ={`/post/${part.part_id}`} >{part.name}</NavLink> </li>)
                    })}

                 {
                 //successAdd==''?null :notifyMemu.partAdd(successAdd)
                 }
                 <li><input className = "menuInput" name='name' placeholder={"Part 추가"} onKeyPress={(e)=>{e.key==='Enter'?notifyMemu.partAdd(e.target.value):console.log("실패")}}></input></li>
            </ul>
            {
                //parts.map(part=>{return (<li> <NavLink to ={part.part_id}>{part.name}</NavLink> </li>)})
            }
            <h3>Chat</h3>
            <ul>
                <li key = {1}>
                    <NavLink to ={`/chat/1`}>채팅방</NavLink>
                </li>
            </ul>
            
        </nav>
    
    );
    
};

export default NavLeft;
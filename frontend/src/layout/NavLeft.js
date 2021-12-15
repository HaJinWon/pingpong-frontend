import React ,{useEffect, useState}from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Modal from "react-modal";
import ReactModal from "react-modal";

import styles from '../assets/scss/layout/NavLeft.scss'


const NavLeft = () => {
    const {selectTeamId} = useParams();
    const [selectTeamName, setSelectTeamName] = useState('11');
    const [isLogin, setIsLogin] = useState(JSON.parse(window.sessionStorage.getItem('loginMember')).id);
    const [successChange, setSuccessChange]=useState(false);
    const [selectTeam, setSelectTeam]=useState('');
    const [posts, setPosts] = useState([]);      //필요없을 것 같은데.. 삭제요청
    const [teams, setTeams] = useState([]);     //NavLink에 배치될 team list 
    const [parts, setParts] = useState([]);     //NavLink에 배치될 part list
    const [modal02IsOpen, setModal02IsOpen] = useState(false);
    const [searchChatMember, setSearchChatMember] = useState('');
    const [changeValue, setChangeValue] = useState(0);
    
    console.log('select Team id : ',selectTeamId);
    console.log('select Team : ',selectTeam);

    //console.log('userid : ', window.sessionStorage.getItem('loginMember'));
    //const loginMenber = JSON.parse(window.sessionStorage.getItem('loginMember'));
    //console.log(loginMenber.id);
    const ChatSearchMember = (e)=>{
        e.preventDefault();
    }

    const chatSearchChg = (e)=>{
        let { name, value } = e.target;

        setSearchChatMember({
        ...searchChatMember,
        [name]: value,
        });
      
    }

    const handlerTeamChange =({team})=>{
        location.href=`/main/${team.team_id}`
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
                setTeams(data.data.teamList);       //teams state에 받아온 teamlist 주입
                
                setSelectTeam( data.data.teamList.filter((team)=>(team.team_id == selectTeamId)))
                setSelectTeamName(data.data.teamList.filter((team)=>(team.team_id == selectTeamId))[0].name);
              
            }catch(err){
                console.log(err);
            }
            
        }
        
        partList:{       //part
            try {
                const response = await fetch(`/api/part/list/${selectTeamId}`, {
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
                setParts(data.data.partList);       
                
            }catch(err){
                console.log(err);
            }
            

           
        }

    },[successChange])

        const notifyMemu={
            
            teamAdd: async (e)=>{
                console.log('menu',e.target.value);
                try {
                    const response = await fetch('/api/team/create', {
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
                    body: JSON.stringify({teamName:e.target.value})
                    })

                    
                }catch(err){
                    console.log(err);
                }
                setSuccessChange(!successChange)
            
            },
            partAdd: async (e)=>{
                console.log("part 추가 in:"+ selectTeam.team_id);
                try {
                    const response = await fetch(`/api/part/add/${selectTeam.team_id}`, {
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
                    body: JSON.stringify(e.target.value)
                    })
                    
                }catch(err){
                    console.log(err);
                }
                setSuccessChange(!successChange)
            },
            teamExit: async ({teamId})=>{
                  try {
                // Delete
                const response = await fetch(`/api/team/exit/${teamId}`, {
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
                });
    
                if (!response.ok) {
                throw `${response.status} ${response.statusText}`;
                }
    
                const json = await response.json();
                if (json.result !== 'success') {
                throw json.message;
                }
    
    
                } catch (err) {
                console.error(err);
                }
                setSuccessChange(!successChange)
            },
            partDel: async ({part_id})=>{
                console.log('partDel in ; ', part_id);
                  try {
                // Delete
                const response = await fetch(`/api/part/del/${part_id}`, {
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
                });
                 
                if (!response.ok) {
                throw `${response.status} ${response.statusText}`;
                }

                const json = await response.json();
                if (json.result !== 'success') {
                throw json.message;
                }
    
    
                } catch (err) {
                console.error(err);
                }
                setSuccessChange(!successChange)
            }
    
                
        }
       

    return (
        <nav className={styles.NavLeft}>
            
            <h3>🤝 {selectTeamName}</h3><button onClick={(e)=>{}}>➖</button>
            <ul>
                 {teams.map((team, index)=>{return (<li key ={index}><span onClick={ (e)=>{ handlerTeamChange({team})}}>{team.name}</span> <button onClick={(e)=>notifyMemu.teamExit({teamId:team.team_id})}>➖</button></li>)})}
                 <li><input className = "menuInput" placeholder={"Team 추가"} onKeyPress={(e)=>{e.key=='Enter'?notifyMemu.teamAdd(e):null}}></input></li>
            </ul>
            <h3>📚 Part</h3>
            <ul>
                 {
                    parts.map((part, index)=>{
                        return (<li key = {part.id}> <NavLink  to ={`/post/${part.part_id}`} >{part.name}</NavLink> <button onClick={(e)=>notifyMemu.partDel({part_id:part.part_id})}>➖</button></li>)})
                    }
                 <li><input className = "menuInput" name='name' placeholder={"Part 추가"} onKeyPress={(e)=>{e.key==='Enter'?notifyMemu.partAdd(e):null}}></input></li>
            </ul>
    
            <h3>🗨 Chat</h3><button onClick={ () => setModal02IsOpen(true)}>+</button>
            <ul>
                <li key = {1}>
                    <NavLink to ={`/chat/12`}>채팅방</NavLink>
                </li>
            </ul>

            <Modal
                isOpen={modal02IsOpen}
                onRequestClose={ () => setModal02IsOpen(false) }
                contentLabel="modal02 example">
                <form onSubmit={ChatSearchMember} onChange={chatSearchChg}>
                    <input type='text' name='member'/>
                    <input type='submit' value='검색'/>
                </form>
                <div>
                    <div>사진</div>
                    <div>검색된 유저 이름</div>
                </div>
            </Modal>
            
        </nav>
    
    );
    
};

export default NavLeft;
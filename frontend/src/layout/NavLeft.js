import React ,{useEffect, useState}from 'react';
import { NavLink } from 'react-router-dom';
import Modal from "react-modal";
import ReactModal from "react-modal";

import styles from '../assets/scss/layout/NavLeft.scss'


const NavLeft = ({isLogin}) => {
    const [pid, setPid] = useState(1);
    const [successAdd, setSuccessAdd]=useState(false);
    const [posts, setPosts] = useState([]);
    const [searchUserResult, setSearchUserResult] = useState([]);
    const [teams, setTeams] = useState([]);
    const [parts, setParts] = useState([]);
    const [chatRooms,setChatRooms] = useState([]);
    const [modal02IsOpen, setModal02IsOpen] = useState(false);
    const [selectedChatInvite, setSelectedChatInvite] = useState();


    const openChatInviteModal = async(e)=>{
        e.preventDefault();
        setModal02IsOpen(true);
        // let { name, value } = e.target;

        // setSearchChatMember({
        // ...searchChatMember,
        // [name]: value,
        // });

        const response = await fetch('/api/member/team/1', {
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

          const data = await response.json();
          console.log(data);
          setSearchUserResult(data);

    }

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
            });
            
            
            const data = await response.json();
            console.log(data.postList);
            setPosts( data.postList);
            setTeams(data.teamInfo);
            setParts(data.partList);

            const response2 = await fetch('/api/room/1', {
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

            const data2 = await response2.json();
            console.log(data2);
            setChatRooms(data2);

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
        const selectChatMember = (e)=>{
            //e.preventDefault();
            //setSelectChatInvite(e.target.value);
            console.log("radiobox",e.target.value);
            const selectedMemberId = e.target.value;
            setSelectedChatInvite(selectedMemberId);
            console.log("selectedInvite",selectedChatInvite);
        }

        const inviteHandler = (e) =>{
            e.preventDefault();
            console.log('submit',selectedChatInvite);
            
        }

    return (
        <nav className={styles.NavLeft}>
            <h3>Team</h3>
            <ul>
                 {teams.map((team, index)=>{return (<li key ={index} > <NavLink to ={team}>{team.name}</NavLink> </li>)})}
                 {
                 //successAdd==''?null:notifyMemu.teamAdd(successAdd)
                 }
                 <li><input className = "menuInput" placeholder={"Team 추가"} onKeyPress={(e)=>{e.key=='Enter'?notifyMemu.teamAdd(e.target.value):false}}></input></li>
            </ul>
            <h3>Part</h3>
            <ul>
                {
                    parts.map((part, index)=>{
                        return (<li key = {part.id}> <NavLink  to ={`/post/${part.part_id}`} >{part.name}</NavLink> </li>)})
                }

                 {
                 //successAdd==''?null :notifyMemu.partAdd(successAdd)
                 }
                 <li><input className = "menuInput" name='name' placeholder={"Part 추가"} onKeyPress={(e)=>{e.key==='Enter'?notifyMemu.partAdd(e.target.value):console.log("실패")}}></input></li>
            </ul>
            {
                //parts.map(part=>{return (<li> <NavLink to ={part.part_id}>{part.name}</NavLink> </li>)})
            }
            <h3>Chat</h3><button onClick={ openChatInviteModal/*,() => setModal02IsOpen(true)*/}>+</button>
            <ul>
                <li key = {1}>
                    {
                        chatRooms.map((chatRoom, index)=>{
                            return (<li key = {chatRoom.id}> <NavLink  to ={`/chat/${chatRoom.id}`} >{chatRoom.title}</NavLink> </li>)})
                    }
                </li>
            </ul>

            <Modal
                isOpen={modal02IsOpen}
                searchUserListResult={searchUserResult}
                onRequestClose={ () => setModal02IsOpen(false) }
                contentLabel="modal02 example">
                {/* <form onSubmit={ChatSearchMember} onChange={chatSearchChg}>
                    <input type='text' name='memberName'/>
                    <input type='submit' value='검색'/>
                </form> */}
                <div>
                    <form onSubmit={inviteHandler}>
                    {
                        searchUserResult.map((sMember)=>{
                            return (<div>
                                        <label>
                                            <div>{sMember.avatar}</div>
                                            <div>{sMember.name}</div>
                                            <div>{sMember.memberId}</div>
                                            <input type='radio' name='selectMember' value={sMember.memberId} onClick={selectChatMember} />
                                        </label>
                                    </div>)
                        })
                    }
                    <input type='submit' value='채팅방 개설'/>
                    </form>
                </div>
            </Modal>
            
        </nav>
    
    );
    
};

export default NavLeft;


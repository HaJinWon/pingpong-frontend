import React ,{useEffect, useState}from 'react';
import { NavLink } from 'react-router-dom';
import Modal from "react-modal";
import ReactModal from "react-modal";

import styles from '../assets/scss/layout/NavLeft.scss'



const NavLeft = ({isLogin}) => {

    const teamId = 1;

    const [pid, setPid] = useState(1);
    const [successAdd, setSuccessAdd]=useState(false);
    const [posts, setPosts] = useState([]);
    //채팅방 개설시 유저검색 결과
    const [searchUserResult, setSearchUserResult] = useState([]);
    const [teams, setTeams] = useState([]);
    const [parts, setParts] = useState([]);
    const [chatRooms,setChatRooms] = useState([]);
    const [modal02IsOpen, setModal02IsOpen] = useState(false);
    const [modal03IsOpen, setModal03IsOpen] = useState(false);
    const [selectedChatInvite, setSelectedChatInvite] = useState();
    const [changeValue, setChangeValue] = useState(0);
    // 팀 초대시 유저검색 결과
    const [searchUserResult2, setSearchUserResult2] = useState([]);

    const loginMember = JSON.parse(window.sessionStorage.getItem("loginMember"));

    const openChatInviteModal = async(e)=>{
        e.preventDefault();
        setModal02IsOpen(true);

        const response = await fetch(`/api/member/team/${teamId}`, {
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



        }catch(err){
            console.log(err);
        }
       
       
    },[])

    useEffect(async()=>{
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
    },[changeValue]);
   
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

        // 채팅방 개설을 위한 맴버선택
        const selectChatMember = (e)=>{
            //e.preventDefault();
            //setSelectChatInvite(e.target.value);
            console.log("radiobox",e.target.value);
            const selectedMemberId = e.target.value;
            setSelectedChatInvite(selectedMemberId);
            console.log("selectedInvite",selectedChatInvite);
        }

        // 채팅방 개설 submit 핸들러
        const inviteHandler = async (e) =>{
            e.preventDefault();
            console.log('submit',selectedChatInvite);
            
            await fetch(`/api/room/create/${teamId}/${selectedChatInvite}`, {
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
                body: null
            }).then(
                setModal02IsOpen(false)
            )
            //setChatRooms([{},...chatRooms]);
            setChangeValue(changeValue + 1);
        }

        // 채팅방 나가기
        useEffect(()=>{
            
        })

        const exitRoom = async (e)=>{
            e.preventDefault();
            console.log('exitRoom',e.target.id);
            const delRoomId = e.target.id;
            await fetch(`/api/room/${delRoomId}`, {
                method: 'delete',
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
            setChangeValue(changeValue+1);
        }
        //member 추가 모달 창 열기
        const teamMemberInvite = async(e)=>{
            e.preventDefault();
            setModal03IsOpen(true);
            const value = "%%";
            const response = await fetch(`/api/team/searchUser/${teamId}`, {
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
                body: value
            });
            const data = await response.json();
            const findUserLists = data.data.findUserList;
            console.log('result',findUserLists);
            setSearchUserResult2(findUserLists);
        }

        //member 초대시 member 검색 onChange 함수  
        const memberSearch = async (e)=>{
            //let value2 = "%%";
            let { name, value } = e.target;
            
            console.log(name,value);
            const response = await fetch(`/api/team/searchUser/${teamId}`, {
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
                body: value
            });

            const data = await response.json();
            const findUserLists = data.data.findUserList;
            console.log('result',findUserLists);
            setSearchUserResult2(findUserLists);
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
                            return (
                                
                                <li key = {chatRoom.id}> <NavLink  to ={`/chat/${chatRoom.id}`} >{chatRoom.title}</NavLink> 
                                    <button id={chatRoom.id} onClick={exitRoom}> 나가기 </button> 
                                </li>
                            )})
                    }
                </li>
            </ul>
            <h3>Member</h3><button onClick={teamMemberInvite}>+</button>

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
                            return (
                                    sMember.memberId !== loginMember.id ?
                                    <div>
                                        <label>
                                            <div>{sMember.avatar}</div>
                                            <div>{sMember.name}</div>
                                            <div>{sMember.memberId}</div>
                                            <input type='radio' name='selectMember' value={sMember.memberId} onClick={selectChatMember} />
                                        </label>
                                    </div> : null)
                        })
                    }
                    <input type='submit' value='채팅방 개설'/>
                    </form>
                </div>
            </Modal>

            <Modal
                isOpen={modal03IsOpen}
                searchUserListResult={searchUserResult}
                onRequestClose={ () => setModal03IsOpen(false) }
                contentLabel="modal03 example">
                {/* <form onSubmit={ChatSearchMember} onChange={chatSearchChg}>
                    <input type='text' name='memberName'/>
                    <input type='submit' value='검색'/>
                </form> */}
                <div>
                    <input type='text' name = 'memberName' onChange={memberSearch} />
                    {
                        searchUserResult2.map((userList)=>{
                            return(
                                <form>
                                    <div>{userList.name}<input type='checkbox' name ='member' /></div>
                                    <input type= 'submit' value='초대하기'/>
                                </form>
                            )
                        })
                    }
                </div>
            </Modal>
            
        </nav>
    
    );
    
};

export default NavLeft;


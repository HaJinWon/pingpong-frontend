import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Modal from "react-modal";
import ReactModal from "react-modal";
import CloseButton from 'react-bootstrap/CloseButton'
import ChatRoomList from '../component/Chat/ChatRoomList';
import styles from '../assets/scss/layout/NavLeft.scss'
import BelongMemberList from '../component/Member/BelongMemberList';
import MenuList from './NavLeft/MenuList';
import stylesPartBox from '../assets/css/PartBox.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import stylesMainTeamName from '../assets/css/MainTeamName.css';


const NavLeft = () => {
    const loginMember = JSON.parse(window.sessionStorage.getItem("loginMember"));
    const {teamid } = useParams();
    const [selectTeamName, setSelectTeamName] = useState('');
    const [isLogin, setIsLogin] = useState(JSON.parse(window.sessionStorage.getItem('loginMember')).id);
    const [successChange, setSuccessChange] = useState(false);
    const [selectTeam, setSelectTeam] = useState([{
        name:'',
        host:'',
        team_id:''
    }]);

    const [teams, setTeams] = useState([]);     //NavLink에 배치될 team list 
    const [parts, setParts] = useState([]);     //NavLink에 배치될 part list

    const [modal02IsOpen, setModal02IsOpen] = useState(false);
    const [searchChatMember, setSearchChatMember] = useState('');
    const [changeValue, setChangeValue] = useState(0);

    const stylesPartInputText ={
        visibility:'hidden',
        height:'5px'
    }

    const ChatSearchMember = (e) => {
        e.preventDefault();
    }


    const chatSearchChg = (e) => {
        let { name, value } = e.target;

        setSearchChatMember({
            ...searchChatMember,
            [name]: value,
        });


    }

    useEffect(async () => {        //nav 리스트(team, part) 가져오는 useEffect
        teamList: {       //team
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
                
                setTeams(data.data.teamList);       //teams state에 받아온 teamlist 주입
                setSelectTeam(data.data.teamList.filter((team) => (team.team_id == teamid)))
                setSelectTeamName(data.data.teamList.filter((team) => (team.team_id == teamid))[0].name);

            } catch (err) {
                console.log(err);
            }

        }

        partList: {       //part
            try {
                const response = await fetch(`/api/part/${teamid}`, {
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
               
            } catch (err) {
                console.log(err);
            }

           

        }

    }, [successChange,teamid])      //선택한 팀이 바뀌거나 수정이 완료되면 (메뉴 삭제, 입력) list reloading

    const notifyMemu = {            //team, part  추가 삭제

        teamAdd: async (e) => {
           
            if(e.target.value==''){
                alert('팀명을 입력해주세요.');
            }
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
                    body: JSON.stringify({ teamName: e.target.value })
                })
                const data = await response.json();
                
                e.target.value='';
                alert("팀 생성이 완료되었습니다.");
                location.href = `/${data.teamId}/main`

            } catch (err) {
                console.log(err);
            }
            setSuccessChange(!successChange)

        },
        partAdd: async (e) => {
            
            if(e.target.value==''){
                alert('파트명을 입력해주세요.');
            }
            try {
                const response = await fetch(`/api/part/${teamid}`, {
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
                    body: JSON.stringify({"partName":e.target.value})
                })
                e.target.value='';
            } catch (err) {
                console.log(err);
            }
            setSuccessChange(!successChange)

        },
        teamExit: async ({ teamId }) => {
            try {
                // Delete
                const response = await fetch(`/api/team/exit/${teamid}`, {
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
        partDel: async ({ part_id }) => {
            console.log('partDel in ; ', part_id);
            try {
                // Delete
                const response = await fetch(`/api/part/${part_id}`, {
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

            <h3>🤝
            <div className={stylesMainTeamName.OuterBox}>
                <DropdownButton id="dropdown-item-button" size="lg"
                    title={selectTeamName} className={stylesMainTeamName.TeamName}>
                <Dropdown.ItemText >
                    <input className="menuInput" placeholder={"Team 추가"} onKeyPress={(e) => { e.key == 'Enter' ? notifyMemu.teamAdd(e) : null }}></input>
                </Dropdown.ItemText>
                    {
                        teams.map((team, index) => {
                            return (
                                <Dropdown.Item as="button"><NavLink to={`/${team.team_id}/chat/${team.room_id}`} className={stylesMainTeamName.TeamList}>{team.name}</NavLink> </Dropdown.Item>
                            )
                        })
                    }
                </DropdownButton>
            </div>
            </h3>
           
            <div className={stylesPartBox.OuterBox}>
                <div className={stylesPartBox.Block}>
                    <div className={stylesPartBox.Title}>Part</div>
                    {
                        Number(selectTeam[0].host) == Number(loginMember.id) ?
                        <DropdownButton id="dropdown-item-button" size="sm"  className={stylesPartBox.PlusButton} >
                        <Dropdown.ItemText >
                            <input className="menuInput" name='name' placeholder={"Part 추가"} onKeyPress={(e) => { e.key === 'Enter' ? notifyMemu.partAdd(e) : null }}></input> 
                        </Dropdown.ItemText>
                        </DropdownButton>
                        :
                        null
                    }
                    <div className={stylesPartBox.Body}>
                    {

                        <input className="menuInput" name='name' placeholder={"Part 추가"} style={stylesPartInputText} onKeyPress={(e) => { e.key === 'Enter' ? notifyMemu.partAdd(e) : null }}></input> 
                    }                
                    {
                        parts.map((part, index) => {
                            return (
                                <div key={index} className={stylesPartBox.One}> 
                                    <NavLink to={`/${teamid}/post/${part.part_id}`} className={stylesPartBox.PartName} >{part.name}</NavLink>
                                    {
                                        Number(selectTeam[0].host) == Number(loginMember.id) ? <CloseButton className={stylesPartBox.ExitButton} onClick={(e) => notifyMemu.partDel({ part_id: part.part_id })}/>
                                        :
                                        null
                                    } 
                                    
                                </div>
                                
                            )
                        })
                    }
                    </div>
                </div>
            </div>   

            <ChatRoomList teamId={teamid} loginMember={loginMember}/>
            <BelongMemberList teamId={teamid}/>

        </nav>

    );

};

export default NavLeft;
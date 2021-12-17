import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Modal from "react-modal";
import ReactModal from "react-modal";
import CloseButton from 'react-bootstrap/CloseButton'
import ChatRoomList from '../component/Chat/ChatRoomList';
import styles from '../assets/scss/layout/NavLeft.scss'
import BelongMemberList from '../component/Member/BelongMemberList';
import MenuList from './NavLeft/MenuList';


const NavLeft = () => {
    const loginMember = JSON.parse(window.sessionStorage.getItem("loginMember"));
    const {teamid } = useParams();
    const [selectTeamName, setSelectTeamName] = useState('');
    const [isLogin, setIsLogin] = useState(JSON.parse(window.sessionStorage.getItem('loginMember')).id);
    const [successChange, setSuccessChange] = useState(false);
    const [selectTeam, setSelectTeam] = useState('');

    const [teams, setTeams] = useState([]);     //NavLink에 배치될 team list 
    const [parts, setParts] = useState([]);     //NavLink에 배치될 part list

    const [modal02IsOpen, setModal02IsOpen] = useState(false);
    const [searchChatMember, setSearchChatMember] = useState('');
    const [changeValue, setChangeValue] = useState(0);

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
                console.log(data);
                setTeams(data.data.teamList);       //teams state에 받아온 teamlist 주입
                setSelectTeam(data.data.teamList.filter((team) => (team.team_id == teamid)))
                setSelectTeamName(data.data.teamList.filter((team) => (team.team_id == teamid))[0].name);

            } catch (err) {
                console.log(err);
            }

        }

        partList: {       //part
            try {
                const response = await fetch(`/api/part/list/${teamid}`, {
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
                console.log(data.data.partList)
            } catch (err) {
                console.log(err);
            }

           

        }

    }, [successChange,teamid])      //선택한 팀이 바뀌거나 수정이 완료되면 (메뉴 삭제, 입력) list reloading

    const notifyMemu = {            //team, part  추가 삭제

        teamAdd: async (e) => {
            console.log('menu', e.target.value);
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


            } catch (err) {
                console.log(err);
            }
            setSuccessChange(!successChange)

        },
        partAdd: async (e) => {
            console.log("part 추가 in:" + teamid);
            try {
                const response = await fetch(`/api/part/add/${teamid}`, {
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

            <h3>🤝 {selectTeamName}</h3><button onClick={(e) => { }}>➖</button>
            <ul>
                {teams.map((team, index) => { return (<li key={index}><NavLink to={`/${team.team_id}/main`}>{team.name}</NavLink> <CloseButton onClick={(e) => notifyMemu.teamExit({ teamId: team.team_id })}/></li>) })}
                <li><input className="menuInput" placeholder={"Team 추가"} onKeyPress={(e) => { e.key == 'Enter' ? notifyMemu.teamAdd(e) : null }}></input></li>
            </ul>


           

            <h3>📚 Part</h3>
            <ul>
                {
                    parts.map((part, index) => {
                        return (<li key={index}> <NavLink to={`/${teamid}/post/${part.part_id}`} >{part.name}</NavLink> <CloseButton onClick={(e) => notifyMemu.partDel({ part_id: part.part_id })}/></li>)
                    })
                }
                <li><input className="menuInput" name='name' placeholder={"Part 추가"} onKeyPress={(e) => { e.key === 'Enter' ? notifyMemu.partAdd(e) : null }}></input></li>
            </ul>
               
            <ChatRoomList teamId={teamid} loginMember={loginMember}/>
            <BelongMemberList teamId={teamid}/>



            <MenuList  menuTitle={"team"}  menus = {teams}/>        {/**team과 part list를 컴포넌트화 하기 위한 test code */}

        </nav>

    );

};

export default NavLeft;
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from "react-modal";
import SearchBar from '../Main/SearchBar';

const ChatList = ({ teamId, loginMember }) => {


    const [chatRooms, setChatRooms] = useState([]);
    const [modal02IsOpen, setModal02IsOpen] = useState(false);
    const [searchUserResult, setSearchUserResult] = useState([]);
    const [selectedChatInvite, setSelectedChatInvite] = useState();
    const [changeValue, setChangeValue] = useState(0);
    const [keyword, setKeyword] = useState('');
    /**
     *  채팅방 개설 (상대방 초대위한 모달 띄우는 함수) 
     */
    const openChatInviteModal = async (e) => {
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
        setSearchUserResult(data);

    }

    /**
     *  채팅룸 List 불러오는 함수
     */
    useEffect(async () => {
        const response2 = await fetch(`/api/room/${teamId}`, {
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
        setChatRooms(data2.roomDtoList);

    }, [changeValue, teamId]);
    
    /**
     *  채팅방 개설을 위한 맴버 선택 함수
     */
    const selectChatMember = (e) => {
        const selectedMemberId = e.target.value;
        setSelectedChatInvite(selectedMemberId);
    }

    /**
     *  채팅방 개설 (상대방 선택후 채팅방 개설) 함수
     */
    const inviteHandler = async (e) => {
        e.preventDefault();
        console.log('submit', selectedChatInvite);

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
        setChangeValue(changeValue + 1);
    }

    /**
     *  채팅방 나가기 함수
     */
    const exitRoom = async (e) => {
        e.preventDefault();
        console.log('exitRoom', e.target.id);
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
        setChangeValue(changeValue + 1);
    }

    const notifyKeywordChanged = (keyword) => {
        setKeyword(keyword);
    };

    return (
        <div>
            <h3>Chat</h3><button onClick={openChatInviteModal}>+</button>
            <ul>
                <li key={1}>
                    {
                        chatRooms.map((chatRoom, index) => {
                            return (

                                <li key={chatRoom.id}> <NavLink to={`/${teamId}/chat/${chatRoom.roomId}`} >{chatRoom.title}</NavLink>
                                    <button id={chatRoom.id} onClick={exitRoom}> 나가기 </button>
                                </li>
                            )
                        })
                    }
                </li>
            </ul>
            <Modal
                isOpen={modal02IsOpen}
                searchUserListResult={searchUserResult}
                onRequestClose={() => setModal02IsOpen(false)}
                contentLabel="modal02 example">
                <div>
                <SearchBar keyword={keyword} callback={notifyKeywordChanged} />
                    <form onSubmit={inviteHandler}>
                        {
                            searchUserResult
                                .filter(sMember => sMember.name.indexOf(keyword) !== -1)
                                .map((sMember) => {
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
                        <input type='submit' value='채팅방 개설' />
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default ChatList;
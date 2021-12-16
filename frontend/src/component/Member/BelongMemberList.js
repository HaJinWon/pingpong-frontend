import React, { useEffect, useState } from 'react';
import Modal from "react-modal";
import Members from './Members';
const BelongMemberList = ({ teamId }) => {

    // 팀 초대시 유저검색 결과
    const [searchUserResult2, setSearchUserResult2] = useState([]);
    // 체크박스 체크된 ID
    const [checkedId, setCheckedId] = useState(new Array());
    // 모달 상태
    const [modal03IsOpen, setModal03IsOpen] = useState(false);

    //member 초대시 member 검색 onChange 함수  
    const memberSearch = async (e) => {

        let { name, value } = e.target;

        if (value == "") {
            value = "%%";
        }

        console.log(name, value);
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
        console.log('result', findUserLists);
        setSearchUserResult2(findUserLists);
    }

    const submitTeamMemberInvite = async (e) => {
        e.preventDefault();

        const response = await fetch(`/api/team/invite/${teamId}`, {
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
            body: JSON.stringify({"members":checkedId})
          });
        //console.log()
    }
    
    //member 추가 모달 창 열기
    const teamMemberInvite = async (e) => {
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
        console.log('result', findUserLists);
        setSearchUserResult2(findUserLists);

    }

    const checkboxChg = (e) =>{
        //e.preventDefault();
        if(e.target.checked){
            checkedId.push(e.target.id);
            setCheckedId(checkedId);
        } else if( !e.target.checked && checkedId.includes(e.target.id)){
            checkedId.pop(e.target.id);
            setCheckedId(checkedId);
        }
    }

    return (
        <div>
            <h3>Member</h3><button onClick={teamMemberInvite}>+</button>
            <Members teamId={teamId}/>
            
            
            <Modal
                isOpen={modal03IsOpen}
                onRequestClose={() => setModal03IsOpen(false)}
                contentLabel="modal03 example">
                <div>
                    <input type='text' name='memberName' onChange={memberSearch} />
                    <form onSubmit={submitTeamMemberInvite}>
                        {
                            searchUserResult2.map((userList) => {
                                return (
                                    <div>
                                        {userList.name} - 소속 : {!userList.company ? `소속 없음` : userList.company}
                                        <input type='checkbox' name='member' id={userList.member_id} onClick={checkboxChg}/>
                                    </div>
                                )
                            })
                        }
                        <input type='submit' value='초대하기' />
                    </form>
                </div>
            </Modal>
        </div>

    );
};

export default BelongMemberList;
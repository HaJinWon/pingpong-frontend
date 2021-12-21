import React, { Fragment, useEffect, useState } from 'react';
import stylesMemberBox from '../../assets/css/MemberBox.css';

const Members = ({ teamId }) => {

    const [memberLists, setMemberLists ] = useState([]);

    useEffect(async() => {
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
        
        setMemberLists(data);
    },[teamId])

    return (
        <div className={stylesMemberBox.MemberList}>
            {
                memberLists.map((memberList,index)=>{
                    return (

                        <li>{memberList.name} - {memberList.status}</li>
                       
                    )
                })
            }
        </div>

    );
};

export default Members;
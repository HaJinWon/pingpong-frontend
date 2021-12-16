import React, { Fragment, useEffect, useState } from 'react';

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
        console.log('members',data);
    },[teamId])

    return (
        <Fragment>
            {
                memberLists.map((memberList,index)=>{
                    return (

                        <li>{memberList.name} - {memberList.status}</li>
                       
                    )
                })
            }
        </Fragment>

    );
};

export default Members;
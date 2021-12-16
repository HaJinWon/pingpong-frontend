import React, { useEffect, useState } from 'react';

const Notice = ({roomId}) => {

    const [notice,setNotice] = useState('');

    // 공지사항 불러오기
    useEffect(async()=>{
        const response = await fetch(`/api/room/notice/${roomId}`, {
            method: "get",
            mode: "cors",
            credentials: "include",
            cache: "no-cache",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "client",
            body: null,
        });
        const data = await response.json();
        setNotice(data.notice);
    })

    return (
        <div>
            <h2>공지 : {notice}</h2>
        </div>
    );
};

export default Notice;
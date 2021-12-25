import React from 'react';
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router';

import styles from '../../assets/scss/Invitation.scss'

const Invitation = (props) => {
    console.log(props.invitation);
    //const loginMember = JSON.parse(window.sessionStorage.getItem("loginMember"));
    const InvitationResponse= async (e) => {
            e.preventDefault();
                
                try {
                    const response = await fetch(`/api/team/accept/${props.invitation.teamId}`, {
                    method: 'PATCH',
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
                    // console.log('초대장 답장은!!!!!!!!!!!!!!!!', e.target.value)
                    getTeamList();
                }catch(err){
                    console.log(err);
                }
                props.callback()
    }

    const Reject= async (e) => {
        e.preventDefault();
            
            try {
                const response = await fetch(`/api/team/invite/${props.invitation.teamId}`, {
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
    
            }catch(err){
                console.log(err);
            }
            props.callback()
    }

    const getTeamList = async () => {
        try {
          const response = await fetch("/api/team/list", {
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
          console.log(data);
    
          if (data.data.teamList.length !== 0) {
            window.sessionStorage.setItem(
              "selectTeam",
              JSON.stringify(data.data.teamList[0])
            ); //받아온 team list 중 디폴트 team을 session storage에 할당
    
            //setSelectTeam(JSON.parse(sessionStorage.getItem("selectTeam")));
            console.log(
              "select team : ",
              JSON.parse(sessionStorage.getItem("selectTeam")).team_id
            );
    
            const defaultTeam = data.data.teamList[0].team_id;
            const defaultRoom = data.data.teamList[0].room_id;
            console.log('defaultTeam',defaultTeam,'defaultRoom',defaultRoom);
            location.href = `/${defaultTeam}/chat/${defaultRoom}`;
          } else {
            location.href = "/welcome";
          }
        } catch (err) {
          console.log(err);
        }
      };



    return (

            <div className={styles.Invitation}>

                <div className={styles.InvitationContents}>
                    🎁{`[${props.invitation.teamName}] 팀으로 부터 초대장이 도착했습니다.`}<br />
                </div>
                <div className={styles.Button}>
                    <div className={styles.Button1}>  <Button variant="primary" type="button" value='Y' onClick={InvitationResponse}>수락</Button></div>
                    <div className={styles.Button2}>  <Button variant="primary" type="button" value='N' onClick={Reject}>거절</Button></div>
                </div>
            </div>
    
    );
};

export default Invitation;
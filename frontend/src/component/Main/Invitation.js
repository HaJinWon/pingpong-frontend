import React from 'react';
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router';

import styles from '../../assets/scss/Invitation.scss'

const Invitation = (props) => {
    const {team_id} = useParams()


    console.log('초대장!!!!!!!!!!!!!!!!!!!!!!팀아이디!!!!!!!!!!!!!!!!',team_id)
    const InvitationResponse= async (e) => {
            e.preventDefault();
                
                try {
                    const response = await fetch(`/api/team/accept/${team_id}`, {
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
                    
                }catch(err){
                    console.log(err);
                }
                props.callback(true)
            }



    return (
        <div className={styles.Invitation}>
            
        <div className={styles.InvitationContents}>
                    🎁{`${props.invitation.name} 님으로 부터 초대장이 도착했습니다.`}<br/>
              </div>
              <div className={styles.Button}>
              <div className={styles.Button1}>  <Button variant="primary" type="button" value='Y' onClick={InvitationResponse}>수락</Button></div>
              <div className={styles.Button2}>     <Button variant="primary" type="button" value='N' onClick={InvitationResponse}>거절</Button></div>
              </div>
        </div>
    );
};

export default Invitation;
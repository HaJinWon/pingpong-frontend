import React from 'react';
import Button from 'react-bootstrap/Button'
const Invitation = () => {

    const InvitationResponse= async (e) => {
            console.log("InvitationResponse in:" );
            try {
                const response = await fetch(`/--`, {
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
     
        
    }



    return (
        <div className='Invitation'>
            <table>
                <tr>
                    <th>🎁</th>
                </tr>
                <tr>
                    <td>{`${'!!!!!!!!!!!!!'} 님으로 부터 초대장이 도착했습니다.`}</td>
                </tr>
                <tr>
                    <td> <Button variant="primary" type="button" value='Y'>수락</Button></td>
                    <td> <Button variant="primary" type="button" value='N'>거절</Button></td>
                </tr>
            </table>
        </div>
    );
};

export default Invitation;
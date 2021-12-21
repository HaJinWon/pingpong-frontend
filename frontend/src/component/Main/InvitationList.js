import React, {useState, useEffect} from 'react';
import Invitation from './Invitation';



const InvitationList = () => {
    const [invitationList, setInvitationList]=useState([]);
    

    useEffect(async()=>{        // 초대장 리스트 가져오는 useEffect
       
        try {
            const response = await fetch(`/api/team/invite`, {
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

            const jsonResult = await response.json();
            console.log()
            setInvitationList(jsonResult);

        }catch(err){
            console.log(err);
        }
       
    },[]);

    const handlerOnclickInvitationAnswer=(answer)=>{       //comment 삭제 후 list reloading을 위한 handler
        setInvitationList(answer) 
     }

    return (
        <div>
                                                   {/**Invitation list  */}
                {invitationList.map((invitation, index)=>{return <Invitation
                                                                key={index} 
                                                                invitation={invitation}
                                                                callback={handlerOnclickInvitationAnswer}
                />})

                }
        </div>
    );
};

export default InvitationList;
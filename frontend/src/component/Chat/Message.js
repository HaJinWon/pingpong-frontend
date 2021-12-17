import React,{useState} from 'react';
import styles from '../../assets/css/Message.css';
import styles2 from '../../assets/css/Message2.css';
import Modal from "react-modal";
import ReactModal from "react-modal";
import ProfileModaStyle from '../../assets/scss/ProfileModal.scss';

ReactModal.setAppElement('body');


const Message = ({type,message,sender,senderId,roomId,chatId, callback}) => {

    const loginMember = JSON.parse(window.sessionStorage.getItem("loginMember"));

    const [miniProfile, setMiniProfile] = useState({});
    const [modal02IsOpen, setModal02IsOpen] = useState(false);
    const [modal03IsOpen, setModal03IsOpen] = useState(false);


    /**
     *  채팅: 상대방 이미지 클릭시 미니 프로필을 띄우기 위한 함수
     */
    const openMiniProfile = async ()=>{
        setModal02IsOpen(true);

        const response = await fetch(`/api/member/${senderId}`, {
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
        //console.log('miniprofile',data);
        setMiniProfile(data);
        
    }

    /**
     *  채팅 더보기 모달 창 띄우는 함수 (공지등록, 메시지 삭제)
     */
    const openSubModal =()=>{
        setModal03IsOpen(true);
    }

    /**
     *  공지사항 등록 함수
     */
    const regNotice = async ()=>{
        console.log(JSON.stringify({"notice":message}));
        const response = await fetch(`/api/room/notice/${roomId}`, {
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
            body: JSON.stringify({"notice":message})
        })
        setModal03IsOpen(false);
        const data = await response.json();
        callback(data.notice);
    }

    /**
     *  채팅 메세지 삭제함수 (본인 메세지만 가능)
     */
    const deleteChat = async () =>{
        const response = await fetch(`/api/chat/${chatId}`, {
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
            body: null
        });
        setModal03IsOpen(false);
    }


    return (
        <div>
            {loginMember.name !== sender ?
            <div>
            <div className={styles.Message}>
                <div className={styles.Profile} onClick={ openMiniProfile }>
                    사진
                </div>
                <div className={styles.Block}>
                    <div className={styles.UserName}>
                    {sender}
                    </div>
                    <div className={styles.Contents} onClick={openSubModal}>
                    {message}
                    </div>
                </div>
                <div className={styles.Count}>
                    3
                </div>
            </div>
            </div>
            :
            <div>
            <div className={styles2.Message}>
               <div className={styles2.Count}>
                    3
                </div>
                <div className={styles2.Block}>
                    <div className={styles2.UserName}>
                        {sender}
                    </div>
                    <div className={styles2.Contents} onClick={openSubModal}>
                        {message}
                    </div>
                </div> 
                <div className={styles2.Profile}>
                    사진
                </div>
            </div>
            </div>
            }


            <Modal 
                className={ProfileModaStyle["Modal"]}
                isOpen={modal02IsOpen}
                onRequestClose={ () => setModal02IsOpen(false) }
                contentLabel="modal02 example">
                <div>{miniProfile.name}</div>
                <div>{miniProfile.status}</div>
                <div>메세지 보내기 어케하지..</div>
            </Modal>

            <Modal 
                className={ProfileModaStyle["Modal"]}
                isOpen={modal03IsOpen}
                onRequestClose={ () => setModal03IsOpen(false) }
                contentLabel="modal03 example">
                <h2>더보기</h2>
                <input type ='button' value='공지등록' onClick={regNotice}/>
                {
                    senderId == loginMember.id ? 
                    <input type ='button' value='메세지 삭제' onClick={deleteChat}/>
                    :
                    null
                }
                
            </Modal>
        </div>
    );
};

export default Message;
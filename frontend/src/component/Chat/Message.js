import React,{useState} from 'react';
import styles from '../../assets/css/Message.css';
import styles2 from '../../assets/css/Message2.css';
import Modal from "react-modal";
import ReactModal from "react-modal";
import ProfileModaStyle from '../../assets/scss/ProfileModal.scss';

ReactModal.setAppElement('body');

const Message = ({type,message,sender,senderId}) => {

    const [miniProfile, setMiniProfile] = useState({});
    const loginMember = JSON.parse(window.sessionStorage.getItem("loginMember"));

    const [modal02IsOpen, setModal02IsOpen] = useState(false);
    const [modalData, setModalData] = useState({
        'profile':'',
        'status':'접속중',
        '메세지 보내기':''
    });



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
        console.log('miniprofile',data);
        setMiniProfile(data);
        
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
                    <div className={styles.Contents}>
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
                    <div className={styles2.Contents}>
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
                <h1>{miniProfile.name}</h1>
                <h2>{miniProfile.status}</h2>
                <h2>메세지 보내기 어케하지..</h2>
            </Modal>
        </div>
    );
};

export default Message;
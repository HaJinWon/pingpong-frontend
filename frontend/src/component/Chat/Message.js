import React,{useState} from 'react';
import styles from '../../assets/css/Message.css';
import styles2 from '../../assets/css/Message2.css';
import Modal from "react-modal";
import ReactModal from "react-modal";
import ProfileModaStyle from '../../assets/scss/ProfileModal.scss';

ReactModal.setAppElement('body');
const Message = () => {

    
    const [modal02IsOpen, setModal02IsOpen] = useState(false);
    const [modalData, setModalData] = useState({
        'profile':'',
        'status':'',
        '메세지 보내기':''
    });

    return (
        <div>
            <div className={styles.Message}>
                <div className={styles.Profile} onClick={ () => setModal02IsOpen(true) }>
                    사진
                </div>
                <div className={styles.Block}>
                    <div className={styles.UserName}>
                        맴버이름
                    </div>
                    <div className={styles.Contents}>
                        채팅내용
                    </div>
                </div>
                <div className={styles.Count}>
                    3
                </div>
            </div>

            <div className={styles2.Message}>
               <div className={styles2.Count}>
                    3
                </div>
                <div className={styles2.Block}>
                    <div className={styles2.UserName}>
                        맴버이름
                    </div>
                    <div className={styles2.Contents}>
                        채팅내용
                    </div>
                </div> 
                <div className={styles2.Profile}>
                    사진
                </div>
            </div>

            <Modal 
                className={ProfileModaStyle["Modal"]}
                isOpen={modal02IsOpen}
                onRequestClose={ () => setModal02IsOpen(false) }
                contentLabel="modal02 example">
                <h1>modal02</h1>
            </Modal>
        </div>
    );
};

export default Message;
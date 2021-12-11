import React from 'react';
import styles from '../../assets/css/InputText.css';
const InputText = () => {

    const handlerSubmit = (e)=>{
        e.preventDefault();
    }

    return (
        <div>
            <form className={styles.Form} onSubmit={handlerSubmit}>
                <input type='text' name='message' className={styles.MessageBox}/>
                <input type='file' name='file' className={styles.File}/>
                <input type='submit' value='입력' className={styles.SubmitBtn}/>
            </form>
        </div>
    );
};

export default InputText;
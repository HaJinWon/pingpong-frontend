import React,{useEffect,useState} from 'react';
import axios from 'axios';

const UserInfo = (props) => {
    

    const [formInfo, setFormInfo] = useState({
        "name": '',
        "avatar": ''
    });

    const chgForm = (e) => {

        let { name, value } = e.target;

        setFormInfo({
        ...formInfo,
        [name]: value,
        });
        
        console.log(formInfo);

    };

    const handlerSubmit = async (e)=>{
        e.preventDefault();

        await axios.post('/api/member/edit', formInfo, {
            headers: { "Content-Type": `application/json`}
            }
            ).then((res) => {
                console.log(res.data);
                if(res.data !== null){
                    alert('수정완료');
                } else{
                    alert('수정실패');
                }
            });
    }
    
    // useEffect(()=>{
        
    // },[]);
    const styles ={
        backgroundImage:formInfo.avatar
    }
    return (
        <div>


            {console.log(props.profile.id)}
            <br/>
            <br/>
            <br/>

            <div id='avatarImage' style={styles}>{formInfo.avatar}</div>
            <form className='UpdateForm' onSubmit={handlerSubmit}>
                <input type='text' name ='name' onChange={chgForm} value={formInfo.name}/>
                <input type='file' name ='avatar' onChange={chgForm}/>
                <input type='submit' value='수정'/>
            </form>
        </div>
    );
};

export default UserInfo;


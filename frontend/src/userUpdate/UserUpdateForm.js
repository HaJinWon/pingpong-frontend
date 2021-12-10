import React,{useEffect,useState} from 'react';
import axios from 'axios';

const UserUpadteForm = () => {

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

        await axios.post('/api/members/edit', formInfo, {
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
    
    useEffect(async () => {

        try{
            const response = await fetch('/api/members/edit', {
                method: 'get',
                mode:'cors',                          // no-cors, cors, same-origin
                credentials:'include',                // include, omit, same-origin
                cache:'no-cache',                     // no-cache, reload, force-cache, default*
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                redirect:'follow',                    // follow*, error, manual(response.url)
                referrer:'client',                    // no-refferer, *client
                body: null
            });

            const jsonResult = await response.json();
            console.log(jsonResult);
            if(jsonResult.result !== 'success') {
            throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            }

            console.log(jsonResult.data);
            console.log(jsonResult.data.avatar);
            console.log(jsonResult.data.name);
            setFormInfo({'name':jsonResult.data.name,'avatar':"imageUrl"});
            
        } catch(err){

        }
    },[]);
    const styles ={
        backgroundImage:formInfo.avatar
    }
    return (
        <div>
            <div id='avatarImage' style={styles}>{formInfo.avatar}</div>
            <form className='UpdateForm' onSubmit={handlerSubmit}>
                <input type='text' name ='name' onChange={chgForm} value={formInfo.name}/>
                <input type='file' name ='avatar' onChange={chgForm}/>
                <input type='submit' value='수정'/>
            </form>
        </div>
    );
};

export default UserUpadteForm;


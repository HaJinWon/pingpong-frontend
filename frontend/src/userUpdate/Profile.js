import React, {useState, useEffect} from 'react';
import UserInfo from './UserInfo';
import UserUpdateForm from './UserUpdateForm';
import Invitation from '../component/Main/Invitation'
const Profile = () => {
    const [profile, setProfile]= useState(window.sessionStorage.getItem("loginMember"));
    const [formInfo, setFormInfo] = useState([]);
    const [profileComponentChange, setProfileComponent]=useState(false);
    const chgForm = (e) => {

        let { name, value } = e.target;

        setFormInfo({
        ...formInfo,
        [name]: value,
        });
        
        console.log(formInfo);

    };
    
    useEffect(async () => {

        try{
            const response = await fetch('/api/member/edit', {          //로그인한 회원의 회원정보를 가져오는 부분 
                method: 'get',
                mode:'cors',                         
                credentials:'include',                
                cache:'no-cache',                    
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                redirect:'follow',                   
                referrer:'client',                   
                body: null
            });

            const jsonResult = await response.json();
            if(jsonResult.result !== 'success') {
            throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            }
            setFormInfo({'name':jsonResult.data.name,'imageFile':jsonResult.data.imageFile, 'email':jsonResult.data.email, 'phone':jsonResult.data.phone, 'company':jsonResult.data.company});
            
        } catch(err){

        }
    },[profileComponentChange]);
    const styles ={
        backgroundImage:formInfo.avatar
    }
   
    const handlerOnChangeComponent=()=>{
        console.log('profile page change button click!!')
        setProfileComponent(!profileComponentChange)
    }
    

    return (
        <div>
            
            {profileComponentChange===false?<UserInfo profile={profile} handlerOnChangeComponent={handlerOnChangeComponent}/>:<UserUpdateForm profile={profile}  handlerOnChangeComponent={handlerOnChangeComponent}/>}
            <br/>
            <br/>
            <Invitation/>
        </div>
    );
};

export default Profile;
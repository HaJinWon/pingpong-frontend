import React, {useState} from 'react';
import UserInfo from './UserInfo';
import UserUpdateForm from './UserUpdateForm';
const UserUpdate = () => {
    const [profile, setProfile]= useState(window.sessionStorage.getItem("loginMember"));
    // setProfile(window.sessionStorage.getItem("loginMember"))
    // const authUser=window.sessionStorage.getItem("loginMember");
    
    

    return (
        <div>
            <UserInfo profile={profile}/>
            {console.log('user update in : ', profile)}
            <br/>
            <UserUpdateForm profile={profile}/>
        </div>
    );
};

export default UserUpdate;
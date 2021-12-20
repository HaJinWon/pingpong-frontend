import React, { useState } from "react";
import UserInfo from "./UserInfo";
import UserUpdateForm from "./UserUpdateForm";
import Invitation from "../component/Main/Invitation";
const UserUpdate = () => {
  const [profile, setProfile] = useState(
    window.sessionStorage.getItem("loginMember")
  );

  return (
    <div>
      {
        //수정중. 버튼을 누르면 보기(UserInfo)/수정(UserUpdateForm)  화면으로 전환시킬 예정
        //<UserInfo profile={profile}/>
        //console.log('user update in : ', profile)
      }
      <br />
      <UserUpdateForm /*FileInput={FileInput} */profile={profile} />
      <br />
      <br />
      <Invitation />
    </div>
  );
};

export default UserUpdate;

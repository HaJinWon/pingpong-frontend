import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { useParams } from 'react-router';

const PostForm = ({title, contents,name ,date,id,callback, post , handlerDeletePost, showNavRight}) => {
   let {teamid, partid}=useParams()
  
  
    const handlerOnclickCommentDel=async()=>{ 
       
                                       //comment 삭제를 위한 함수
            try {
            // Delete
            const response = await fetch(`/api/post/del/${id}`, {
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

            if (!response.ok) {
            throw `${response.status} ${response.statusText}`;
            }

            const json = await response.json();
            if (json.result !== 'success') {
            throw json.message;
            }
            } catch (err) {
            console.error(err);
            }
            handlerDeletePost(id)      //comment 삭제 후 list 반영을 위해 callback함수 사용.

   }; 

   const handlerOnclickPost=(e)=>{           //선택한 post의 comment 확인을 위해 선택한 정보를 부모 commponent로 돌려주는 handler
      e.preventDefault();
      showNavRight()
      callback({'Postid':id ,'post':post})
      
   }

    return (

            <table className="Post"  border='solid 1px' width='90%' >
               <tr >
                  <td className="PostTitle">{title}</td>
                  <td> <div>
                        
                  <DropdownButton id="dropdown-basic-button" title="더보기" background-color="rgb(255, 255, 255)">
                        <Dropdown.Item onClick={handlerOnclickPost}>댓글</Dropdown.Item>
                        <Dropdown.Item onClick={()=>location.href=`/${teamid}/post/modify/${id}`}>수정</Dropdown.Item>
                        <Dropdown.Item onClick={handlerOnclickCommentDel}>삭제</Dropdown.Item>
                  </DropdownButton>
                  
                     </div>
                  </td>
               </tr>
               <tr>
                  <td className="PostContents">{contents}</td>
               </tr>
               <tr>
                  <td className="Writer">{name}</td>
               </tr>
               <tr>
                  <td className="date">{date}</td>
               </tr>
                <tr>
                 
               </tr>
            </table>
        

      
    );
};

export default PostForm;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import SiteLayout from '../../layout/SiteLayout';
import Button from 'react-bootstrap/Button';


import styles from '../../assets/scss/PostWrite.scss'

const PostModify = (props) => {
   const [title, setTitle]= useState('');
   const [contents, setContents]=useState('');
   const [post, setPost]=useState([]);
   useEffect(async()=>{       
       try {
           const response = await fetch(`/api/post/update/${props.postid}`, {
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
           })
           
           
           const jsonResult = await response.json();
       
           setTitle(jsonResult.data.postVo.title);
           setContents(jsonResult.data.postVo.contents);
           setPost(jsonResult.data.postVo)
           console.log(jsonResult.data.postVo)
           

       }catch(err){
           console.log(err);
       }
      
   },[])
    const handlerOnClickPostModify=async(e)=>{          //수정된 post 내용을 전송하는 post id
        e.preventDefault();

        try {
            const response = await fetch(`/api/post/update/${props.postid}`, {
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
            body: JSON.stringify({title, contents})
            })
            
        }catch(err){
            console.log(err);
        }
        console.log('click!!!!!!!!!!!!!!!!!!!!!!')
        location.href=`/${props.teamid}/post/${post.part_id}`;
    }
    
    const onChangeTitle=(e)=>{
        setTitle(e.target.value)
      
    }
    const onChangeContents=(e)=>{
        
        setContents(e.target.value);
      
    }

    return (
       
           
                 <div className={styles.PostWrite}>
                 <h2>[PostModify]</h2>
                 <form  action method="post" enctype="multipart/form-data">
                     <table>
                         <tr className='posttitle'>
                            <td>{"title"}</td>
                            <td><input name='title' type='text' onChange={onChangeTitle} value={title}/></td>
                           
                        </tr>
                        <br/>
                        <tr className='postcontents'>
                            <td>{"contents"}</td>
                            <td height="400px"><textarea name='contents'  cols='108' rows="20" value={contents} onChange={onChangeContents}/></td>
                        </tr>
                        <br/>
                        <tr className='postfile'>
                            <td>{"file add"}</td>
                            <td><input name='file' type="text" name="title"  onChange={onChangeContents}/> <input type="file" multiple="multiple" name="attachFiles"/></td>
                           
                        </tr>
                        <br/>
                        <tr className='postimg'>
                            <td>{"Image add"}</td>
                            <td><input name='file' type="text" name="title"  onChange={onChangeContents}/> <input type="file" name="imageFile"/></td>
                           
                        </tr>
                        <br/>
                        <tr className='postcontents'>
                            <td>
                                
                            </td>
                            <td >
                            <Button variant="secondary" size="lg" type='submit' onClick={handlerOnClickPostModify}>작성 완료</Button>
                            </td>
                        </tr>
                            
                           
                        </table>
                    </form>
                    
                 </div>
           
       
    );
};

export default PostModify;
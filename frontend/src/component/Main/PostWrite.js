import React, { useState } from 'react';
import { useParams } from 'react-router';
import SiteLayout from '../../layout/SiteLayout';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {file, fa-camera, fa-poll} from '@fortawesome';

// // additional... 꼭 필요하지 않음
// import {library} from '@fortawesome/fontawesome-svg-core';
// import {far} from '@fortawesome/free-regular-svg-icons';
// import {fab} from '@fortawesome/free-brands-svg-icons';

import styles from '../../assets/scss/PostWrite.scss'

const PostWrite = () => {
   const [title, setTitle]= useState('');
   const [contents, setContents]=useState('');
   const [postAdd, setPostAdd]=useState(false);

    const onChangeTitle=(e)=>{
        setTitle({
            title: e.target.value,
        })
      
    }
    const onChangeContents=(e)=>{
        setContents({
            contents : e.target.value,
        })
      
    }


    let {teamid, partid} = useParams();
    const [addPost, setAddPost]=useState([]);


    const handlerOnClickPostAdd=async(e)=>{
        e.preventDefault();
      
        try {
            const response = await fetch(`/api/post/write/${partid}`, {
            method: 'post',
            mode: 'cors',                           
            credentials: 'include',                 
            cache: 'no-cache',                           
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'         
            },
            redirect: 'follow',                     
            referrer: 'client',                       
            body: JSON.stringify({...title, ...contents})
            })
            
        }catch(err){
            console.log(err);
        }
       
        location.href=`/${teamid}/post/${partid}`;
    }

    return (
       
            <SiteLayout>
                 <div className={styles.PostWrite}>
                 <h2>[PostWrite]</h2>
                 <form>
                     <table>
                         <tr className='posttitle'>
                            <td>{"title"}</td>
                            <td><input name='title' type='text' onChange={onChangeTitle}/></td></tr>
                        <tr className='postcontents'>
                            <td>{"contents"}</td>
                            <td><input name='contents' type='text'  onChange={onChangeContents}/></td>
                        </tr>
                        <tr className='postcontents'>
                            <td>
                                
                            </td>
                            <td>
                            <input type='submit' onClick={handlerOnClickPostAdd}/>
                            </td>
                        </tr>
                            
                           
                        </table>
                    </form>
                    
                 </div>
            </SiteLayout>
       
    );
};

export default PostWrite;
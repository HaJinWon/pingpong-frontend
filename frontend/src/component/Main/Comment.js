import React, {useState, useEffect} from 'react';
import SiteLayout from '../../layout/SiteLayout';

import CommentForm from '../Main/CommentForm';

const Comment = ({postidforComment}) => {
    const postId = postidforComment
    const [commentList, setCommentList] = useState([]);
    const [commentDelid, setCommentDelid] = useState('');
    const [commentAdd, setCommentAdd] = useState(false);
    useEffect(async()=>{        // Commnet 리스트 가져오는 useEffect
        console.log("useeffect in for comment:",{postId});
        
        try {
            const response = await fetch(`/api/post/comment/${postId}`, {
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
            console.log(jsonResult);
            setCommentList(jsonResult.data.commentList);

        }catch(err){
            console.log(err);
        }
       
    },[postId ,commentDelid, commentAdd]);

    const handlerOnclickCommentAdd=async(e)=>{ 
        e.preventdefault()
        //comment 작성을 위한 함수
        try {
        
        const response = await fetch(`/api/post/comment/${id}`, {
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
            body: JSON.stringify(e.target.value)
        });


        // fetch success?
        if (!response.ok) {
        throw `${response.status} ${response.statusText}`;
        }

        // API success?
        const json = await response.json();
        if (json.result !== 'success') {
        throw json.message;
        }


        } catch (err) {
        console.error(err);
        }

        setCommentAdd(e.target.value)

};

    const handlerOnclickCommentDel=(commentId)=>{       //comment 삭제를 위한 handler
        console.log("comment del in "+commentId)
        setCommentDelid(commentId) 
     }
    return (
       
            <div className='Comment'>
                <h2>Comment</h2>
                
                {commentList
                        .map((comment, index)=>{return <CommentForm
                                                    key={index} 
                                                    id = {comment.comment_id}
                                                    memeber_id={comment.memeber_id} 
                                                    contents={comment.contents} 
                                                    name={comment.name}
                                                    date={comment.date}
                                                    post_id={comment.post_id}
                                                    callback={handlerOnclickCommentDel}
                                                />})

                }
                <form onSubmit={handlerOnclickCommentAdd}>
                <input type='text'></input>
                <input type='submit'/>
                </form>

            </div>
       
    );
};

export default Comment;
import React, {useState, useEffect} from 'react';
import SiteLayout from '../../layout/SiteLayout';

import CommentForm from '../Main/CommentForm';

const Comment = ({postidforComment}) => {
   // const refForm = useRef(null);


    const postId = postidforComment
    const [commentList, setCommentList] = useState([]);
    const [commentDelid, setCommentDelid] = useState('');
    const [commentAdd, setCommentAdd] = useState(false);
    const [comment, setComment] = useState('');
    const chgComment =(e)=>{

        setComment(e.target.value);
    }

    useEffect(async()=>{        // Commnet 리스트 가져오는 useEffect
        setCommentAdd(false);
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

    const handlerOnclickCommentAdd=async (e)=>{
        e.preventDefault();
            console.log("part 추가 in:", comment);
            try {
                const response = await fetch(`/api/post/comment/${postidforComment}`, {
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
                body: JSON.stringify(comment)
                })
                
            }catch(err){
                console.log(err);
            }
            setCommentAdd(true)
        }


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
                    <input type='text' name='commnet' onChange={chgComment}></input>
                    <input type='submit' autoComplete={'off'}/>
                </form>

            </div>
       
    );
};

export default Comment;
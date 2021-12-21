import React, {useState, useEffect} from 'react';
import SiteLayout from '../../layout/SiteLayout';

import CommentForm from '../Main/CommentForm';

const Comment = ({ postforComment}) => {       //
    const postId = postforComment.post_id
    const [commentList, setCommentList] = useState([]);
    const [commentDelid, setCommentDelid] = useState('');
    const [commentAdd, setCommentAdd] = useState(false);
    const [comment, setComment] = useState('');

    

    useEffect(async()=>{        // Commnet 리스트 가져오는 useEffect
        setCommentAdd(false);
        try {
            const response = await fetch(`/api/comment/${postforComment.post_id}`, {
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

    const handlerOnclickCommentAdd=async (e)=>{     //comment 작성 후 list reloading을 위한 handler
        e.preventDefault();
            
            try {
                const response = await fetch(`/api/comment/${postforComment.post_id}`, {
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


    const handlerOnclickCommentDel=(commentId)=>{       //comment 삭제 후 list reloading을 위한 handler
        setCommentDelid(commentId) 
     }

     const chgComment =(e)=>{        //comment 입력값 세팅하는 부분

        setComment(e.target.value);
    }

    return (
       
            <div className='Comment'>
                <h2>Comment</h2>

                <div className='selectPost'>        {//show target post. 추가적 배치 필요.  
                }
                    {postforComment.title}
                    {postforComment.contents}
                    

                </div>
        <br/>
                                                      {/**comment list  */}
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


                <form onSubmit={handlerOnclickCommentAdd}>           {/**comment add  */}
                    <input type='text' name='commnet' onChange={chgComment}></input>
                    <input type='submit' autoComplete={'off'}/>
                </form>

            </div>
       
    );
};

export default Comment;
import React, {useState, useEffect} from 'react';
import SiteLayout from '../../layout/SiteLayout';

import CommentForm from '../Main/CommentForm';

const Comment = ({postidforComment}) => {
    const postId = postidforComment
    const [commentList, setCommentList] = useState([]);
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
       
    },[postId]);


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
                                                />})
                }
            </div>
       
    );
};

export default Comment;
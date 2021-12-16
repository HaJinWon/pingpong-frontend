import React ,{useState, useEffect}from 'react';
import SiteLayout from '../../layout/SiteLayout';
import { BrowserRouter,useParams,NavLink } from 'react-router-dom';
import PostForm from './PostForm';

const Post = () => {
    let {teamid, partid} = useParams();
    
    const [postidforComment, setPostidforComment] = useState('');
    const [postList, setPostList] = useState([]);
    
    const handlerOnclickPost=({Postid})=>{
        setPostidforComment(Postid);
    }

    useEffect(async()=>{        // 리스트 가져오는 useEffect
        try {
            const response = await fetch(`/api/post/list/${partid}`, {
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
        
            setPostList(jsonResult.data.postList);

        }catch(err){
            console.log(err);
        }
       
    },[partid]);


    return (
        <SiteLayout postidforComment={postidforComment}>
            <h2>[Post]{partid}</h2>

            <NavLink to ={`/${teamid}/post/write/${partid}`}>게시글 작성</NavLink>

            {
            
                postList
                    .map((posts,index)=>{return <PostForm 
                                            key={index} 
                                            id = {posts.post_id}
                                            title={posts.title} 
                                            contents={posts.contents} 
                                            name={posts.name}

                                            date={posts.date}
                                            callback={handlerOnclickPost}
                                            />})

            }
        </SiteLayout>
    );
};

export default Post;
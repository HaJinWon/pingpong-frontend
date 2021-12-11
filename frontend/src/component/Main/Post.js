import React ,{useState, useEffect}from 'react';
import SiteLayout from '../../layout/SiteLayout';
import { BrowserRouter,useParams } from 'react-router-dom';
import PostForm from './PostForm';

const Post = () => {
    let {id} = useParams();
    
    const [postidforComment, setPostidforComment] = useState('');
    const [postList, setPostList] = useState([]);
    
    const handlerOnclickPost=({Postid})=>{
        setPostidforComment(Postid);
    }

    useEffect(async()=>{        // 리스트 가져오는 useEffect
        console.log("useeffect in");
        
        try {
            const response = await fetch(`/api/post/list/${id}`, {
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
       
    },[id]);


    return (
        <SiteLayout postidforComment={postidforComment}>
            <h2>[Post]{id}</h2>

            {postList
                    .map((posts)=>{return <PostForm 
                                            key={posts.post_id} 
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
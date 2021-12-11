import React ,{useState, useEffect}from 'react';
import SiteLayout from '../../layout/SiteLayout';
import { BrowserRouter,useParams } from 'react-router-dom';
import PostForm from './PostForm';

const Post = () => {
    let {id} = useParams();
    
    //console.log(id);
    
    
    const [postList, setPostList] = useState([]);
    
    useEffect(async()=>{        //nav 리스트 가져오는 useEffect
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
            //console.log(jsonResult.data);
        
            setPostList(jsonResult.data.postList);
            //console.log("postlist",postList);
            //console.log("message",response.message);
       
           // setPartId(id);
            //console.log(id);
            //setPartId(id);
        }catch(err){
            console.log(err);
        }
       
    },[id]);


    return (
        <SiteLayout>
            <h2>[Post]{id}</h2>
        
            {
            
                postList
                    .map((posts,index)=>{return <PostForm 
                                            key={index} 
                                            id = {posts.post_id}
                                            title={posts.title} 
                                            contents={posts.contents} 
                                            name={posts.name}
                                            date={posts.date}/>
                                    })
            
            }

        </SiteLayout>
    );
};

export default Post;
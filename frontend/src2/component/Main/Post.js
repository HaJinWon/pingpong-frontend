import React ,{useState, useEffect}from 'react';
import SiteLayout from '../../layout/SiteLayout';
import { BrowserRouter,useParams,NavLink } from 'react-router-dom';
import PostForm from './PostForm';
import SearchBar from './SearchBar';

const Post = ({FileInput}) => {
    let {teamid, partid} = useParams(); 
    const [postidforComment, setPostidforComment] = useState('');
    const [postforComment, setPostforComment]=useState([]);
    const [postList, setPostList] = useState([]);
    const [postListReset, setPostListReset]=useState(false);

    const [navRightForPost, setNavRightForPost]=useState(false);
    const showNavRight=()=>{setNavRightForPost(!navRightForPost)}

    const [keyword, setKeyword] = useState('');

    const notifyKeywordChanged = (keyword) => {
        setKeyword(keyword);
    };


    useEffect(async()=>{        // part 별 post list 가져옴.
        try {
            const response = await fetch(`/api/post/${partid}`, {
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
       
    },[partid, postListReset]);

    const handlerDeletePost=({Postid})=>{       //postform component에서 게시글이 삭제되었을 때, postlist reloading을 위한 handler. 40번 줄에 반영
        setPostListReset(!postListReset)
    }
    
    const handlerOnclickPost=({Postid, post})=>{        //nav right(comment) commponent에 target post 정보를 보내준다. 
        setPostidforComment(Postid);
        setPostforComment(post);
    }


    return (

        <SiteLayout postidforComment={postidforComment} postforComment={postforComment} showNavRight2={showNavRight} navRightForPost={navRightForPost}>
            <h2>[Post]{partid}</h2>
            <NavLink to ={`/${teamid}/post/write/${partid}`}>게시글 작성</NavLink>      {/*버튼으로 교체 예정 */}
            <SearchBar keyword={keyword} callback={notifyKeywordChanged} />

            {
            
                postList
                    .filter(posts => posts.title.indexOf(keyword) !== -1 || posts.contents.indexOf(keyword) !== -1)
                    .map((posts,index)=>{return <PostForm 
                                            key={index} 
                                            id = {posts.post_id}
                                            title={posts.title} 
                                            contents={posts.contents} 
                                            name={posts.name}
                                            post={posts}
                                            date={posts.date}
                                            callback={handlerOnclickPost}
                                            handlerDeletePost={handlerDeletePost}
                                            showNavRight={showNavRight}
                                            />})

            }
        </SiteLayout>
    );
};

export default Post;
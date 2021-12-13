import React, {useState, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Routes, Route} from 'react-router';
import Login from './login/Login';
import Join from './join/Join';

import Message from './component/Main/Message';
import UserUpdate from './userUpdate/UserUpdate';
import Main from './component/Main/Main';
import Post from './component/Main/Post';
<<<<<<< HEAD
import PostWrite from './component/Main/PostWrite';

=======
import Chat from './component/Chat/Chat';
>>>>>>> 02bbb92fa67d5e56a211277e96f45fe0f3531360


export default function App() {

  
    return (   
      <BrowserRouter>
        <Routes>
            
            <Route path='/login' element={<Login/>}/>
            <Route path='/join' element={<Join/>}/>
            <Route path='/post/:id' element={<Post/>}/>

            <Route path='/userUpdate' element={<UserUpdate/>}/>

<<<<<<< HEAD
            <Route path='/' element={<Main/>}/>
            <Route path='/post/write/:id'element ={<PostWrite/>}/>
            <Route path='/message' element={<Message/>}/>

           
=======
            <Route path='/' element={<Login/>}/>
            <Route path='/post'element ={<Post/>}/>
            <Route path='/message' element={<Message/>}/>

            <Route path='/main' element={<Main/>}/>
            <Route path='/post'element ={<Post/>}/>
            <Route path='/message' element={<Message/>}/>
            <Route path='/chat/:roomId' element={<Chat/>}/>
>>>>>>> 02bbb92fa67d5e56a211277e96f45fe0f3531360

        </Routes>
      </BrowserRouter>
    )


  
 /*
    const [isLogin, setIsLogin]= useState('1');       //저장해둔 로그인 사용자의 id 넣어주기.
    const [Post, setPost]=useState('test');
    return useRoutes([
       //{path:'/' || 'main', element : (isLogin===''?<Member isLogin={isLogin}/>:<Main isLogin={isLogin} Post={Post}/>)},        
       {
           path:'main', 
           element :<Main isLogin={isLogin} Post={Post}/>,
            children:[{
                path: 'post',
                element:<Post isLogin={isLogin} Post={Post} />
            },{
                path: 'message',
                exact: false,
                element:<Message isLogin={isLogin}/>
            }]
        },
       //{path:'member', element :<Member isLogin={isLogin}/>},
       {path:'post', element :<Post isLogin={isLogin}/>},
       {path:'message', element :<Message isLogin={isLogin}/>},
       {path:'login', element :<Login />},
       {path:'join', element :<Join />},
       {path:'userUpdate', element :<UserUpdate />}

    ]);

    */
}


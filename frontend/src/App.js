import React, {useState, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Routes, Route} from 'react-router';
import Login from './login/Login';
import Join from './join/Join';
import Post from './post/Post';
import Message from './component/Main/Message';
import UserUpdate from './userUpdate/UserUpdate';



export default function App() {

  
    return (   
      <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/join' element={<Join/>}/>
            <Route path='/post' element={<Post/>}/>
            <Route path='/userUpdate' element={<UserUpdate/>}/>
            <Route path='/message' element={<Message/>}/>
            
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

import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Login from "./login/Login";
import Join from "./join/Join";
import Main from "./component/Main/Main";
import Post from "./component/Main/Post"; //postlist
import PostWork from "./component/Main/PostWork"; //postwrite, modify, del, showComment
import Chat from "./component/Chat/Chat";
import Welcome from "./welcome/Welcome";
import FindId from "./findid/FindId";

export default function App({ FileInput }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/:teamid/post/:partid" element={<Post />} />
        <Route path="/:teamid/post/:category/:postid" element={<PostWork />} />
        <Route path="/" element={<Login />} />
        <Route path="/:teamid/main" element={<Main FileInput={FileInput} />} />
        <Route
          path="/:teamid/chat/:roomId"
          element={<Chat FileInput={FileInput} />}
        />
        <Route path='/welcome' element={<Welcome/>}/>
        <Route path='/findid' element={<FindId/>}/>
      </Routes>
    </BrowserRouter>
  );

}

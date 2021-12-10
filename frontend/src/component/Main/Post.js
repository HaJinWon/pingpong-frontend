import React ,{useState}from 'react';
import SiteLayout from '../../layout/SiteLayout';

const Post = ({isLogin, postId}) => {
    return (
        <SiteLayout>
            <h2>[Post] login : {isLogin}  postId : {postId}</h2>
        </SiteLayout>
    );
};

export default Post;
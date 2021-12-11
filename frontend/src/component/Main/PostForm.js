import React from 'react';

const PostForm = ({title, contents,name ,date,id,callback }) => {
      
   const handlerOnclickPost=(e)=>{
      e.preventDefault();
      callback({'Postid':id})
   }

    return (
        
      
      //<NavLink to ={`/post/comment/:${id}`}>
            <table className="Post" onClick={handlerOnclickPost
               
               }
            >
               <tr >
                  <td className="PostTitle">{title, id}</td>
                  <td><button>post detail</button></td>
               </tr>
               <tr>
                  <td className="PostContents">{contents}</td>
               </tr>
               <tr>
                  <td className="Writer">{name}</td>
               </tr>
               <tr>
                  <td className="date">{date}</td>
               </tr>
                <tr>
                  {
                    //<p onClick={'클릭하면 NavRight에 comment 띄움. '}>comment summery</p>
                  }
               </tr>
            </table>
        // </NavLink>
      
    );
};

export default PostForm;
import React from 'react';

const PostForm = ({key,title, contents,name ,date,id }) => {

    const handlerOnclick= (e)=> {
        e.preventDefault();
        console.log(id);

    }

    return (
        
            <table class="Post" onClick={handlerOnclick}>
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
                    <p onClick={'클릭하면 NavRight에 comment 띄움. '}>comment summery</p>
                </tr>
            </table>
      
    );
};

export default PostForm;
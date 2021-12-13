import React from 'react';

<<<<<<< HEAD
const PostForm = ({title, contents,name ,date,id,callback }) => {
      
   const handlerOnclickPost=(e)=>{
      e.preventDefault();
      callback({'Postid':id})
   }
=======
const PostForm = ({title, contents,name ,date,id }) => {

    const handlerOnclick = (e)=> {
        e.preventDefault();
        console.log(id);

    }
>>>>>>> 02bbb92fa67d5e56a211277e96f45fe0f3531360

    const styles ={
        border:'1px solid black'
    }

    return (
<<<<<<< HEAD
        
      
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
=======
            <div>
            <table className="Post" onClick={handlerOnclick} style={styles}>
                <thead>
                </thead>
                <tbody>

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
                         //   <p onClick={'클릭하면 NavRight에 comment 띄움. '}>comment summery</p>
                        }
                    </tr>
                </tbody>
            </table>
            <br/>
            </div>
>>>>>>> 02bbb92fa67d5e56a211277e96f45fe0f3531360
      
    );
};

export default PostForm;
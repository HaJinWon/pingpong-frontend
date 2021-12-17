import React from 'react';

const CommentForm = (props) => {
   
    const handlerOnclickCommentDel=async()=>{ 
       
            //comment 삭제
            try {
            // Delete
            const response = await fetch(`/api/post/comment/delete/${props.id}`, {
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
            });


            // fetch success?
            if (!response.ok) {
            throw `${response.status} ${response.statusText}`;
            }

            // API success?
            const json = await response.json();
            if (json.result !== 'success') {
            throw json.message;
            }


            } catch (err) {
            console.error(err);
            }

            props.callback(props.id)

    };
    return (
        <table className="Comment">
            <tr >
                <td  className="Writer">{props.name}</td> 
                <td  className="date">{props.date}</td>   
                <td><button onClick={handlerOnclickCommentDel}>post delete</button></td>
                </tr>
            <tr>
               <td className="CommentContents">{props.contents}</td>
            </tr>   
         </table>
    )
};

export default CommentForm;
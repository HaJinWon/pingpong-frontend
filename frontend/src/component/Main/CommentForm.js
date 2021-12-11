import React from 'react';

const CommentForm = ({id, member_id, contents, name, date, post_id, callback}) => {
   
    const handlerOnclickCommentDel=async()=>{ 
       
            //comment 삭제를 위한 함수
            try {
            // Delete
            const response = await fetch(`/api/post/comment/delete/${id}`, {
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

            callback(id)

    };
    return (
        <table className="Comment">
            <tr >
                <td  className="Writer">{name}</td> 
                <td  className="date">{date}</td>   
                <td><button onClick={handlerOnclickCommentDel}>post delete</button></td>
                </tr>
            <tr>
               <td className="CommentContents">{contents}</td>
            </tr>   
         </table>
    )
};

export default CommentForm;
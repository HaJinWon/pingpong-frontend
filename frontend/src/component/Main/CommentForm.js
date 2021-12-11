import React from 'react';

const CommentForm = ({id, member_id, contents, name, date, post_id}) => {
    console.log("commentFrom in"+{id})
    
    return (
        <table className="Comment">
            <tr >
                <td  className="Writer">{name}</td> 
                <td  className="date">{date}</td>   
                <td><button>post delete</button></td>
                </tr>
            <tr>
               <td className="CommentContents">{contents}</td>
            </tr>   
         </table>
    )
};

export default CommentForm;
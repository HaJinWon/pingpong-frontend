import React from 'react';

const PostForm = ({title, contents,name ,date,id }) => {

    const handlerOnclick = (e)=> {
        e.preventDefault();
        console.log(id);

    }

    const styles ={
        border:'1px solid black'
    }

    return (
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
      
    );
};

export default PostForm;
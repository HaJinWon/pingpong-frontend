import React, { useState } from 'react';
import { useParams } from 'react-router';
import SiteLayout from '../../layout/SiteLayout';
import Button from 'react-bootstrap/Button';


import styles from '../../assets/scss/PostWrite.scss'

const PostWrite = () => {
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [file, setFile] = useState();
    const [image, setImage] = useState();
    const [postAdd, setPostAdd] = useState(false);

    const onChangeImage = (e) => {
        setImage({
            imageFile: e.target.value,
        })
    }

    const onChangeFile = (e) => {
        setFile({
            attachFiles: e.target.value,
        })
    }

    let { teamid, partid } = useParams();
    const [addPost, setAddPost] = useState([]);


    const handlerOnClickPostAdd = async (e) => {         //글 작성을 위한 함수
        e.preventDefault();

        try {
            const response = await fetch(`/api/post/write/${partid}`, {
                method: 'post',
                mode: 'cors',
                credentials: 'include',
                cache: 'no-cache',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrer: 'client',
                body: JSON.stringify({ ...title, ...contents })
            })

        } catch (err) {
            console.log(err);
        }

        location.href = `/${teamid}/post/${partid}`;
    }

    const onChangeTitle = (e) => {
        setTitle({
            title: e.target.value,
        })

    }
    const onChangeContents = (e) => {
        setContents({
            contents: e.target.value,
        })

    }

    return (


        <div className={styles.PostWrite}>
            <h2>[PostWrite]</h2>

            <form enctype="multipart/form-data">

                <table>
                    <tr className='posttitle'>
                        <td>{"title"}</td>
                        <td><input name='title' type='text' onChange={onChangeTitle} /></td>

                    </tr>
                    <br />
                    <tr className='postcontents'>
                        <td>{"contents"}</td>
                        <td height="400px"><textarea name='contents' cols="95" rows="20" onChange={onChangeContents} /></td>
                    </tr>
                    <br />
                    <tr className='postfile'>
                        <td>{"file add"}</td>
                        <td><input name='file' type="text" name="title" onChange={onChangeContents} /> <input type="file" multiple="multiple" name="attachFiles" /></td>

                    </tr>
                    <br />
                    <tr className='postimg'>
                        <td>{"Image add"}</td>
                        <td><input name='file' type="text" name="title" onChange={onChangeContents} /> <input type="file" name="imageFile" /></td>

                    </tr>
                    <br />
                    <tr className='postcontents'>
                        <td>
                            <input name='imageFile' type='file' onChange={onChangeImage} />
                        </td>

                        <td>
                            <input name='attachFiles' type='file' multiple="multiple" onChange={onChangeFile} />

                        </td>

                    </tr>
                    <tr>
                        <td>
                            <Button variant="secondary" size="lg" type='submit' onClick={handlerOnClickPostAdd}>작성 완료</Button>
                        </td>
                    </tr>


                </table>
            </form>

        </div>


    );
};

export default PostWrite;
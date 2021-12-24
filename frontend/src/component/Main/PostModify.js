import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import SiteLayout from "../../layout/SiteLayout";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import ImageFileInput from "../image_file_input/image_file_input";
import ImageUploader from "../../service/image_uploader";

import styles from "../../assets/scss/PostWrite.scss";

const PostModify = (props) => {
  const imageUploader = new ImageUploader();
  const FileInput = (props) => (
    <ImageFileInput {...props} imageUploader={imageUploader} />
  );

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [partId, setPartId] = useState("");
  //   const [post, setPost] = useState([]);

  const stylesContent ={
    width:'50%'
  }
  useEffect(async () => {
    try {
      const response = await fetch(`/api/post/update/${props.postid}`, {
        method: "get",
        mode: "cors",
        credentials: "include",
        cache: "no-cache",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "client",
        body: null,
      });

      const jsonResult = await response.json();

      setTitle(jsonResult.data.title);
      setContents(jsonResult.data.contents);
      setThumbnail(jsonResult.data.thumbnail);
      setPartId(jsonResult.data.partId);
    } catch (err) {
      console.log(err);
    }
  }, []);
  const handlerOnClickPostModify = async (e) => {
    //수정된 post 내용을 전송하는 post id
    e.preventDefault();

    try {
      const response = await fetch(`/api/post/update/${props.postid}`, {
        method: "PATCH",
        mode: "cors",
        credentials: "include",
        cache: "no-cache",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "client",
        body: JSON.stringify({ title, contents, thumbnail }),
      });
    } catch (err) {
      console.log(err);
    }
    console.log("click!!!!!!!!!!!!!!!!!!!!!!");
    location.href = `/${props.teamid}/post/${partId}`;
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeContents = (e) => {
    setContents(e.target.value);
  };

  const callback = (fileName) => {
    console.log("b", fileName);
    changedFile = fileName;
  };

  const onFileChange = (file) => {
    console.log("ggggg", file);
    setThumbnail(file.storeName);
  };

  return (
    <div className={styles.PostWrite}>
      <h2>글 수정하기</h2>
      <form action method="post" enctype="multipart/form-data">
        <table>
          <tr className={styles.Title}>
            <td>{"제목"}</td>
            <td>
              <input
                name="title"
                type="text"
                onChange={onChangeTitle}
                value={title}
              />
            </td>
          </tr>
          <br />
          <tr className={styles.Contents} style={stylesContent}>
            <td>{"내용"}</td>
            <td height="400px" >
              <textarea
                width="50%"
                name="contents"
                cols="108"
                rows="20"
                value={contents}
                onChange={onChangeContents}
              />
            </td>
          </tr>
          <br />
          <tr className="postimg">
            <td>{"thumbnail add"}</td>
            <td>
              <FileInput callback={callback} onFileChange={onFileChange} />
            </td>
            <td>
              {thumbnail ? (
                <Image
                  src={`http://localhost:8080/upload-file/${thumbnail}`}
                  roundedCircle={true}
                  class="rounded mx-auto d-block"
                  width="150px"
                  height="150px"
                  alt="thumbnail"
                />
              ) : null}
            </td>
          </tr>
          <br />
          <tr className="postcontents">
            <td>
              <Button
                variant="secondary"
                size="lg"
                type="submit"
                onClick={handlerOnClickPostModify}
              >
                작성 완료
              </Button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default PostModify;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import ImageFileInput from "../image_file_input/image_file_input";
import ImageUploader from "../../service/image_uploader";

import styles from "../../assets/scss/PostWrite.scss";

const PostWrite = ({ partid, teamid }) => {
  const imageUploader = new ImageUploader();
  const FileInput = (props) => (
    <ImageFileInput {...props} imageUploader={imageUploader} />
  );

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [thumbnail, setThumbnail] = useState();
  const [postAdd, setPostAdd] = useState(false);
  const partId = partid;
  const teamId = teamid;

  const handlerOnClickPostAdd = async (e) => {
    //글 작성을 위한 함수
    e.preventDefault();
    console.log({ title, contents });
    alert("11");
    try {
      const response = await fetch(`/api/post/${partId}`, {
        method: "post",
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

    location.href = `/${teamId}/post/${partId}`;
  };

  //   useEffect(() => {
  //     thumbnail && setThumbnail(thumbnail);
  //   }, [thumbnail]);

  const callback = (fileName) => {
    console.log("b", fileName);
    changedFile = fileName;
  };

  const onFileChange = (file) => {
    console.log("ggggg", file);
    setThumbnail(file.storeName);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeContents = (e) => {
    setContents(e.target.value);
  };
  // useEffect(async () => {
  //     try {
  //       const response = await fetch("/api/member/edit", {
  //         //선택한 post 를 가져오는 부분
  //         method: "get",
  //         mode: "cors",
  //         credentials: "include",
  //         cache: "no-cache",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //         redirect: "follow",
  //         referrer: "client",
  //         body: null,
  //       });

  //       const jsonResult = await response.json();
  //       console.log(jsonResult);

  //       if (jsonResult.result !== "success") {
  //         throw new Error(`${jsonResult.result} ${jsonResult.message}`);
  //       }
  //       console.log("회원정보 수정 : ", jsonResult.data);
  //       setAvatar(jsonResult.data.avatar);
  //       console.log('아바타 주소',avatar);
  //       setFormInfo({
  //         name: jsonResult.data.name,
  //         avatar: jsonResult.data.avatar,
  //         email: jsonResult.data.email,
  //         phone: jsonResult.data.phone,
  //         company: jsonResult.data.company,
  //         fileName: jsonResult.data.fileName,
  //         status: "LOGIN",
  //       });
  //     } catch (err) {
  //     } finally {
  //       //   console.log("formInfo: json :", jsonResult.data.avatar);
  //       console.log("formInfo : state", formInfo);
  //       console.log("formInfo.avatar: state:", formInfo.avatar);
  //     }
  //   }, [changeValue]);
  return (
    <div className={styles.PostWrite}>
      <h2>[PostWrite]</h2>

      <form enctype="multipart/form-data" onSubmit={handlerOnClickPostAdd}>
        <table>
          <tr className="posttitle">
            <td>{"title"}</td>
            <td>
              <input name="title" type="text" onChange={onChangeTitle} />
            </td>
          </tr>
          <br />
          <tr className="postcontents">
            <td>{"contents"}</td>
            <td height="400px">
              <textarea
                name="contents"
                cols="95"
                rows="20"
                onChange={onChangeContents}
              />
            </td>
          </tr>
          <br />
          {
            <tr className="postimg">
              <td>{"Image add"}</td>
              <td>
                <FileInput callback={callback} onFileChange={onFileChange} />
              </td>
            </tr>
          }
          <br />
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
          <tr>
            <td>
              <Button
                variant="secondary"
                size="lg"
                type="submit"
                onClick={handlerOnClickPostAdd}
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

export default PostWrite;

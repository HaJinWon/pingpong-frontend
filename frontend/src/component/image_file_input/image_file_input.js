import React, { useRef } from "react";
import styles from "./image_file_input.module.css";
import ImageUploader from "../../service/image_uploader";
import axios from "axios";

const ImageFileInput = ({ imageUploader, name, onFileChange, callback }) => {
  const inputRef = useRef();
  const onButtonClick = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };

  const imageUpload2 = async(file) =>{
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pdzaoz52");

    let response;

    const result = await axios
      .post("/api/file/upload", data, {
        //회원정보 수정 부분
        headers: {
          "content-type": "multipart/form-data",
        },
        body: data,
      })
      .then((res) => {
        console.log(res.data);
        response = res.data;
      });

    return response;
  }

  const onChange = async (event) => {
    console.log(event.target.files[0]);

    //const uploaded = await imageUpload2(event.target.files[0]);
    // onFileChange({
    //   name: uploaded.origFileName,
    //   storeName: uploaded.storeFileName,
    //   url: uploaded.filePath,
    // });
    console.log('uploadedfile',event.target.files[0]);
    callback(event.target.files[0]);
  };

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        //className={styles.input}
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />
      <button className={styles.button} onClick={onButtonClick}>
        {name || "No file"}
      </button>
    </div>
  );
};

export default ImageFileInput;

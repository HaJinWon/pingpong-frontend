import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../assets/scss/profileImg.scss";

import DefaultImage from "../assets/images/Im0.jpg";

const UserUpadteForm = ({ FileInput }) => {
  const baseUrl = "../assets/images/";
  const [avatar,setAvatar] = useState('Im0.jpg');
  const avatarImage  = avatar;
  const [formInfo, setFormInfo] = useState({
    name: "",
    avatar: "",
    phone: "",
    company: "",
    storeName: "",
    origName: "",
  });

  const onFileChange = (file) => {
    console.log("ggggg", file);
    setFormInfo({
      ...formInfo,
      avatar: baseUrl + file.storeName,
      storeName: file.storeName,
      origName: file.name,
    });
  };

  const chgForm = (e) => {
    let { name, value } = e.target;

    setFormInfo({
      ...formInfo,
      [name]: value,
    });

    console.log(formInfo);
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();

    await axios
      .patch("/api/member/edit", formInfo, {
        //회원정보 수정 부분
        headers: {},
      })
      .then((res) => {
        console.log(res.data);
        if (res.data !== null) {
          console.log("수정된 내용 : ", formInfo);
          alert("수정완료");
        } else {
          alert("수정실패");
        }
      });
  };

  useEffect(async () => {
    try {
      const response = await fetch("/api/member/edit", {
        //로그인한 회원의 회원정보를 가져오는 부분
        method: "get",
        mode: "cors",
        credentials: "include",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        redirect: "follow",
        referrer: "client",
        body: null,
      });

      const jsonResult = await response.json();
      console.log(jsonResult);

      if (jsonResult.result !== "success") {
        throw new Error(`${jsonResult.result} ${jsonResult.message}`);
      }
      console.log("회원정보 수정 : ", jsonResult.data);
      setAvatar(jsonResult.data.avatar);
      console.log('아바타 주소',avatar);
      setFormInfo({
        name: jsonResult.data.name,
        avatar: jsonResult.data.avatar,
        email: jsonResult.data.email,
        phone: jsonResult.data.phone,
        company: jsonResult.data.company,
        fileName: jsonResult.data.fileName,
        status: "LOGIN",
      });
    } catch (err) {
    } finally {
      //   console.log("formInfo: json :", jsonResult.data.avatar);
      console.log("formInfo : state", formInfo);
      console.log("formInfo.avatar: state:", formInfo.avatar);
    }
  }, [formInfo.avatar]);

  const styles = {
    backgroundImage: formInfo.avatar,
  };

  console.log("ooout: formInfo.avatar: state:", formInfo.avatar);
  return (
    <div className={styles.profileImg}>
      <h1>{formInfo.avatar}</h1>
      <div>
        {
          <Image
            src={require(`../assets/images/${avatar}`)}
            // src={require(`../assets/images/${formInfo.avatar}`)}
            // src={require(`${formInfo.avatar}`)}
            // src={{ imageUrl }}
            roundedCircle={true}
            className="img-responsive center-block"
            width="150px"
            alt="프로필 이미지"
          />
        }
      </div>

      <div className="User UpdateForm">
        <Form onSubmit={handlerSubmit} enctype="multipart/form-data">
          <FileInput onFileChange={onFileChange} />

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={formInfo.email}
              onChange={chgForm}
              name="email"
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={formInfo.name}
              onChange={chgForm}
              name="name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={formInfo.phone}
              onChange={chgForm}
              name="phone"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Company</Form.Label>
            <Form.Control
              type="text"
              value={formInfo.company}
              onChange={chgForm}
              name="company"
            />
          </Form.Group>
          <Button variant="primary" type="button">
            돌아가기
          </Button>
          <Button variant="primary" type="submit">
            회원정보 수정
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UserUpadteForm;

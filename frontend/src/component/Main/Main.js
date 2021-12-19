import React, { useState } from "react";
import SiteLayout from "../../layout/SiteLayout";
import styles from "../../../assets/scss/Main.scss";

const Main = ({ FileInput }) => {
  //welcome page 추가 예정

  return (
    <SiteLayout FileInput={FileInput}>
      <h2>[Main]</h2>
    </SiteLayout>
  );
};

export default Main;

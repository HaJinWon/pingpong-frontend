<<<<<<< HEAD
import React from "react"
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import styles from './assets/scss/App.scss';


render(

        <App/>, document.getElementById('root')
=======
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import styles from "./assets/scss/App.scss";
import ImageUploader from "./service/image_uploader";
import ImageFileInput from "./component/image_file_input/image_file_input";

const imageUploader = new ImageUploader();
const FileInput = (props) => (
  <ImageFileInput {...props} imageUploader={imageUploader} />
>>>>>>> f4dff1f0e49689420734ae7be4d38e5b4262afc2
);

render(<App FileInput={FileInput} />, document.getElementById("root"));

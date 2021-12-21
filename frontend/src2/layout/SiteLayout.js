import React, { Fragment, useState } from "react";
import Contents from "./Contents";
import NavLeft from "./NavLeft";
import NavRight from "./NavRight";
import NavTop from "./NavTop";

import styles from "../assets/scss/layout/Contents.scss";
import styles2 from "../assets/scss/layout/Body.scss";

<<<<<<< HEAD
const SiteLayout = ({children, postidforComment, postforComment, showNavRight2, navRightForPost}) => {
    
   
    const [navRightbar, setNavRightbar]=useState(false);
    const showNavRight=()=>{ showNavRight2(!navRightForPost) 
        setNavRightbar(!navRightbar)
    }
    return (
        <Fragment >
            <NavLeft />
            <div className={styles2.Body}>
               <NavTop showNavRight={showNavRight}/>  
               
                <div className={styles.Contents}>
                    {children}
                </div>
               
            </div>
            {navRightbar===false || navRightForPost === false ? null:<NavRight postidforComment={postidforComment} postforComment={postforComment} navRightbar={navRightbar} showNavRight={showNavRight} showNavRight={showNavRight}/>}

        </Fragment>
    );
=======
const SiteLayout = ({
  FileInput,
  children,
  postidforComment,
  postforComment,
}) => {
  return (
    <Fragment>
      <NavLeft />
      <div className={styles2.Body}>
        <NavTop />
        <div className={styles.Contents}>{children}</div>
      </div>
      <NavRight
        FileInput={FileInput}
        postidforComment={postidforComment}
        postforComment={postforComment}
      />
    </Fragment>
  );
>>>>>>> f4dff1f0e49689420734ae7be4d38e5b4262afc2
};

export default SiteLayout;

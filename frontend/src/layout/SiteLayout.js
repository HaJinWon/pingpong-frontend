import React, { Fragment , useState} from 'react';
import Contents from './Contents';
import NavLeft from './NavLeft';
import NavRight from './NavRight';
import NavTop from './NavTop';

import styles from '../assets/scss/layout/Contents.scss'
import styles2 from'../assets/scss/layout/Body.scss'


const SiteLayout = ({children, postidforComment}) => {
    return (
        <Fragment >
            <NavLeft></NavLeft>
            <div className={styles2.Body}>
                <NavTop/>
                <div className={styles.Contents}>
                    {children}
                </div>
               
            </div>
            <NavRight postidforComment={postidforComment}/>
           

        </Fragment>
    );
};

export default SiteLayout;
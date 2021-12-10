import React, { Fragment , useState} from 'react';
import Contents from './Contents';
import NavLeft from './NavLeft';
import NavRight from './NavRight';
import NavTop from './NavTop';

import styles from '../assets/scss/layout/Contents.scss'
import styles2 from'../assets/scss/layout/Body.scss'


const SiteLayout = ({children}) => {
    return (
        <Fragment >
            <NavLeft></NavLeft>
            <div className={styles2.Body}>
                <NavTop/>
                <div className={styles.Contents}>
                    {children}
                </div>
               
            </div>
            <NavRight/>
           

        </Fragment>
    );
};

export default SiteLayout;
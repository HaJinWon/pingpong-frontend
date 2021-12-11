import React, { useState } from 'react';
import { useParams } from 'react-router';
import SiteLayout from '../../layout/SiteLayout';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBell, faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';

// additional... 꼭 필요하지 않음
import {library} from '@fortawesome/fontawesome-svg-core';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';

import styles from '../../assets/scss/PostWrite.scss'

const PostWrite = () => {
    let id = useParams();
    const [addPost, setAddPost]=useState([]);
    console.log("postwrite in"+id)

    const handlerOnClickPostAdd=async({title, comments})=>{
        
        try {
        
            const response = await fetch(`/api/post/write/${id}`, {
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
                body: JSON.stringify({title,comments})
            });
    
    
            // fetch success?
            if (!response.ok) {
            throw `${response.status} ${response.statusText}`;
            }
    
            // API success?
            const json = await response.json();
            if (json.result !== 'success') {
            throw json.message;
            }
    
    
            } catch (err) {
            console.error(err);
            }
    
            //Post로 이동..

    }

    return (
       
            <SiteLayout>
                 <div className={styles.PostWrite}>
                 <h2>[PostWrite]</h2>
                 <form>
                     <table>
                         <tr className='posttitle'>
                           <td>
                                {"title"}
                            </td>
                            <td>
                                <input className='AddPosttitle' type='text'></input>
                            </td>
                        </tr>
                        <tr className='postcontents'>
                            <td>
                                {"contents"}
                            </td>
                            <td>
                            <input name='AddPostcomment' type='text'></input>
                            </td>
                        </tr>
                        <tr className='postcontents'>
                            <td>
                                 <FontAwesomeIcon icon={far,'fa-file-alt'} />
                           
                                <FontAwesomeIcon icon={'fas','fa-camera'} />
                            
                                 <FontAwesomeIcon icon={'fas','fa-poll'} />
                            </td>
                            <td>
                                 <input type='submit' onClick={handlerOnClickPostAdd(e.target.AddPosttitle, e.target.AddPostcomment)}/>
                            </td>
                        </tr>
                            
                           
                        </table>
                    </form>
                    
                 </div>
            </SiteLayout>
       
    );
};

export default PostWrite;
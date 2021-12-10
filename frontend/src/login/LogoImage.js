import React, {useState, useEffect} from 'react';

export default function() {
    
    const style ={
        marginTop:"100px",
        margin:"auto",
        border:"1px solid green",
        width:"200px",
        height:"200px"
    }

    return (
        <div className='LogoImage' style={style}>
            <div id='logoImage'></div>
        </div>
    )
}
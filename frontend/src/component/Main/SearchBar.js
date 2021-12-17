import React,{useState} from 'react';


const SearchBar = ({keyword,callback}) => {
    
    return (
        <div>
        <input type='text' placeholder='search' value={keyword} onChange={(e) => callback(e.target.value) }/>
        </div>
    );
};

export default SearchBar;
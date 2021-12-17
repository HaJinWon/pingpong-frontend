import React,{useState} from 'react';


const SearchBar = ({keyword,callback}) => {
    
    return (
        <div>
        찾기: <input type='text' placeholder='search' value={keyword} onChange={(e) => callback(e.target.value) }/>
        </div>
    );
};

export default SearchBar;
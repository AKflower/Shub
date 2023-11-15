"use client"
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';
import styles from './search.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import url from '@/utils/url';
// import { search } from '@/api';

const Search = () => {

  const [isSearching,setSearching] = useState(false);

  const handleSearching = () => {
      setSearching(!isSearching);
  }
  
  return (
    <>
    <div id={styles.search}  className=''>
      
      <div id={styles.input} onClick={handleSearching}>
      
        {isSearching ? 
        <div className="" onClick={handleSearching}><ArrowBackIcon /></div> :<SearchIcon />}
        <input
          type="text"
          className={styles.inputField}
          aria-label="Search"
          
          placeholder="Search..."
        />
      </div>
  
  
    </div>
    {isSearching && <div>Khoa</div>}
  </>
    
  );
};

export default Search;

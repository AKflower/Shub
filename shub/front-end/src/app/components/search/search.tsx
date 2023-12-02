"use client"
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';
import styles from './search.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchView from './searchView/searchView';
// import url from '@/utils/url';
// import { search } from '@/api';

const Search = () => {

  const [isSearching,setSearching] = useState(false);
  const [lockSearching,setLock] = useState(false);
  const handleSearching = () => {
    
    setSearching(true);
    console.log('fagwawg', isSearching);
    
  }
  const offSearching = () => {
    
    setSearching(false);
    console.log('222', isSearching);

  }
  
  
  return (
    <>
    <div id={styles.search}  className=''>
    {isSearching ? 
        <div className={styles.click} onClick={offSearching}><ArrowBackIcon /></div> :<div className={styles.click}><SearchIcon /></div>} 
      <div id={isSearching ? styles.inputSearching: styles.input } onClick={handleSearching}>
      
        
        <input
          type="text"
          className={styles.inputField}
          aria-label="Search"
          
          placeholder="Search..."
        />
      </div>
  
  
    </div>
    {isSearching && <SearchView />} 
  </>
    
  );
};

export default Search;

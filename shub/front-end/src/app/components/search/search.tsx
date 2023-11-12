import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';
import styles from './search.module.scss';
// import url from '@/utils/url';
// import { search } from '@/api';

const Search = () => {


  return (
    <div id={styles.search}  className=''>
      <div id={styles.input}>
       
          <button className="action"  aria-label="Close" title="Close">
          </button>
        <input
          type="text"
          className={styles.inputField}
          aria-label="Search"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default Search;

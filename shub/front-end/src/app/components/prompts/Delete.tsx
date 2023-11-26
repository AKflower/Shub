// components/Delete.tsx

import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Delete.module.scss'
import { useShub } from '@/app/Provider/Provider';
import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/store';
// import { useRouter } from 'next/router';

// import { files as api } from '@/api';
// import buttons from '@/utils/buttons';

const cx = classNames.bind(styles);

interface DeleteProps {}

const Delete: React.FC<DeleteProps> = () => {

  const { selected, delFolder, toggleCurrentPromptName, toggleShowDelete } = useShub();
  const toggle = () => {
    toggleCurrentPromptName()
    toggleShowDelete()
  }
  const submit = () => {
    const token = localStorage.getItem('token');

    axios.delete(`http://localhost:3001/folders/${selected}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    })
        .then(response => {
            console.log('Folder deleted');
          })
          .catch(error => {
            console.error('Error creating folder:', error);
          });
    toggle()
  }

  let selectedCount = 1

  return (
    <div className={cx('card','floating')}>
      <div className={cx("card-content")}>
        <p>
          {/* {selectedCount === 1 ? 'Prompts delete message single' : `Prompts delete message multiple ${selectedCount}`} */}
          Are you sure you want to delete this file/folder?


        </p>
      </div>
      <div className={cx("card-action")}>
        <button
          onClick={() => toggle()
        }
          className={cx('button','button--flat',"button--grey")}
          aria-label="Cancel"
          title="Cancel"
        >
          Cancel
        </button>
        <button
          onClick={() => submit()}
          className={cx('button','button--flat',"button--red")}
          aria-label="Delete"
          title="Delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Delete;

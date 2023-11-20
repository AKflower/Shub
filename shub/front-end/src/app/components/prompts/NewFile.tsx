"use client"

import React, { useState } from 'react';
import { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './NewFile.module.scss'
import { useShub } from '@/app/Provider/Provider';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'next/router';
// import { files as api } from '@/api';
// import { removeLastDir } from '@/utils/url';

const cx = classNames.bind(styles);

interface NewFileProps {
  // Add any additional props if needed
}

const NewFile: FC<NewFileProps> = () => {
//   const [name, setName] = useState<string>('');
//   const isFiles = useSelector((state: RootState) => state.isFiles);
//   const isListing = useSelector((state: RootState) => state.isListing);
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const submit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (name === '') return;

//     // Build the path of the new directory.
//     let uri = isFiles ? router.asPath + '/' : '/';

//     if (!isListing) {
//     //   uri = removeLastDir(uri) + '/';
//     }

//     uri += encodeURIComponent(name);
//     uri = uri.replace('//', '/');

//     try {
//     //   await api.post(uri);
//       router.push(uri);
//     } catch (e) {
//       // Replace with your error handling logic
//     }

//     dispatch({ type: 'closeHovers' });
//   };
const [name, setName] = useState<string>("");

const { addFile, toggleCurrentPromptName, toggleShowNewFile } = useShub();

const submit = () => {
  addFile(name)
    toggleCurrentPromptName()
    toggleShowNewFile()
}

const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        submit();
    }
};

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
};

  return (
    <div className={cx('card','floating')}>
      <div className={cx('card-title')}>
        <h2>New File</h2>
      </div>

      <div className={cx("card-content")}>
        <p>Write the name of the new file.</p>
        <input
                    className={cx('input','input--block')}
                    type='text'
                    onKeyDown={handleKeyPress}
                    onChange={handleInputChange}
                    name={name}
                />
      </div>

      <div className={cx("card-action")}>
        <button
          className={cx('button','button--flat',"button--grey")}
          onClick={() => {
            toggleCurrentPromptName()
            toggleShowNewFile()
            }
        }
          aria-label="Cancel"
          title="Cancel"
        >
            Cancel
        </button>
        <button
          className={cx('button','button--flat')}
          onClick={submit}
          aria-label="Create"
          title="Create"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default NewFile;

// interface RootState {
//   isFiles: boolean; // Replace with the actual type of isFiles in your store
//   isListing: boolean; // Replace with the actual type of isListing in your store
// }

"use client"

import React, { useState } from 'react';
import { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './NewFile.module.scss'
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

  return (
    <div className={cx('card','floating')}>
      <div className={cx('card-title')}>
        <h2>{"newFile"}</h2>
      </div>

      <div className={cx("card-content")}>
        <p>{"Translate Function for $t('prompts.newFileMessage')"}</p>
        <input
          className={cx('input','input--block')}
          // Add the necessary logic for focusing on input (if needed)
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
            //   submit(event);
            }
          }}
        //   value={name}
        //   onChange={(event) => setName(event.target.value.trim())}
        />
      </div>

      <div className={cx("card-action")}>
        <button
          className={cx('button','button--flat',"button--grey")}
        //   onClick={() => dispatch({ type: 'closeHovers' })}
          aria-label={"Translate Function for $t('buttons.cancel')"}
          title={"Translate Function for $t('buttons.cancel')"}
        >
          {"cancel"}
        </button>
        <button
          className={cx('button','button--flat')}
        //   onClick={submit}
          aria-label={"Translate Function for $t('buttons.create')"}
          title={"Translate Function for $t('buttons.create')"}
        >
          {"create"}
        </button>
      </div>
    </div>
  );
};

export default NewFile;

interface RootState {
  isFiles: boolean; // Replace with the actual type of isFiles in your store
  isListing: boolean; // Replace with the actual type of isListing in your store
}

import { FC } from 'react';
import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Download.module.scss'
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@/store';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useShub } from '@/app/Provider/Provider';



const cx = classNames.bind(styles);

interface DownloadProps {}

const Download: FC<DownloadProps> = () => {

  const accessToken = Cookies.get('accessToken');
  const { 
   data,
   name,
   toggleShowDownload,
   toggleCurrentPromptName
  } = useShub();

  const formats = {
    zip: 'zip',
    tar: 'tar',
    targz: 'tar.gz',
    tarbz2: 'tar.bz2',
    tarxz: 'tar.xz',
    tarlz4: 'tar.lz4',
    tarsz: 'tar.sz',
  };

  const download =async() => {
    const url = `http://localhost:3001/files/down`;
    const data1 = { cid: data };
    await axios.get(url, {
      params: data1, // Truyền dữ liệu qua query parameters
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, 
      },
      responseType: 'blob' // Yêu cầu dữ liệu dưới dạng blob
    })
    .then((response) => {
      // Kiểm tra nếu yêu cầu thành công
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
    
      const blobUrl = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${name}`; // Tên file
      link.click();
      toggleShowDownload()
      toggleCurrentPromptName()
    })
    .catch((error) => {
      console.error('There has been a problem with your axios operation:', error);
    });
  }
  // const handleClick = (format: string) => {
  //   currentPrompt.confirm(format);
  // };

  return (
    // <div className={cx('card','floating')} id={cx('download')}>
    //   <div className={cx('card-title')}>
    //     {/* <h2>{currentPrompt.$t('prompts.download')}</h2> */}
    //     <h2>download</h2>
    //   </div>

    //   <div className={cx("card-content")}>
    //     {/* <p>{currentPrompt.$t('prompts.downloadMessage')}</p> */}
    //     <p>downloadMessage</p>

    //     {Object.entries(formats).map(([format, ext]) => (
    //       <button
    //         key={format}
    //         className={cx('button','button--block')}
    //         // onClick={() => handleClick(format)}
    //         autoFocus
    //       >
    //         {ext}
    //       </button>
    //     ))}
    //   </div>
    // </div>
    <div className={cx('card','floating')}>
      <div className={cx("card-content")}>
        <p>
          Are you sure you want to download this file?
        </p>
      </div>
      <div className={cx("card-action")}>
        <button
          // onClick={() => toggle()}
          className={cx('button','button--flat',"button--grey")}
          aria-label="Cancel"
          title="Cancel"
        >
          Cancel
        </button>
        <button
          onClick={() => download()}
          className={cx('button','button--flat',"button--red")}
          aria-label="Delete"
          title="Delete"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Download;

"use client"

import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Content.module.scss'
import axios from 'axios';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import Cookies from 'js-cookie';
import { useShub } from '@/app/Provider/Provider';


const cx = classNames.bind(styles);

interface ContentProps {
  data: string;
  type: string;
}

const Content: React.FC<ContentProps> = ({data, type}) => {
  const [src, setSrc] = useState('');
  const accessToken = Cookies.get('accessToken');
  const { 
    handleStream,
    name
  } = useShub();

  useEffect(() => {
    const url = `http://localhost:3001/files/down`;
    
    const data1 = { cid: data };

    axios.get(url, {
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

      if(type == 'pdf'){
        const a = response.data
        const b = new Blob([a], { type: "application/pdf" });
        const blobUrl = URL.createObjectURL(b);
        setSrc(blobUrl)
      }
      
      else{
        const blobUrl = URL.createObjectURL(response.data);
        setSrc(blobUrl)
      }
    
      
    })
    .catch((error) => {
      console.error('There has been a problem with your axios operation:', error);
    });
    
  }, []);


  const open = () => {
    handleStream()
    window.open(src)
  }

  const down = () => {
    handleStream()
    const link = document.createElement('a');
    link.href = src;
    if (type == 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
      link.download = `${name.slice(0, name.lastIndexOf('.'))}.xlsx`; // Tên file
    }
    else if (type == 'vnd.openxmlformats-officedocument.wordprocessingml.document'){
      link.download = `${name.slice(0, name.lastIndexOf('.'))}.docx`; // Tên file
    }
    else if (type == 'x-zip-compressed'){
      link.download = `${name.slice(0, name.lastIndexOf('.'))}.zip`; // Tên file
    }
    else{
      link.download = `${name.slice(0, name.lastIndexOf('.'))}.${type}`; // Tên file
    }
    link.click();
  }


  return (
    <div className={cx('card','floating')}>
      {type == 'mp4' &&
      
        <ReactPlayer
          url={src}
          controls
          width="100%"
          height="100%"
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload', // Tắt chức năng download
              },
            },
          }}
        />
      }

      {(type == 'jpeg' || type == 'png') && 
        (
          <Image
            src={src}
            alt="Streamed Image"
            width={0}
            height={0}
            layout="responsive"
            sizes="100vw"
            style={{ width: 'auto', height: '100%' }} // optional
          />
        )
      }

      
      {(type == 'pdf') && 
        (
         <>
            <div className={cx("card-content")}>
              <p>
                Do you want to open the file in another tab?
              </p>
            </div>
            <div className={cx("card-action")}>
              <button
                onClick={() => handleStream()}
                className={cx('button','button--flat',"button--grey")}
                aria-label="Cancel"
                title="Cancel"
              >
                Cancel
              </button>
              <button
              onClick={() => open()}
              className={cx('button','button--flat',"button--red")}
              aria-label="Open"
              title="Open"
              >
                Open
              </button>
            </div>
          </>
        )
      }

      {(type == 'vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
        || type == 'vnd.openxmlformats-officedocument.wordprocessingml.document'
        || type == 'x-zip-compressed'
      ) && 
        (
         <>
            <div className={cx("card-content")}>
              <p>
              Viewing this file type is not supported yet. Do you want to download this file?
              </p>
            </div>
            <div className={cx("card-action")}>
              <button
                onClick={() => handleStream()}
                className={cx('button','button--flat',"button--grey")}
                aria-label="Cancel"
                title="Cancel"
              >
                Cancel
              </button>
              <button
              onClick={() => down()}
              className={cx('button','button--flat',"button--red")}
              aria-label="Download"
              title="Download"
              >
                Download
              </button>
            </div>
          </>
        )
      }

    </div>
  );
};

export default Content;

"use client"

import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Content.module.scss'
import axios from 'axios';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import Cookies from 'js-cookie';


const cx = classNames.bind(styles);

interface ContentProps {
  data: string;
  type: string;
}

const Content: React.FC<ContentProps> = ({data, type}) => {
  const [src, setSrc] = useState('');
  const accessToken = Cookies.get('accessToken');


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
    
      const blobUrl = URL.createObjectURL(response.data);
      setSrc(blobUrl)
      
    })
    .catch((error) => {
      console.error('There has been a problem with your axios operation:', error);
    });
    
  }, []);

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
    </div>
  );
};

export default Content;

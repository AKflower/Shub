"use client"

import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Content.module.scss'
import axios from 'axios';
import Image from 'next/image';
import ReactPlayer from 'react-player';

const cx = classNames.bind(styles);

interface ContentProps {
  data: string;
  type: string;
}

const Content: React.FC<ContentProps> = ({data, type}) => {
  const [src, setSrc] = useState('');

  useEffect(() => {
    // Replace 'your--Content-url' with the actual URL of your  Content
    const url = `http://localhost:3001/${data}`;

    axios.get(url)
      .then(response => {
        const imageUrl = response.data;
        console.log(imageUrl)
        setSrc(imageUrl);
      })
      .catch(error => console.error('Error fetching image URL:', error));
  }, []);

  return (
    <div className={cx('card','floating')}>
      {type == 'video' &&
      
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

      {(type == 'image') && 
        (
          <Image
            src={src}
            alt="Streamed Image"
            width={0}
            height={0}
            // layout="responsive"
            // sizes="100vw"
            // style={{ width: 'auto', height: '100%' }} // optional
          />
        )
      }
    </div>
  );
};

export default Content;

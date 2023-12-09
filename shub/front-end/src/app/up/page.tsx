
"use client"

import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Copy.module.scss'
import axios from 'axios';

const cx = classNames.bind(styles);

interface CopyProps {}

const Copy: React.FC<CopyProps> = () => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // Replace 'your-image-stream-url' with the actual URL of your image stream
    const imageUrl = 'http://127.0.0.1:8080/ipfs/QmQB6MCZm1UUS3g4ZV2Yu2QEfFCucyC5NFx1uk7Rro2VoV';

    axios.get(imageUrl, { responseType: 'blob' })
      .then(response => {
        const objectURL = URL.createObjectURL(response.data);
        setImageSrc(objectURL);
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
  }, []);

  return (
    <div className={cx('card','floating')}>
      <video
        controls
        preload="auto"
        width="1640"
        height="1264"
        poster="MY_VIDEO_POSTER.jpg"
        data-setup="{}"
        src={imageSrc}
      > 
        </video>
    </div>
  );
};

export default Copy;

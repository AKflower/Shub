import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Upload.module.scss';
import classNames from 'classnames/bind';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { usePathname } from 'next/navigation';
import { useShub } from '@/app/Provider/Provider';

const cx = classNames.bind(styles);

interface UploadProps {}

const Upload: React.FC<UploadProps> = () => {
    const pathname = usePathname()
    const {  toggleShowUpload, handleChange } = useShub();


  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  useEffect(() => {
    const uploadFile = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('user_id');
            const res =  await axios.post(`http://localhost:3001/files/upload/${userId}/${pathname.replaceAll('/','+')}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`, 
                },
            })

            axios.post(`http://localhost:3001/files`, res.data,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
            })
            .then(response => {
                console.log('File uploaded:', response.data);
                handleChange()
                toggleShowUpload()


            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });
        }
    };
    uploadFile()
  },[selectedFile])
  

  const triggerFileInput = () => {
    // Kích thích sự kiện click của input file
    const fileInput = document.getElementById('upload-input');
    fileInput?.click();
  };

  return (
    <div className={cx('card', 'floating')}>
      <div className={cx('card-title')}>
        <h2>Upload</h2>
      </div>

      <div className={cx('card-content')}>
        <p>Select an option to upload.</p>
        {/* Thẻ input file ẩn */}
        <input
          type="file"
          id="upload-input"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>

      <div className={cx('card-action', 'full')}>
        {/* Nhấp vào div này sẽ kích thích sự kiện click của input file */}
        <div onClick={triggerFileInput} className={cx('action')}>
          <i className={cx('material-icons')}>
            <InsertDriveFileIcon className={cx('icon')} />
          </i>
          <div className={cx('title')}>File</div>
        </div>
      </div>
    </div>
  );
};

export default Upload;

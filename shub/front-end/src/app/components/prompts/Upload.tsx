import { FC, useEffect, useState, useRef } from 'react';
import styles from './Upload.module.scss'
import classNames from 'classnames/bind';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';

// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { RootState } from '@/redux/store';

const cx = classNames.bind(styles);

interface UploadProps { }

const Upload: React.FC<UploadProps> = () => {
    // const history = useHistory();
    // const dispatch = useDispatch();

    // const uploadFile = () => {
    //     document.getElementById("upload-input").value = "";
    //     document.getElementById("upload-input").click();
    // }

    // const uploadFolder = () => {
    //     document.getElementById("upload-folder-input").value = "";
    //     document.getElementById("upload-folder-input").click();
    // }

    return (
        <div className={cx('card','floating')}>
            <div className={cx('card-title')}>
                <h2>Upload</h2>
            </div>

            <div className={cx("card-content")}>
                <p>Select an option to upload.</p>
            </div>

            <div className={cx("card-action",'full')}>
                <div 
                // onClick={uploadFile}
                    className={cx("action")}>
                    <i className={cx('material-icons')}><InsertDriveFileIcon className={cx('icon')}/></i>
                    <div className={cx('title')}>File</div>
                </div>
                <div 
                // onClick={uploadFolder}
                    className={cx("action")}>
                                        <i className={cx('material-icons')}><FolderIcon className={cx('icon')}/></i>

                    <div className={cx('title')}>Folder</div>
                </div>
            </div>
        </div>
    )
}

export default Upload;
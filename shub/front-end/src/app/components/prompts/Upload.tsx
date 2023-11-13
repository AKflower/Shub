import { FC, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '@/redux/store';

interface UploadProps { }

const Upload: React.FC<UploadProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const uploadFile = () => {
        document.getElementById("upload-input").value = "";
        document.getElementById("upload-input").click();
    }

    const uploadFolder = () => {
        document.getElementById("upload-folder-input").value = "";
        document.getElementById("upload-folder-input").click();
    }

    return (
        <div className='card floating'>
            <div className='card-title'>
                <h2>Prompt Upload</h2>
            </div>

            <div className='card-content'>
                <p>Upload Message</p>
            </div>

            <div className='card-action full'>
                <div onClick={uploadFile}
                    className='action'>
                    <i className='material-icons'>insert_drive_file</i>
                    <div className='title'>File</div>
                </div>
                <div onClick={uploadFolder}
                    className='action'>
                    <i className='material-icons'>folder</i>
                    <div className='title'>Folder</div>
                </div>
            </div>
        </div>
    )
}

export default Upload;
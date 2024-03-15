import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Upload.module.scss';
import classNames from 'classnames/bind';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { usePathname } from 'next/navigation';
import { useShub } from '@/app/Provider/Provider';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const cx = classNames.bind(styles);

interface UploadProps {}

const Upload: React.FC<UploadProps> = () => {
  const pathname = usePathname()
  const {  toggleShowUpload, handleChange, toggleCurrentPromptName } = useShub();
  const userId = Cookies.get('userId');
  const accessToken = Cookies.get('accessToken');
  const [directories, setDirectories] = useState<string[]>([]);
  const [trans, setTrans] = useState('');
  const [hide, setHide] = useState('');
  const [files, setFiles] = useState<{file: File, path: string}[]>([]);


  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  useEffect(() => {
    const uploadFile = async () => {

        if (selectedFile) {
          toggleShowUpload()

          const load = toast.loading('Loading...')

          const data = {
            userId: userId,
            filePath: pathname
          }
            const formData = new FormData();
            formData.append('file', selectedFile);
            await axios.post(`http://localhost:3001/files/new`, formData, {
                params: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`, 
                },
            })
            .then(response => {
                toast.success('File Uploaded')
                toast.dismiss(load);
                handleChange()
                toggleCurrentPromptName() 


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

  const handleDirectorySelection = async () => {
    if ('showDirectoryPicker' in window) {
      try {
        const directoryHandle = await (window as any).showDirectoryPicker();
        const directories = await getDirectoriesInDirectory(directoryHandle, '/'+directoryHandle.name);
        directories.push('/'+directoryHandle.name);
        await setDirectories(directories);
        const files = await getFilesInDirectory(directoryHandle, '/'+directoryHandle.name);
        await setFiles(files);
        await setTrans('1')
        await toast.loading('Loading...')
        await setHide('hide')
        // await toggleShowUpload()

      } catch (err) {
        console.error(err);
      }
    } else {
      alert('Your browser does not support the showDirectoryPicker API');
    }
    
  };

  const getDirectoriesInDirectory = async (directoryHandle: any, path: string): Promise<string[]> => {
    const directories: string[] = [];

    for await (const entry of directoryHandle.values()) {
      const newPath = `${path}/${entry.name}`;
      if (entry.kind === 'directory') {
        directories.push(newPath);
        const subDirectoryDirectories = await getDirectoriesInDirectory(entry, newPath);
        directories.push(...subDirectoryDirectories);
      }
    }
    return directories;
  };

  const getFilesInDirectory = async (directoryHandle: any, path: string): Promise<{file: File, path: string, buffer: ArrayBuffer}[]> => {
    const files: {file: File, path: string, buffer: ArrayBuffer}[] = [];
    for await (const entry of directoryHandle.values()) {
      const newPath = `${path}/${entry.name}`;
      if (entry.kind === 'file') {
        const file = await entry.getFile();
        const buffer = await file.arrayBuffer();
        files.push({file, path: newPath, buffer});
      } else if (entry.kind === 'directory') {
        const subDirectoryFiles = await getFilesInDirectory(entry, newPath);
        files.push(...subDirectoryFiles);
      }
    }
    return files;
  };

  useEffect(() => {
    const uploadFile = async (selectedFile: File, path: string) => {
        
          const data = {
            userId: userId,
            filePath: pathname+path.slice(0, path.lastIndexOf('/'))
          }
            const formData = new FormData();
            formData.append('file', selectedFile);
            await axios.post(`http://localhost:3001/files/new`, formData, {
                params: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`, 
                },
            })
            .then(response => {
                console.log('File uploaded:', response.data);
            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });

            
        
    };
    const uploadFolder = async (name: string, path: string) => {
      const folderData = {   
        folder_name: name,
        folder_path: pathname + path.slice(0, path.lastIndexOf('/')),
        user_id: userId, 
      };
    
      await axios.post(`http://localhost:3001/folders/new`, folderData,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, 
        },
      })
      .then(response => {
        console.log('Folder created:', response.data);

      })
      .catch(error => {
        console.error('Error creating folder:', error);
      });

  
  };
  const uploadFoldersSequentially = async () => {
    for (const folder of directories) {
      console.log(folder)
        await uploadFolder(folder.slice(folder.lastIndexOf('/')+1, folder.length), folder);

    }
    if (!files[0] && directories[0]){
      await toast.dismiss();
      await toast.success('Folder Uploaded')
      await toggleShowUpload() 
      await handleChange()
      await toggleCurrentPromptName()
    }
  
  };


    const uploadFilesSequentially = async () => {
      for (const file of files) {
          await uploadFile(file.file, file.path);
          if(file == files[files.length - 1]) {
            handleChange()
            toggleCurrentPromptName()
            toggleShowUpload()
            toast.dismiss();
            toast.success('Folder Uploaded')
          }

      }
    };
    const uploadAllSequentially = async () => {
      await uploadFoldersSequentially();
      await uploadFilesSequentially();
     

    }

    uploadAllSequentially();

    
  },[trans])

  return (
    <>
    {!hide && (
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
        <div onClick={handleDirectorySelection} className={cx('action')}>
          <i className={cx('material-icons')}>
            <InsertDriveFileIcon className={cx('icon')} />
          </i>
          <div className={cx('title')}>Folder</div>
        </div>
      </div>
      <div className={cx('cancel')}>
        <button
          className={cx('button','button--flat',"button--grey")}
          onClick={() => {toggleShowUpload()
          toggleCurrentPromptName()}}
          aria-label="Cancel"
          title="Cancel"
        >
        Cancel
        </button>
      </div>
      </div>
      
    )}
    </>
    
    
  );
};

export default Upload;

// Trong file Sidebar.js (hoặc Sidebar.jsx nếu sử dụng JSX)
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './sidebar.module.scss';
import FolderIcon from '@mui/icons-material/Folder';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import LogoutIcon from '@mui/icons-material/Logout';


const Sidebar = () => {
  return (
    <nav className="">
        <div className="">
            <button
                className={styles.action}
                
                aria-label="My Files"
                title="My Files"
            >
                <FolderIcon />
                <span className={styles.title}>My Files</span>
            </button>
        </div>
        <div className="">
            <button
                className={styles.action}
               
                aria-label="My Files"
                title="My Files"
            >
                <CreateNewFolderIcon />
                <span className={styles.title}>New Folder</span>
            </button>
            <button
                className={styles.action}
               
                aria-label="My Files"
                title="My Files"
            >
                <NoteAddIcon />
                <span className={styles.title}>New File</span>
            </button>
        </div>
        <div className="">
            <button
                className={styles.action}
               
                aria-label="My Files"
                title="My Files"
            >
                <SettingsApplicationsIcon />
                <span className={styles.title}>Settings</span>
            </button>
            <button
                className={styles.action}
               
                aria-label="My Files"
                title="My Files"
            >
                <LogoutIcon />
                <span className={styles.title}>Logout</span>
            </button>
        </div>
    </nav>
  );
};

export default Sidebar;

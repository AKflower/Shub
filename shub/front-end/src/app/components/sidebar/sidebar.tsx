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
    <nav className={styles.nav}>
        <div className={styles.container}>
            <Link href="/" >
            <button
                className={styles.action}
                
                aria-label="My Files"
                title="My Files"
            >
                <FolderIcon />
                <span className={styles.title}>My Files</span>
            </button>
            </Link>
           
        </div>
        <div className={styles.container}>
            <Link href="">
                <button
                className={styles.action}
               
                aria-label="New Folder"
                title="New Folder"
            >
                <CreateNewFolderIcon />
                <span className={styles.title}>New Folder</span>
            </button>
            </Link>
            <Link href="">
            <button
                className={styles.action}
               
                aria-label="New File"
                title="New File"
            >
                <NoteAddIcon />
                <span className={styles.title}>New File</span>
            </button>
            </Link>
           
        </div>
        <div className={styles.container}>
            <Link href="/setting/profile">
            <button
                className={styles.action}
               
                aria-label="Settings"
                title="Settingse"
            >
                <SettingsApplicationsIcon />
                <span className={styles.title}>Settings</span>
            </button>
            </Link>
            <Link href="">
            <button
                className={styles.action}
               
                aria-label="Logout"
                title="Logout"
            >
                <LogoutIcon />
                <span className={styles.title}>Logout</span>
            </button>
            </Link>
            
        </div>
    </nav>
  );
};

export default Sidebar;

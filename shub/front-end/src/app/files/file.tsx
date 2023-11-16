import styles from './file.module.scss'
import Card from "./card/card";
import FileSection from './fileSection/fileSection';
import FolderSection from './folderSection/folderSection';
export default function File () {
    const files = [
        {
          id: 1,
          name: 'Math',
          size: '15KB',
          date: '7 days ago',
        },
        {
          id: 2,
          name: 'Physics',
          size: '8KB',
          date: '12 days ago',
        },
        {
          id: 3,
          name: 'Chemistry',
          size: '20KB',
          date: '5 days ago',
        },
        {
          id: 4,
          name: 'Biology',
          size: '12KB',
          date: '10 days ago',
        },
        {
          id: 5,
          name: 'History',
          size: '18KB',
          date: '3 days ago',
        },
        {
          id: 6,
          name: 'Literature',
          size: '25KB',
          date: '8 days ago',
        },
        {
          id: 7,
          name: 'Geography',
          size: '14KB',
          date: '6 days ago',
        },
        {
          id: 8,
          name: 'Computer Science',
          size: '22KB',
          date: '9 days ago',
        },
        {
          id: 9,
          name: 'Art',
          size: '10KB',
          date: '15 days ago',
        },
        {
          id: 10,
          name: 'Music',
          size: '30KB',
          date: '4 days ago',
        },
      ];
    const folders = [
        {
          id: 1,
          name: 'ppl',
          children: [],
          date: '10 days ago',
        },
        {
          id: 2,
          name: 'Folder 31',
          children: [],
          date: '10 days ago',
        },
        {
          id: 3,
          name: 'Folder 44',
          children: [],
          date: '10 days ago',
        },
        {
          id: 4,
          name: 'Folder 12',
          children: [],
          date: '10 days ago',
        },
        {
          id: 5,
          name: 'Folder 88',
          children: [],
          date: '10 days ago',
        },
        {
          id: 6,
          name: 'Folder 56',
          children: [],
          date: '10 days ago',
        },
        {
          id: 7,
          name: 'Folder 73',
          children: [],
          date: '10 days ago',
        },
        {
          id: 8,
          name: 'Folder 5',
          children: [],
          date: '10 days ago',
        },
        {
          id: 9,
          name: 'Folder 91',
          children: [],
          date: '10 days ago',
        },
        {
          id: 10,
          name: 'Folder 23',
          children: [],
          date: '10 days ago',
        },
      ];
    
      

    return (
        <div className={styles.container}>
            <FolderSection folders={folders}/>
            <FileSection files={files}/>
        </div>
    )
}
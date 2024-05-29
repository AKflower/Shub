"use client"
import styles from './folderSection.module.scss'
import Card from '../card/card'
import { useShub } from '@/app/Provider/Provider';
import classNames from 'classnames/bind';
import { usePathname } from 'next/navigation';

const cx = classNames.bind(styles);


interface FoldersProps {
    folder_id: string,
  folder_name: string,
  folder_path: string,
  owner: string,
  created_date: string,
  updated_date: string,
  isFavourite: boolean,
  isDelete: boolean,
  share: string[],
  user_id:string,

}

export default function FolderSection ({folders} : {folders:FoldersProps[]})  {
    const { 
        selected, 
        handleSelect, 
        handleNavigation, 
        type, 
        handleType,
        handleIsFavourite,
        handleIsDelete,
        handleShare,
        handleInfoFolder,
        handleData
    } = useShub();
    const pathname = usePathname()
    const bo1 = pathname.replace('/setting/org/', '')
    const bo2 = bo1.slice(0, bo1.indexOf('/'))
    
    return (
            <div className={styles.part}>
                <h3 className={styles.title}>Folders</h3>
                <div 
                className={cx('grid-1')}
                >
                    {folders.map((folder) => (
                        
                        <div key={folder.folder_id}
                        onClick={() => {
                            handleSelect(folder.folder_id, 'folder')
                            handleType('folder')
                            if(folder.isFavourite == undefined) {
                                handleIsFavourite(false)
                            }
                            else {
                                handleIsFavourite(folder.isFavourite)
                            }

                            if(folder.isDelete == undefined) {
                                handleIsDelete(false)
                            }
                            else {
                                handleIsDelete(folder.isDelete)
                            }

                            handleShare(folder.share)
                            handleInfoFolder(folder)
                            handleData('', 'folder', false) 
                            
                        }}
                        onDoubleClick={() => {
                            handleNavigation('/setting/org'+ '/' + bo2 + folder.folder_path.replace('/files','/view') + '/' + folder.folder_name)
                        }}
                        >
                            <Card type1="folder" key={folder.folder_id.slice(0, folder.folder_id.indexOf('_'))} name={folder.folder_name} date={folder.updated_date} selected={selected==folder.folder_id && type=='folder'}/>

                        </div>
                        
                    ))}
                
                </div>
                
            </div>
    )
}

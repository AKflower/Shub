"use client"
// Breadcrumbs.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import styles from './breadcrumbs.module.scss'
import Cookies from 'js-cookie';

interface BCFSItem {
  name: string;
  url: string;
}

interface BCFSProps {
  items: BCFSItem[];
}

const BCFS =() => {
  const pathname = usePathname();
  let parts = pathname.split("/").filter(Boolean);
  const folderNS = Cookies.get('foldersS');
  let f = 0
  const path = pathname.replace('shared', 'files')
  if(folderNS){
    const folders = JSON.parse(folderNS);

    for(let i = 0; i < parts.length; i++){
      for(let j = 0; j < folders.length; j++){
        if (folders[j].folder_name == parts[i] && (folders[j].folder_path + '/' + folders[j].folder_name) == path) f = i

      }
    }
  }
  
  parts.splice(1,f-1)

 
  let routes = parts.map((part,index) => {
    
      let name = decodeURIComponent(part);
      let path = `/${parts.slice(0,index+1).join("/")}`
      return {name,path};
  
    
  })
  
  return (
    <div className={styles.breadcrumbs}>
        
       
        {routes.map((route,index) => (
            
            <div className={styles.item} key={index}>
              <span className={styles.name}>{route.name!='shared' ? 
                <Link href={route.path}>
                {route.name}
                </Link>
                : 
                <Link href='/shared'>
                <HomeIcon />
                </Link> }
              </span>
              
              {index==routes.length-1 ? '': <NavigateNextIcon/>}
            </div>
             

          
        ))}
        
    </div>
  );
};

export default BCFS;

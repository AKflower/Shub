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
  const folderNS = Cookies.get('folderNS');
  let f = 0
  for(let i = 0; i < parts.length; i++){
    if (folderNS == parts[i]) f = i
  }
  parts.splice(1,f - 1)
 
  let routes = parts.map((part,index) => {
    
      let name = decodeURIComponent(part);
      let path = `/${parts.slice(0,index+1).join("/")}`
      return {name,path};
  
    
  })
  // const name = pathname.split("/");
  // name.splice(0,2);
  console.log(routes)
  
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

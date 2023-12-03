"use client"
// Breadcrumbs.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import styles from './breadcrumbs.module.scss'

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs =() => {
  const pathname = usePathname();
  let parts = pathname.split("/").filter(Boolean);
  let routes = parts.map((part,index) => {
    
      let name = decodeURIComponent(part);
      let path = `/${parts.slice(0,index+1).join("/")}`
      return {name,path};
  
    
  })
  console.log(routes);
  // const name = pathname.split("/");
  // name.splice(0,2);
  
  return (
    <div className={styles.breadcrumbs}>
        
       
        {routes.map((route,index) => (
            
            <div className={styles.item} key={index}>
              <span className={styles.name}>{route.name!='files' ? 
                <Link href={route.path}>
                {route.name}
                </Link>
                : 
                <Link href='/files'>
                <HomeIcon />
                </Link> }
              </span>
              
              {index==routes.length-1 ? '': <NavigateNextIcon/>}
            </div>
             

          
        ))}
        
    </div>
  );
};

export default Breadcrumbs;

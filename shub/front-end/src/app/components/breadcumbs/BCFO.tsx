"use client"
// Breadcrumbs.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import styles from './breadcrumbs.module.scss'

interface BCFVItem {
  name: string;
  url: string;
}

interface BCFVProps {
  items: BCFVItem[];
}

const BCFV =() => {
  const pathname = usePathname();
  const bo1 = pathname.replace('/setting/org/user_', '')
  const bo2 = bo1.slice(bo1.indexOf('/'))
  const bo3 = pathname.replace('/setting/org/', '')
  const bo4 = bo3.slice(0, bo3.indexOf('/'))
  const bo5 = `/setting/org/${bo4}/view` 
  let parts = bo2.split("/").filter(Boolean);
  let routes = parts.map((part,index) => {
      let name = decodeURIComponent(part);
      let path = `/${parts.slice(0,index+1).join("/")}`
      return {name,path};
  })

  return (
    <div className={styles.breadcrumbs}>
        {routes.map((route,index) => (
            <div className={styles.item} key={index}>
              <span className={styles.name}>{route.name != 'view' ? 
                <Link href={route.path}>
                {route.name}
                </Link>
                : 
                <Link href={bo5}>
                <HomeIcon />
                </Link> }
              </span>
              {index==routes.length-1 ? '': <NavigateNextIcon/>}
            </div>
        ))}
        
    </div>
  );
};

export default BCFV;

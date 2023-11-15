"use client"
import { FC, ReactNode  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { logoURL } from '@/utils/constants';
import Action from './Action';
import styles from './HeaderBar.module.scss'

interface HeaderBarProps {
  showLogo?: boolean;
  showMenu?: boolean;
  children?: ReactNode;
}

const HeaderBar: FC<HeaderBarProps> = ({ showLogo, showMenu, children }) => {
//   const dispatch = useDispatch();
//   const currentPromptName = useSelector((state: any) => state.currentPromptName);


//   const openSidebar = () => {
//     dispatch({ type: 'showHover', payload: 'sidebar' });
//   };

  return (
    <header>
      {showLogo !== undefined && <img src='/file.png' />}
      {showMenu !== undefined && (
        <Action
                  icon="menu"
                  label={'Toggle Sidebar'}
                //   onAction={openSidebar}
                  className={styles.menuButton} 
                  counter={0}        />
      )}

      {children}

      {/* <div id="dropdown" className={currentPromptName === 'more' ? 'active' : ''}>
        {children}
      </div> */}

      {children && (
        <Action
                  id={styles.more}
                  icon="more_vert"
                  label={'More'}
                //   onAction={} 
                  counter={0}        />
      )}

      {/* {currentPromptName === 'more' && (
        <div className="overlay" onClick={() => dispatch({ type: 'closeHovers' })} />
      )} */}
    </header>
  );
};



export default HeaderBar;

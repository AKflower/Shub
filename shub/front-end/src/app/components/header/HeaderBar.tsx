// components/HeaderBar.tsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';

import Action from './Action';
import { logoURL } from '@/utils/constants';

interface HeaderBarProps {
  showLogo?: boolean;
  showMenu?: boolean;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ showLogo, showMenu }) => {
  const dispatch = useDispatch();
  const currentPromptName = useSelector((state: RootState) => state.currentPromptName);

  const openSidebar = () => {
    dispatch({ type: 'SHOW_HOVER', payload: 'sidebar' });
  };

  return (
    <header>
      {showLogo !== undefined && <img src={logoURL} alt="Logo" />}
      
      {showMenu !== undefined && (
        <Action
          className="menu-button"
          icon="menu"
          label="buttons.toggleSidebar"
          action={openSidebar} id={''} counter={0} show={false}        />
      )}

      {/* Assuming you're using React.Fragment for slots */}
      <>{children}</>

      <div id="dropdown" className={currentPromptName === 'more' ? 'active' : ''}>
        {/* Assuming you're using React.Fragment for slot name "actions" */}
        <>{children}</>
      </div>

      {children && (
        <Action
          id="more"
          icon="more_vert"
          label="buttons.more"
          action={() => dispatch({ type: 'SHOW_HOVER', payload: 'more' })} className={''} counter={0} show={false}        />
      )}

      <div
        className="overlay"
        style={{ display: currentPromptName === 'more' ? 'block' : 'none' }}
        onClick={() => dispatch({ type: 'CLOSE_HOVERS' })}
      />
    </header>
  );
};

export default HeaderBar;

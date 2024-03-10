import React, { useEffect, useState } from 'react';
import styles from './DropDown.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Option {
  id: string;
  name: string;
  path: string;
  type: string;
}

interface DropdownProps {
  options: Option[];
  onSelect: (option: Option) => void;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (!isOpen) setIsOpen(true);
  };
  const handleTrue = () => {
    setIsOpen(true);
  };

  const handleLeave = () => {
    setIsOpen(false);
  };


  const handleSelect = (option: Option) => {
    onSelect(option);
    setIsOpen(false);
  };


  return (
    <div 
      className={cx('container')} 
      onSelect={handleTrue} 
      onClick={handleToggle} 
      onMouseLeave={handleLeave}
    >
     
        {children}
      
      {isOpen && options[0] && (

          <ul className={cx('res')}>
            {options.map((option) => (
              <li className={cx('obo')} key={option.id} onClick={() => handleSelect(option)}>
                <div className={cx('left')}>
                  {option.type == 'folder' ? 
                      <img src="/folder.svg" alt="" />
                    : option.type == 'jpeg' || option.type == 'png'  ?
                      <img src="/img.svg" alt="" />
                    : option.type == 'mp4' ?
                      <img src="/video.svg" alt="" />
                    : option.type == 'pdf' ?
                      <img src="/pdf.svg" alt="" />
                    : option.type == 'vnd.openxmlformats-officedocument.wordprocessingml.document' ?
                      <img src="/word.svg" alt="" />
                    : <img src="/un.svg" alt="" />
                  }
                  <span className={cx('name')}>{option.name}</span>

                </div>
                  
                
                <span className={cx('path')}>{option.path}</span>
              </li>
            ))}
          </ul>
      ) }
    </div>
  );
};

export default Dropdown;
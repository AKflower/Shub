import React, { useEffect, useState } from 'react';
import styles from './DropDown.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Option {
  file_id: string;
  file_name: string;
  file_path: string;
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
              <li className={cx('obo')} key={option.file_id} onClick={() => handleSelect(option)}>
                <span className={cx('name ')}>{option.file_name}</span>
                <span>{option.file_path}</span>
              </li>
            ))}
          </ul>
      )}
    </div>
  );
};

export default Dropdown;
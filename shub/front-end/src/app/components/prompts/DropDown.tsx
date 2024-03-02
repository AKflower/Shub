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

  // useEffect(() => {
  //   if (options.length > 0) setIsOpen(true)
  //   else setIsOpen(false)
  // // console.log(options.length)
  // },[options])

  return (
    <div 
      className={cx('container')} 
      onSelect={handleTrue} 
      onClick={handleToggle} 
      onMouseLeave={handleLeave}
    >
     
        {children}
      
      {isOpen && (

        // <div >
          <ul className={cx('res')}>
            {options.map((option) => (
              <li className={cx('obo')} key={option.file_id} onClick={() => handleSelect(option)}>
                <span className={cx('name ')}>{option.file_name}</span>
                <span>{option.file_path}</span>
              </li>
            ))}
          </ul>
        // </div>
      )}
    </div>
  );
};

export default Dropdown;
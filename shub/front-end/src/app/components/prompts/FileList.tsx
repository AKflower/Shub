import { FC, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FileList.module.scss'
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@/store';
// import { files as api } from '@/api';
// import url from '@/utils/url';

const cx = classNames.bind(styles);


interface FileListProps {
  updateSelected: () => void;
}

interface Item {
  name: string;
  url: string;
}

const FileList: FC<FileListProps> = ({ updateSelected }) => {
 
  const [items, setItems] = useState<Item[]>([{name: 'danddddddddddddddddddddddddddddddddddddddddddddddddddddds', url: '/filesddddddddddddddddddddddddddddddddddddddddddddddd '}, {name: '2', url: '2'}, {name: '2', url: '2'}, {name: '2', url: '2'}, {name: '2', url: '2'}, {name: '2', url: '2'}, {name: '2', url: '2'}, {name: '2', url: '2'}]);


  return (
    <div>
      <ul className={cx('file-list')}>
        {items.map((item) => (
          <li
            className={cx('li')}
            key={item.name}
            role="button"
            tabIndex={0}
            aria-label={item.name}
          >
            <span className={cx('name')}>
              {item.name}
            </span>
            {/* <span className={cx('url')}>
              {item.url}
            </span> */}
          </li>
        ))}
      </ul>

      {/* <p>
        {`Currently Navigating: `}
        <code>{nav}</code>.
      </p> */}
    </div>
  );
};

export default FileList;

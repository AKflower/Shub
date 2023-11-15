"use client"

import React from 'react';
import { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Info.module.scss'
// import { useSelector } from 'react-redux';
// import { filesize } from '@/utils';
// import moment from 'moment';
// import { files as api } from '@/api';

const cx = classNames.bind(styles);

interface InfoProps {
  // Add any additional props if needed
}

const Info: FC<InfoProps> = () => {
  // const req = useSelector((state: RootState) => state.req);
  // const selected = useSelector((state: RootState) => state.selected);
  // const selectedCount = useSelector((state: RootState) => state.selectedCount);
  // const isListing = useSelector((state: RootState) => state.isListing);

  // const humanSize = () => {
  //   if (selectedCount === 0 || !isListing) {
  //     return filesize(req.size);
  //   }

  //   let sum = 0;

  //   for (const index of selected) {
  //     sum += req.items[index].size;
  //   }

  //   return filesize(sum);
  // };

  // const humanTime = () => {
  //   if (selectedCount === 0) {
  //     return moment(req.modified).fromNow();
  //   }

  //   return moment(req.items[selected[0]].modified).fromNow();
  // };

  // const modTime = () => {
  //   return new Date(Date.parse(req.modified)).toLocaleString();
  // };

  // const name = () => {
  //   return selectedCount === 0 ? req.name : req.items[selected[0]].name;
  // };

  // const dir = () => {
  //   return selectedCount > 1 || (selectedCount === 0 ? req.isDir : req.items[selected[0]].isDir);
  // };

  // const checksum = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, algo: string) => {
  //   event.preventDefault();

  //   let link;

  //   if (selectedCount) {
  //     link = req.items[selected[0]].url;
  //   } else {
  //     link = '/'; // Replace with the actual route path
  //   }

  //   try {
  //     const hash = await api.checksum(link, algo);
  //     // eslint-disable-next-line
  //     (event.target as HTMLAnchorElement).innerHTML = hash;
  //   } catch (e) {
  //     // Replace with your error handling logic
  //   }
  // };
  let selectedCount = 1

  return (
    <div className={cx('card','floating')}>
      <div className={cx('card-title')}>
        <h2>{"Translate Function to Replace $t('prompts.fileInfo')"}</h2>
      </div>

      <div className={cx("card-content")}>
        <p>{selectedCount > 1 ? `Translate Function for $t('prompts.filesSelected', { count: ${selectedCount} })` : null}</p>

        <p className={cx("break-word")} style={{ display: selectedCount < 2 ? 'block' : 'none' }}>
          <strong>{"displayName"}</strong> {/*name()*/}asd
        </p>
        
        {/* Add similar lines for other items */}
      </div>

      <div className={cx("card-action")}>
        <button
          type="submit"
          onClick={() => {
            // Replace with the actual dispatch function from your store
            // Example: dispatch({ type: 'closeHovers' });
          }}
          className={cx('button','button--flat')}
          aria-label="Translate Function for $t('buttons.ok')"
          title="Translate Function for $t('buttons.ok')"
        >
          OK
        </button>
        
        
      </div>
    </div>
  );
};

export default Info;

interface RootState {
  req: any; // Replace with the actual type of req in your store
  selected: number[]; // Replace with the actual type of selected in your store
  selectedCount: number; // Replace with the actual type of selectedCount in your store
  isListing: boolean; // Replace with the actual type of isListing in your store
}

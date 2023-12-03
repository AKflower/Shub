"use client"

import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Copy.module.scss'
import FileList from './FileList';

const cx = classNames.bind(styles);

interface CopyProps {}

const Copy: React.FC<CopyProps> = () => {
  
  return (
    <div className={cx('card','floating')}>
      <div className={cx('card-title')}>
        <h2>Prompts Copy</h2>
      </div>

      <div className={cx("card-content")}>
        <p>Prompts Copy Message</p>
        {/* Assuming you have a FileList component */}
        <FileList updateSelected={function (val: string | null): void {
          throw new Error('Function not implemented.');
        } } />
      </div>

      <div
        className={cx("card-action")}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        {/* {user.perm.create && ( */}
          <button
            className={cx('button','button--flat')}
            // onClick={() => this.refs.fileList.createDir()}
            aria-label="New Folder"
            title="New Folder"
            style={{ justifySelf: 'left' }}
          >
            <span>New Folder</span>
          </button>
        {/* )} */}
        <div>
          <button
            className={cx('button','button--flat',"button--grey")}
            // onClick={() => dispatch({ type: 'CLOSE_HOVERS' })}
            aria-label="Cancel"
            title="Cancel"
          >
            Cancel
          </button>
          <button
            className={cx('button','button--flat')}

            // onClick={copy}
            aria-label="Copy"
            title="Copy"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Copy;

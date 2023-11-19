"use client"

import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Copy.module.scss'
import FileList from './FileList';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/redux/store';
// import { useHistory } from 'react-router-dom';
// import { files as api } from '@/api';
// import buttons from '@/utils/buttons';
// import * as upload from '@/utils/upload';

const cx = classNames.bind(styles);

interface CopyProps {}

const Copy: React.FC<CopyProps> = () => {
  // const history = useHistory();
  // const dispatch = useDispatch();
  // const { req, selected, user } = useSelector((state: RootState) => ({
  //   req: state.req,
  //   selected: state.selected,
  //   user: state.user,
  // }));

  // const [current, setCurrent] = useState<string>(window.location.pathname);
  // const [dest, setDest] = useState<string | null>(null);

  // useEffect(() => {
  //   setCurrent(window.location.pathname);
  // }, []);

  // const copy = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   event.preventDefault();
  //   let items: any[] = [];

  //   // Create a new promise for each file.
  //   for (let item of selected) {
  //     items.push({
  //       from: req.items[item].url,
  //       to: dest + encodeURIComponent(req.items[item].name),
  //       name: req.items[item].name,
  //     });
  //   }

  //   let action = async (overwrite: boolean, rename: boolean) => {
  //     buttons.loading('copy');

  //     try {
  //       await api.copy(items, overwrite, rename);

  //       buttons.success('copy');

  //       if (history.location.pathname === dest) {
  //         dispatch({ type: 'SET_RELOAD', payload: true });
  //         return;
  //       }

  //       history.push(dest as string);
  //     } catch (e) {
  //       buttons.done('copy');
  //       // Assuming you have a showError function to display errors
  //       // this.$showError(e);
  //       console.error(e);
  //     }
  //   };

  //   if (history.location.pathname === dest) {
  //     dispatch({ type: 'CLOSE_HOVERS' });
  //     action(false, true);
  //     return;
  //   }

  //   let dstItems = (await api.fetch(dest as string)).items;
  //   let conflict = upload.checkConflict(items, dstItems);

  //   let overwrite = false;
  //   let rename = false;

  //   if (conflict) {
  //     // Assuming you have a showHover function for modals
  //     dispatch({
  //       type: 'SHOW_HOVER',
  //       payload: {
  //         prompt: 'replace-rename',
  //         confirm: (event: { preventDefault: () => void; }, option: string) => {
  //           overwrite = option === 'overwrite';
  //           rename = option === 'rename';

  //           event.preventDefault();
  //           dispatch({ type: 'CLOSE_HOVERS' });
  //           action(overwrite, rename);
  //         },
  //       },
  //     });

  //     return;
  //   }

  //   action(overwrite, rename);
  // };

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

// components/Delete.tsx

import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Delete.module.scss'
import { useShub } from '@/app/Provider/Provider';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/store';
// import { useRouter } from 'next/router';

// import { files as api } from '@/api';
// import buttons from '@/utils/buttons';

const cx = classNames.bind(styles);

interface DeleteProps {}

const Delete: React.FC<DeleteProps> = () => {
  // const dispatch = useDispatch();
  // const router = useRouter();
  // const { isListing, selectedCount, currentPrompt, req, selected } = useSelector(
  //   (state: RootState) => ({
  //     isListing: state.isListing,
  //     selectedCount: state.selectedCount,
  //     currentPrompt: state.currentPrompt,
  //     req: state.req,
  //     selected: state.selected,
  //   })
  // );

  // useEffect(() => {
  //   // Assuming you need to do something on component mount
  //   // If not, you can remove this useEffect block
  // }, []);

  // const closeHovers = () => {
  //   dispatch({ type: 'CLOSE_HOVERS' });
  // };

  // const submit = async () => {
  //   buttons.loading('delete');

  //   try {
  //     if (!isListing) {
  //       await api.remove(router.asPath);
  //       buttons.success('delete');

  //       currentPrompt?.confirm();
  //       closeHovers();
  //       return;
  //     }

  //     closeHovers();

  //     if (selectedCount === 0) {
  //       return;
  //     }

  //     let promises: Promise<any>[] = [];
  //     for (let index of selected) {
  //       promises.push(api.remove(req.items[index].url));
  //     }

  //     await Promise.all(promises);
  //     buttons.success('delete');
  //     dispatch({ type: 'SET_RELOAD', payload: true });
  //   } catch (e) {
  //     buttons.done('delete');
  //     // Assuming you have a showError function to display errors
  //     // this.$showError(e);
  //     console.error(e);
  //     if (isListing) dispatch({ type: 'SET_RELOAD', payload: true });
  //   }
  // };
  const { selected, delFolder, toggleCurrentPromptName, toggleShowDelete } = useShub();
  const toggle = () => {
    toggleCurrentPromptName()
    toggleShowDelete()
  }
  const submit = () => {
    delFolder(selected)
    toggle()
  }

  let selectedCount = 1

  return (
    <div className={cx('card','floating')}>
      <div className={cx("card-content")}>
        <p>
          {/* {selectedCount === 1 ? 'Prompts delete message single' : `Prompts delete message multiple ${selectedCount}`} */}
          Are you sure you want to delete this file/folder?


        </p>
      </div>
      <div className={cx("card-action")}>
        <button
          onClick={() => toggle()
        }
          className={cx('button','button--flat',"button--grey")}
          aria-label="Cancel"
          title="Cancel"
        >
          Cancel
        </button>
        <button
          onClick={() => submit()}
          className={cx('button','button--flat',"button--red")}
          aria-label="Delete"
          title="Delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Delete;

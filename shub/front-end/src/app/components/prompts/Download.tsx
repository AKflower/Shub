import { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Download.module.scss'
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@/store';

const cx = classNames.bind(styles);

interface DownloadProps {}

const Download: FC<DownloadProps> = () => {
  // const dispatch = useDispatch();
  // const currentPrompt = useSelector((state: RootState) => state.currentPrompt);

  const formats = {
    zip: 'zip',
    tar: 'tar',
    targz: 'tar.gz',
    tarbz2: 'tar.bz2',
    tarxz: 'tar.xz',
    tarlz4: 'tar.lz4',
    tarsz: 'tar.sz',
  };

  // const handleClick = (format: string) => {
  //   currentPrompt.confirm(format);
  // };

  return (
    <div className={cx('card','floating')} id={cx('download')}>
      <div className={cx('card-title')}>
        {/* <h2>{currentPrompt.$t('prompts.download')}</h2> */}
        <h2>download</h2>
      </div>

      <div className={cx("card-content")}>
        {/* <p>{currentPrompt.$t('prompts.downloadMessage')}</p> */}
        <p>downloadMessage</p>

        {Object.entries(formats).map(([format, ext]) => (
          <button
            key={format}
            className={cx('button','button--block')}
            // onClick={() => handleClick(format)}
            autoFocus
          >
            {ext}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Download;

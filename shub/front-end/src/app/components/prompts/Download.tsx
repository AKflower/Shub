import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';

interface DownloadProps {}

const Download: FC<DownloadProps> = () => {
  const dispatch = useDispatch();
  const currentPrompt = useSelector((state: RootState) => state.currentPrompt);

  const formats = {
    zip: 'zip',
    tar: 'tar',
    targz: 'tar.gz',
    tarbz2: 'tar.bz2',
    tarxz: 'tar.xz',
    tarlz4: 'tar.lz4',
    tarsz: 'tar.sz',
  };

  const handleClick = (format: string) => {
    currentPrompt.confirm(format);
  };

  return (
    <div className="card floating" id="download">
      <div className="card-title">
        <h2>{currentPrompt.$t('prompts.download')}</h2>
      </div>

      <div className="card-content">
        <p>{currentPrompt.$t('prompts.downloadMessage')}</p>

        {Object.entries(formats).map(([format, ext]) => (
          <button
            key={format}
            className="button button--block"
            onClick={() => handleClick(format)}
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

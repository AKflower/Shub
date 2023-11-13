import { FC, MouseEvent } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { files as api } from '@/api';
import { RootState } from '@/store';

interface InfoProps {
  closeHovers: () => void;
}

const Info: FC<InfoProps> = ({ closeHovers }) => {
  const dispatch = useDispatch();
  const req = useSelector((state: RootState) => state.req);
  const selected = useSelector((state: RootState) => state.selected);
  const selectedCount = useSelector((state: RootState) => state.selectedCount);
  const isListing = useSelector((state: RootState) => state.isListing);

  const [humanSize, setHumanSize] = useState<string>('');
  const [humanTime, setHumanTime] = useState<string>('');
  const [modTime, setModTime] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [dir, setDir] = useState<boolean>(false);

  useEffect(() => {
    const calculateHumanSize = () => {
      if (selectedCount === 0 || !isListing) {
        setHumanSize(filesize(req.size));
        return;
      }

      let sum = 0;

      for (let i of selected) {
        sum += req.items[i].size;
      }

      setHumanSize(filesize(sum));
    };

    const calculateHumanTime = () => {
      if (selectedCount === 0) {
        setHumanTime(moment(req.modified).fromNow());
      } else {
        setHumanTime(moment(req.items[selected[0]].modified).fromNow());
      }
    };

    const calculateModTime = () => {
      setModTime(new Date(Date.parse(req.modified)).toLocaleString());
    };

    const calculateName = () => {
      setName(selectedCount === 0 ? req.name : req.items[selected[0]].name);
    };

    const calculateDir = () => {
      setDir(
        selectedCount > 1 ||
          (selectedCount === 0
            ? req.isDir
            : req.items[selected[0]].isDir)
      );
    };

    calculateHumanSize();
    calculateHumanTime();
    calculateModTime();
    calculateName();
    calculateDir();
  }, [selected, selectedCount, isListing, req]);

  const checksum = async (event: MouseEvent, algo: string) => {
    event.preventDefault();

    let link;

    if (selectedCount) {
      link = req.items[selected[0]].url;
    } else {
      link = window.location.pathname;
    }

    try {
      const hash = await api.checksum(link, algo);
      // eslint-disable-next-line
      (event.target as HTMLAnchorElement).innerHTML = hash;
    } catch (e) {
      // Replace this with your error handling logic
      console.error(e);
    }
  };

  return (
    <div className="card floating">
      <div className="card-title">
        <h2>Translation for "prompts.fileInfo"</h2>
      </div>

      <div className="card-content">
        <p>{selected.length > 1 && `Translation for "prompts.filesSelected", { count: selected.length }`}</p>

        <p className="break-word" style={{ display: selected.length < 2 ? 'block' : 'none' }}>
          <strong>Translation for "prompts.displayName":</strong> {name}
        </p>
        <p style={{ display: !dir || selected.length > 1 ? 'block' : 'none' }}>
          <strong>Translation for "prompts.size":</strong>
          <span id="content_length"></span> {humanSize}
        </p>
        <p style={{ display: selected.length < 2 ? 'block' : 'none' }} title={modTime}>
          <strong>Translation for "prompts.lastModified":</strong> {humanTime}
        </p>

        <div style={{ display: dir && selected.length === 0 ? 'block' : 'none' }}>
          <p>
            <strong>Translation for "prompts.numberFiles":</strong> {req.numFiles}
          </p>
          <p>
            <strong>Translation for "prompts.numberDirs":</strong> {req.numDirs}
          </p>
        </div>

        <div style={{ display: !dir ? 'block' : 'none' }}>
          <p>
            <strong>MD5: </strong
            ><code>
              <a onClick={(e) => checksum(e, 'md5')}>Translation for "prompts.show"</a></code
            >
          </p>
          <p>
            <strong>SHA1: </strong
            ><code>
              <a onClick={(e) => checksum(e, 'sha1')}>Translation for "prompts.show"</a></code
            >
          </p>
          <p>
            <strong>SHA256: </strong
            ><code>
              <a onClick={(e) => checksum(e, 'sha256')}>Translation for "prompts.show"</a></code
            >
          </p>
          <p>
            <strong>SHA512: </strong
            ><code>
              <a onClick={(e) => checksum(e, 'sha512')}>Translation for "prompts.show"</a></code
            >
          </p>
        </div>
      </div>

      <div className="card-action">
        <button
          type="submit"
          onClick={closeHovers}
          className="button button--flat"
          aria-label="Translation for 'buttons.ok'"
          title="Translation for 'buttons.ok'"
        >
          Translation for "buttons.ok"
        </button>
      </div>
    </div>
  );
};

export default Info;

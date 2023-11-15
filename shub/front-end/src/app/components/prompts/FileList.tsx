import { FC, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@/store';
// import { files as api } from '@/api';
// import url from '@/utils/url';

interface FileListProps {
  updateSelected: (val: string | null) => void;
}

interface Item {
  name: string;
  url: string;
}

const FileList: FC<FileListProps> = ({ updateSelected }) => {
  // const dispatch = useDispatch();
  // const { req, user } = useSelector((state: RootState) => state);
  const [items, setItems] = useState<Item[]>([{name: '1', url: '1'}, {name: '2', url: '2'}, {name: '2', url: '2'}, {name: '2', url: '2'}, {name: '2', url: '2'}, {name: '2', url: '2'}, {name: '2', url: '2'}, {name: '2', url: '2'}]);
  // const [touches, setTouches] = useState({ id: '', count: 0 });
  // const [selected, setSelected] = useState<string | null>(null);
  // const [current, setCurrent] = useState(window.location.pathname);

  // useEffect(() => {
  //   fillOptions(req);
  // }, [req]);

  // const fillOptions = (req: any) => {
  //   setCurrent(req.url);
  //   setItems([]);

  //   updateSelected(current);

  //   if (req.url !== '/files/') {
  //     setItems((prevItems) => [
  //       ...prevItems,
  //       {
  //         name: '..',
  //         url: url.removeLastDir(req.url) + '/',
  //       },
  //     ]);
  //   }

  //   if (!req.items) return;

  //   for (const item of req.items) {
  //     if (!item.isDir) continue;

  //     setItems((prevItems) => [
  //       ...prevItems,
  //       {
  //         name: item.name,
  //         url: item.url,
  //       },
  //     ]);
  //   }
  // };

  // const next = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
  //   const uri = event.currentTarget.dataset.url;

  //   api.fetch(uri).then(fillOptions).catch((error: any) => {
  //     console.error(error);
  //     // handle error appropriately
  //   });
  // };

  // const touchstart = (event: React.TouchEvent<HTMLLIElement>) => {
  //   const uri = event.currentTarget.dataset.url;

  //   setTimeout(() => {
  //     setTouches({ id: '', count: 0 });
  //   }, 300);

  //   if (uri && touches.id !== uri) {
  //     setTouches({ id: uri, count: 1 });
  //     return;
  //   }
    

  //   setTouches((prevTouches) => ({ ...prevTouches, count: prevTouches.count + 1 }));

  //   if (touches.count > 1) {
  //     next(event);
  //   }
  // };

  // const itemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
  //   if (user.singleClick) {
  //     next(event);
  //   } else {
  //     select(event);
  //   }
  // };

  // const select = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
  //   const uri = event.currentTarget.dataset.url;

  //   if (selected === uri) {
  //     setSelected(null);
  //     updateSelected(current);
  //     return;
  //   }

  //   if(uri){
  //     setSelected(uri);
  //     updateSelected(uri);}
  // };

  // const createDir = () => {
  //   dispatch({
  //     type: 'SHOW_HOVER',
  //     payload: {
  //       prompt: 'newDir',
  //       action: null,
  //       confirm: null,
  //       props: {
  //         redirect: false,
  //         base: current === window.location.pathname ? null : current,
  //       },
  //     },
  //   });
  // };

  return (
    <div>
      <ul className="file-list">
        {items.map((item) => (
          <li
            key={item.name}
            // onClick={itemClick}
            // onTouchStart={touchstart}
            // onDoubleClick={next}
            role="button"
            tabIndex={0}
            aria-label={item.name}
            // aria-selected={selected === item.url}
            data-url={item.url}
          >
            {item.name}
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

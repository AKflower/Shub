import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addSelected, removeSelected, resetSelected } from '@/store/actions';
import { filesize } from '@/utils';
import moment from 'moment';
import { files as api } from '@/api';
import * as upload from '@/utils/upload';

interface ItemProps {
  name: string;
  isDir: boolean;
  url: string;
  type: string;
  size: number;
  modified: string;
  index: number;
  readOnly?: boolean;
  path?: string;
}

const Item: React.FC<ItemProps> = ({
  name,
  isDir,
  url,
  type,
  size,
  modified,
  index,
  readOnly,
  path,
}) => {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.selected);
  const user = useSelector((state: RootState) => state.user);
  const selectedCount = useSelector((state: RootState) => state.selectedCount);

  const [touches, setTouches] = useState(0);
  const isDraggable = !readOnly && user.perm.rename;
  const canDrop = isDir && readOnly === undefined;


  const isThumbsEnabled = true; // enableThumbs constant not available in the provided code

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const getThumbnailUrl = () => {
    const file = {
      path: path || '',
      modified,
    };

    return api.getPreviewURL(file, 'thumb');
  };
  const thumbnailUrl = isDir ? '' : getThumbnailUrl();

  const humanSize = () => {
    return type === 'invalid_link' ? 'invalid link' : filesize(size);
  };

  const humanTime = () => {
    if (readOnly === undefined && user.dateFormat) {
      return moment(modified).format('L LT');
    }
    return moment(modified).fromNow();
  };

  const dragStart = () => {
    if (selectedCount === 0) {
      dispatch(addSelected(index));
      return;
    }

    if (!isSelected()) {
      dispatch(resetSelected());
      dispatch(addSelected(index));
    }
  };

  const dragOver = (event: React.DragEvent) => {
    if (!canDrop) return;

    event.preventDefault();
    let el = event.target as HTMLElement;

    for (let i = 0; i < 5; i++) {
      if (!el.classList.contains('item')) {
        el = el.parentElement!;
      }
    }

    el.style.opacity = '1';
  };

  const drop = async (event: React.DragEvent) => {
    if (!canDrop) return;
    event.preventDefault();

    if (selectedCount === 0) return;

    let el = event.target as HTMLElement;
    for (let i = 0; i < 5; i++) {
      if (el !== null && !el.classList.contains('item')) {
        el = el.parentElement!;
      }
    }

    const items = selected.map((i: string | number) => ({
      from: api.items[i].url,
      to: url + encodeURIComponent(api.items[i].name),
      name: api.items[i].name,
    }));

    let path = el.getAttribute('data-url') || '';
    let baseItems = (await api.fetch(path)).items;

    const action = (overwrite: boolean, rename: boolean) => {
      api
        .move(items, overwrite, rename)
        .then(() => {
          dispatch({ type: 'SET_RELOAD', payload: true });
        })
        .catch((error: any) => {
          // Handle error
        });
    };

    const conflict = upload.checkConflict(items, baseItems);

    let overwrite = false;
    let rename = false;

    if (conflict) {
      dispatch({
        type: 'SHOW_HOVER',
        payload: {
          prompt: 'replace-rename',
          confirm: (option: string) => {
            overwrite = option === 'overwrite';
            rename = option === 'rename';

            action(overwrite, rename);
          },
        },
      });

      return;
    }

    action(overwrite, rename);
  };

  const itemClick = (event: MouseEvent) => {
    if (user.singleClick && !isSelected()) {
      open();
    } else {
      click(event);
    }
  };

  const click = (event: MouseEvent) => {
    if (!user.singleClick && selectedCount !== 0) {
      event.preventDefault();
    }

    setTimeout(() => {
      setTouches(0);
    }, 300);

    setTouches((prevTouches) => prevTouches + 1);

    if (touches > 1) {
      open();
    }

    if (selected.indexOf(index) !== -1) {
      dispatch(removeSelected(index));
      return;
    }

    if (event.shiftKey && selected.length > 0) {
      let fi = 0;
      let la = 0;

      if (index > selected[0]) {
        fi = selected[0] + 1;
        la = index;
      } else {
        fi = index;
        la = selected[0] - 1;
      }

      for (; fi <= la; fi++) {
        if (selected.indexOf(fi) === -1) {
          dispatch(addSelected(fi));
        }
      }

      return;
    }

    if (!user.singleClick && !event.ctrlKey && !event.metaKey && !user.multiple) {
      dispatch(resetSelected());
    }

    dispatch(addSelected(index));
  };

  const onMouseUp = () => {
    containerRef.current!.style.opacity = '1';
  };

  const open = () => {
    // Replace with your routing logic (e.g., Next.js router)
    console.log('Open:', url);
  };

  const isSelected = () => {
    return selected.indexOf(index) !== -1;
  };

  return (
    <div
      className="item"
      role="button"
      tabIndex={0}
      draggable={isDraggable}
      onDragStart={dragStart}
      onDragOver={dragOver}
      onDrop={drop}
      onClick={itemClick}
      data-dir={isDir}
      data-type={type}
      aria-label={name}
      aria-selected={isSelected()}
      ref={containerRef}
    >
      <div>
        {readOnly === undefined && type === 'image' && isThumbsEnabled && (
          <img data-src={thumbnailUrl} />
        )}
        <i className="material-icons"></i>
      </div>

      <div>
        <p className="name">{name}</p>

        {isDir ? (
          <p className="size" data-order="-1">
            &mdash;
          </p>
        ) : (
          <p className="size" data-order={humanSize()}>
            {humanSize()}
          </p>
        )}

        <p className="modified">
          <time dateTime={modified}>{humanTime()}</time>
        </p>
      </div>
    </div>
  );
};

export default Item;

import { useEffect, useRef, useState } from 'react';
import throttle from 'lodash.throttle';
import UTIF from 'utif';

interface ImageExProps {
  src: string;
  moveDisabledTime?: number;
  classList?: string[];
  zoomStep?: number;
}

const ImageEx: React.FC<ImageExProps> = ({
  src,
  moveDisabledTime = 200,
  classList = [],
  zoomStep = 0.25,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);
  const [lastX, setLastX] = useState<number | null>(null);
  const [lastY, setLastY] = useState<number | null>(null);
  const [inDrag, setInDrag] = useState(false);
  const [touches, setTouches] = useState(0);
  const [lastTouchDistance, setLastTouchDistance] = useState(0);
  const [moveDisabled, setMoveDisabled] = useState(false);
  const [disabledTimer, setDisabledTimer] = useState<NodeJS.Timeout | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [position, setPosition] = useState({
    center: { x: 0, y: 0 },
    relative: { x: 0, y: 0 },
  });
  const maxScale = 4;
  const minScale = 0.25;

  useEffect(() => {
    if (!decodeUTIF()) {
      imgRef.current!.src = src;
    }

    const container = containerRef.current!;
    classList.forEach((className) => container.classList.add(className));

    if (getComputedStyle(container).width === '0px') {
      container.style.width = '100%';
    }

    if (getComputedStyle(container).height === '0px') {
      container.style.height = '100%';
    }

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [src]);

  const decodeUTIF = () => {
    const sufs = ['tif', 'tiff', 'dng', 'cr2', 'nef'];
    const suff = document.location.pathname.split('.').pop()?.toLowerCase();
    if (!suff || sufs.indexOf(suff) === -1) return false;

    const xhr = new XMLHttpRequest();
    UTIF._xhrs.push(xhr);
    UTIF._imgs.push(imgRef.current!);
    xhr.open('GET', src);
    xhr.responseType = 'arraybuffer';
    xhr.onload = UTIF._imgLoaded;
    xhr.send();

    return true;
  };

  const onLoad = () => {
    const img = imgRef.current!;

    setImageLoaded(true);

    if (!img) {
      return;
    }

    img.classList.remove('image-ex-img-center');
    setCenter();
    img.classList.add('image-ex-img-ready');

    document.addEventListener('mouseup', onMouseUp);

    let realSize = img.naturalWidth;
    let displaySize = img.offsetWidth;

    if (img.naturalHeight > img.naturalWidth) {
      realSize = img.naturalHeight;
      displaySize = img.offsetHeight;
    }

    const fullScale = realSize / displaySize;
    const maxScaleWithZoom = fullScale + 4;
    setScale(maxScaleWithZoom);
  };

  const onMouseUp = () => {
    setInDrag(false);
  };

  const onResize = throttle(() => {
    if (imageLoaded) {
      setCenter();
      doMove(position.relative.x, position.relative.y);
    }
  }, 100);

  const setCenter = () => {
    const container = containerRef.current!;
    const img = imgRef.current!;

    setPosition((prevPosition) => ({
      ...prevPosition,
      center: {
        x: Math.floor((container.clientWidth - img.clientWidth) / 2),
        y: Math.floor((container.clientHeight - img.clientHeight) / 2),
      },
    }));

    img.style.left = position.center.x + 'px';
    img.style.top = position.center.y + 'px';
  };

  const mousedownStart = (event: React.MouseEvent) => {
    setLastX(null);
    setLastY(null);
    setInDrag(true);
    event.preventDefault();
  };

  const mouseMove = (event: React.MouseEvent) => {
    if (!inDrag) return;
    doMove(event.movementX, event.movementY);
    event.preventDefault();
  };

  const mouseUp = (event: React.MouseEvent) => {
    setInDrag(false);
    event.preventDefault();
  };

  const touchStart = (event: React.TouchEvent) => {
    setLastX(null);
    setLastY(null);
    setLastTouchDistance(0);

    if (event.targetTouches.length < 2) {
      setTimeout(() => {
        setTouches(0);
      }, 300);

      setTouches((prevTouches) => prevTouches + 1);

      if (touches > 1) {
        zoomAuto(event);
      }
    }

    event.preventDefault();
  };

  const zoomAuto = (event: React.TouchEvent) => {
    switch (scale) {
      case 1:
        setScale(2);
        break;
      case 2:
        setScale(4);
        break;
      default:
      case 4:
        setScale(1);
        setCenter();
        break;
    }
    setZoom();
    event.preventDefault();
  };

  const touchMove = (event: React.TouchEvent) => {
    event.preventDefault();

    if (lastX === null) {
      setLastX(event.targetTouches[0].pageX);
      setLastY(event.targetTouches[0].pageY);
      return;
    }

    const step = imgRef.current!.width / 5;

    if (event.targetTouches.length === 2) {
      setMoveDisabled(true);
      clearTimeout(disabledTimer!);
      setDisabledTimer(setTimeout(() => setMoveDisabled(false), moveDisabledTime));

      const p1 = event.targetTouches[0];
      const p2 = event.targetTouches[1];
      const touchDistance = Math.sqrt(
        Math.pow(p2.pageX - p1.pageX, 2) + Math.pow(p2.pageY - p1.pageY, 2)
      );

      if (!lastTouchDistance) {
        setLastTouchDistance(touchDistance);
        return;
      }

      setScale((prevScale) => prevScale + (touchDistance - lastTouchDistance) / step);
      setLastTouchDistance(touchDistance);
      setZoom();
    } else if (event.targetTouches.length === 1) {
      if (moveDisabled) return;
      const x = event.targetTouches[0].pageX - lastX!;
      const y = event.targetTouches[0].pageY - lastY!;

      if (Math.abs(x) >= step && Math.abs(y) >= step) return;

      setLastX(event.targetTouches[0].pageX);
      setLastY(event.targetTouches[0].pageY);
      doMove(x, y);
    }
  };

  const doMove = (x: number, y: number) => {
    const style = imgRef.current!.style;
    const posX = pxStringToNumber(style.left) + x;
    const posY = pxStringToNumber(style.top) + y;

    style.left = posX + 'px';
    style.top = posY + 'px';

    setPosition((prevPosition) => ({
      ...prevPosition,
      relative: {
        x: Math.abs(position.center.x - posX),
        y: Math.abs(position.center.y - posY),
      },
    }));

    if (posX < position.center.x) {
      setPosition((prevPosition) => ({
        ...prevPosition,
        relative: {
          ...prevPosition.relative,
          x: position.relative.x * -1,
        },
      }));
    }

    if (posY < position.center.y) {
      setPosition((prevPosition) => ({
        ...prevPosition,
        relative: {
          ...prevPosition.relative,
          y: position.relative.y * -1,
        },
      }));
    }
  };

  const wheelMove = (event: React.WheelEvent) => {
    setScale((prevScale) => prevScale + -Math.sign(event.deltaY) * zoomStep);
    setZoom();
  };

  const setZoom = () => {
    setScale((prevScale) => (prevScale < minScale ? minScale : prevScale));
    setScale((prevScale) => (prevScale > maxScale ? maxScale : prevScale));

    imgRef.current!.style.transform = `scale(${scale})`;
  };

  const pxStringToNumber = (style: string) => {
    return +style.replace('px', '');
  };

  return (
    <div
      className="image-ex-container"
      ref={containerRef}
      onTouchStart={touchStart}
      onTouchMove={touchMove}
      // onDoubleClick={zoomAuto}
      onMouseDown={mousedownStart}
      onMouseMove={mouseMove}
      onMouseUp={mouseUp}
      onWheel={wheelMove}
    >
      <img
        className="image-ex-img image-ex-img-center"
        ref={imgRef}
        onLoad={onLoad}
        src={src}
        alt="Image"
      />
    </div>
  );
};

export default ImageEx;

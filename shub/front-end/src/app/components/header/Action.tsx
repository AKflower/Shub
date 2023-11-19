import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Action.module.scss'

const cx = classNames.bind(styles);

interface ActionProps {

    className?: string;
    id?: string;
  icon: any;
  label: string;
  counter: number;
  show?: string;
  onAction?: () => void;
  
}

const Action: FC<ActionProps> = ({ id, className, icon, label, counter, show, onAction }) => {
  const handleClick = () => {
    if (show) {
      // Assuming that the store dispatch function is available through a context or props
      // Replace this with the actual way you access the store in your Next.js app
      // dispatch({ type: 'showHover', payload: show });
    }

    if (onAction) {
      onAction();
    }
  };
  

  return (
    <button id={id} onClick={handleClick} aria-label={label} title={label} className={cx("action",className)}>
      <div className={cx("material-icons")}>{icon}</div>
      {/* <i className={cx("material-icons")}></i> */}
      <span>{label}</span>
      {counter > 0 && <span className={cx("counter")}>{counter}</span>}
    </button>
  );
};

export default Action;

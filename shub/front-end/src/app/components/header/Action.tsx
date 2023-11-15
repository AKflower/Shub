import React, { FC } from 'react';

interface ActionProps {

    className?: string;
    id?: string;
  icon: string;
  label: string;
  counter: number;
  show?: string;
  onAction?: () => void;
}

const Action: FC<ActionProps> = ({ icon, label, counter, show, onAction }) => {
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
    <button onClick={handleClick} aria-label={label} title={label} className="action">
      <i className="material-icons">{icon}</i>
      <span>{label}</span>
      {counter > 0 && <span className="counter">{counter}</span>}
    </button>
  );
};

export default Action;

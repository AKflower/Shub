// components/Action.tsx

import { FC } from 'react';
import { useDispatch } from 'react-redux'; // Assuming you are using Redux for state management

interface ActionProps {
  icon: string;
  label: string;
  counter: number;
  show: boolean;
  action: () => void;
}

const Action: FC<ActionProps> = ({ icon, label, counter, show, action }) => {
  const dispatch = useDispatch();

  const handleAction = () => {
    if (show) {
      // Assuming you have a Redux action called 'showHover'
      dispatch({ type: 'SHOW_HOVER', payload: show });
    }

    action();
  };

  return (
    <button onClick={handleAction} aria-label={label} title={label} className="action">
      <i className="material-icons">{icon}</i>
      <span>{label}</span>
      {counter > 0 && <span className="counter">{counter}</span>}
    </button>
  );
};

export default Action;

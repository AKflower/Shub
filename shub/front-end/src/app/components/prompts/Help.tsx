import { FC } from 'react';

interface HelpProps {
  closeHovers: () => void;
}

const Help: FC<HelpProps> = ({ closeHovers }) => {
  return (
    <div className="card floating help">
      <div className="card-title">
        <h2>Translation for "help.help"</h2>
      </div>

      <div className="card-content">
        <ul>
          <li>
            <strong>F1</strong> - Translation for "help.f1"
          </li>
          <li>
            <strong>F2</strong> - Translation for "help.f2"
          </li>
          <li>
            <strong>DEL</strong> - Translation for "help.del"
          </li>
          <li>
            <strong>ESC</strong> - Translation for "help.esc"
          </li>
          <li>
            <strong>CTRL + S</strong> - Translation for "help.ctrl.s"
          </li>
          <li>
            <strong>CTRL + F</strong> - Translation for "help.ctrl.f"
          </li>
          <li>
            <strong>CTRL + Click</strong> - Translation for "help.ctrl.click"
          </li>
          <li>
            <strong>Click</strong> - Translation for "help.click"
          </li>
          <li>
            <strong>Double click</strong> - Translation for "help.doubleClick"
          </li>
        </ul>
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

export default Help;

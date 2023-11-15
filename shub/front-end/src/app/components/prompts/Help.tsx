"use client"

import React from 'react';
import classNames from 'classnames/bind';
import styles from './Help.module.scss'

const cx = classNames.bind(styles);

const Help: React.FC = () => {
  return (
    <div className={cx('card','floating','help')}>
      <div className={cx('card-title')}>
        <h2>{"Translate Function to Replace $t('help.help')"}</h2>
      </div>

      <div className={cx("card-content")}>
        <ul>
          <li>
            <strong>F1</strong> - {"Translate Function for $t('help.f1')"}
          </li>
          <li>
            <strong>F2</strong> - {"Translate Function for $t('help.f2')"}
          </li>
          {/* Add similar lines for other items */}
        </ul>
      </div>

      <div className={cx("card-action")}>
        <button
          type="submit"
          onClick={() => {
            // Replace with the actual dispatch function from your store
            // Example: dispatch({ type: 'closeHovers' });
          }}
          className={cx('button','button--flat')}
          aria-label={"Translate Function for $t('buttons.ok')"}
          title={"Translate Function for $t('buttons.ok')"}
        >
          {"Translate Function for $t('buttons.ok')"}
        </button>
      </div>
    </div>
  );
};

export default Help;

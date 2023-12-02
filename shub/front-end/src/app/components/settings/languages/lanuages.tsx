// LanguageSelector.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './lanuages.module.scss'
interface LanguageSelectorProps {
  onUpdateLocale: (newLocale: string) => void;
}

const LanguageSelector = () => {
//   const { t, i18n } = useTranslation();

//   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const newLocale = event.target.value;
//     i18n.changeLanguage(newLocale);
   
//   };

  return (
    <select className={styles.language}>
      <option value="en">English</option>
      <option value="vi">Vietnamese</option>
      {/* Thêm các ngôn ngữ khác vào đây */}
    </select>
  );
};

export default LanguageSelector;

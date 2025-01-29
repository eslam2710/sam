import React, { createContext, useContext, useState } from 'react';

// إنشاء السياق
const LanguageContext = createContext();

// مزود السياق
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar');

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'ar' ? 'en' : 'ar'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// هوك لاستخدام السياق
export const useLanguage = () => useContext(LanguageContext);

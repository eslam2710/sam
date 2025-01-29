import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { LanguageProvider } from './components/LanguageContext';  // مسار صحيح

ReactDOM.render(
  <React.StrictMode>
    <LanguageProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </LanguageProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

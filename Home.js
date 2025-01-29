import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import './styles.css'; // تأكد من أن هذا المسار صحيح
import Talents from './Talents'; // تأكد من استيراد المكون

const Home = () => {
  return (
    <Box>
      <Heading>مرحبا بكم في موهبتي!</Heading>
      <Talents /> {/* تأكد من أن مكون Talents معرف بشكل صحيح */}
    </Box>
  );
}

export default Home;

import React from 'react';
import { Flex, Link, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function Navigation() {
  return (
    <Flex as="nav" bg="teal.500" p={4} color="white" justify="center">
      <Box mx={4}>
        <Link as={RouterLink} to="/">الرئيسية</Link>
      </Box>
      <Box mx={4}>
        <Link as={RouterLink} to="/prices">الأسعار</Link>
      </Box>
      <Box mx={4}>
        <Link as={RouterLink} to="/features">المميزات</Link>
      </Box>
      <Box mx={4}>
        <Link as={RouterLink} to="/profile">الملف الشخصي</Link>
      </Box>
      <Box mx={4}>
        <Link as={RouterLink} to="/users">المستخدمون</Link>
      </Box>
    </Flex>
  );
}

export default Navigation;

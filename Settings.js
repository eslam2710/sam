import React, { useState } from 'react';
import { Box, Heading, Stack, Button, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { FaPaintBrush, FaTextHeight, } from 'react-icons/fa';

const Settings = ({ toggleTheme, setBackgroundColor, adjustTextSize }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    toggleTheme(newTheme);
  };

  return (
    <Box p={5}>
      <Heading mb={4}>الإعدادات</Heading>
      <Stack spacing={4}>
        <Box>
          <Text mb={2}>تغيير الوضع الليلي:</Text>
          <Button colorScheme="teal" onClick={handleToggleTheme}>
            {isDarkMode ? "تعطيل الوضع الليلي" : "تفعيل الوضع الليلي"}
          </Button>
        </Box>
        <Box>
          <Text mb={2}>حجم النص:</Text>
          <Button colorScheme="teal" onClick={() => adjustTextSize('small')} leftIcon={<FaTextHeight />}>
            تصغير النص
          </Button>
          <Button colorScheme="teal" onClick={() => adjustTextSize('large')} leftIcon={<FaTextHeight />} ml={2}>
            تكبير النص
          </Button>
        </Box>
        <Box>
          <Text mb={2}>تغيير الخلفية:</Text>
          <Menu>
            <MenuButton as={Button} rightIcon={<FaPaintBrush />}>
              اختر اللون
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setBackgroundColor('#ff0000')}>خلفية حمراء</MenuItem>
              <MenuItem onClick={() => setBackgroundColor('#00ff00')}>خلفية خضراء</MenuItem>
              <MenuItem onClick={() => setBackgroundColor('#0000ff')}>خلفية زرقاء</MenuItem>
              <MenuItem onClick={() => setBackgroundColor('#ffff00')}>خلفية صفراء</MenuItem>
              <MenuItem onClick={() => setBackgroundColor('#ff00ff')}>خلفية بنفسجية</MenuItem>
              <MenuItem onClick={() => setBackgroundColor('#00ffff')}>خلفية سماوية</MenuItem>
              <MenuItem onClick={() => setBackgroundColor('#ffffff')}>خلفية بيضاء</MenuItem>
              <MenuItem onClick={() => setBackgroundColor('#000000')}>خلفية سوداء</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Stack>
    </Box>
  );
}

export default Settings;

import React from 'react';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import { signInWithGoogle, signInWithFacebook } from './firebaseConfig';
import {
  Box,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  useColorMode,
  MenuItem,
  IconButton,
  Image,
  Alert,
  AlertIcon,
  FormControl,
  Input,
  Flex,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { 
  FaMoon, 
  FaSun, 
  FaWhatsapp, 
  FaThumbsUp, 
  FaShareAlt, 
  FaSave, 
  FaPaintBrush, 
  FaSearch 
} from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ChromePicker } from 'react-color';

// استيراد الصفحات الخاصة بك

import Pricing from './components/Pricing';
import Features from './components/Features';
import Profile from './components/Profile';
import ContactUs from './components/ContactUs';
import Users from './components/Users';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('ar');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [textSize, setTextSize] = useState(16);
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setWelcomeMessage(`مرحباً، ${user.email || user.displayName}`);
      } else {
        setUser(null);
        setWelcomeMessage('');
      }
    });
    return unsubscribe;
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, username, password);
        setUser(userCredential.user);
        setWelcomeMessage(`مرحباً، ${userCredential.user.email}`);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, username, password);
        setUser(userCredential.user);
        setWelcomeMessage(`مرحباً، ${userCredential.user.email}`);
      }
    
      setError('');
      setTimeout(() => (false), 5000);
    } catch (error) {
      setError('فشل المصادقة: ' + error.message);
     
      setTimeout(() => (false), 5000);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      setWelcomeMessage(`مرحباً، ${result.user.email}`);
    } catch (error) {
      setError('فشل تسجيل الدخول عبر Google: ' + error.message);

    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      setUser(result.user);
      setWelcomeMessage(`مرحباً، ${result.user.email}`);
    } catch (error) {
      setError('فشل تسجيل الدخول عبر Facebook: ' + error.message);

      setTimeout(() => (false), 5000);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setWelcomeMessage('');
    } catch (error) {
      setError('فشل تسجيل الخروج: ' + error.message);
 
      setTimeout(() => (false), 5000);
    }
  };

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'ar' ? 'en' : 'ar'));
  };

  return (
    <Router>
      <Box bg={bgColor} p={5} fontSize={`${textSize}px`}>
        {/* الشريط العلوي */}
        <Flex justifyContent="space-between" alignItems="center" bg="teal.500" p={4} color="white">
          <Flex alignItems="center">
            <Button onClick={toggleLanguage} mr={4}>
              {language === 'ar' ? 'Change to English' : 'تغيير إلى العربية'}
            </Button>
            <Menu>
              <MenuButton as={Button}>{language === 'ar' ? 'القائمة' : 'Menu'}</MenuButton>
              <MenuList>
                <MenuItem as={Link} to="/">{language === 'ar' ? 'الصفحة الرئيسية' : 'Home'}</MenuItem>
                <MenuItem as={Link} to="/pricing">{language === 'ar' ? 'الأسعار' : 'Pricing'}</MenuItem>
                <MenuItem as={Link} to="/features">{language === 'ar' ? 'المميزات' : 'Features'}</MenuItem>
                <MenuItem as={Link} to="/settings">{language === 'ar' ? 'الإعدادات' : 'Settings'}</MenuItem>
                <MenuItem as={Link} to="/profile">{language === 'ar' ? 'الملف الشخصي' : 'Profile'}</MenuItem>
                <MenuItem as={Link} to="/contact-us">{language === 'ar' ? 'تواصل معنا' : 'Contact Us'}</MenuItem>
                <MenuItem as={Link} to="/users">{language === 'ar' ? 'المستخدمين' : 'Users'}</MenuItem>
              </MenuList>
            </Menu>
            <IconButton
              aria-label={language === 'ar' ? 'الوضع الليلي' : 'Dark Mode'}
              icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
              onClick={toggleColorMode}
              ml={4}
            />
          </Flex>

          {/* زر البحث */}
          <Flex alignItems="center">
            <FormControl display="flex" alignItems="center" width="300px" mr={4}>
              <Input
                type="text"
                placeholder={language === 'ar' ? 'ابحث هنا...' : 'Search here...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IconButton
                aria-label="Search"
                icon={<FaSearch />}
                onClick={() => {
                  // يمكنك إضافة منطق البحث هنا
                  console.log('البحث عن:', searchQuery);
                }}
                ml={2}
                colorScheme="teal"
              />
            </FormControl>
          </Flex>

          {user ? (
            <Button onClick={handleSignOut} colorScheme="red">
              {language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
            </Button>
          ) : (
            <Box>
              <Button onClick={() => setIsSignUp(false)} mr={2}>
                {language === 'ar' ? 'تسجيل الدخول' : 'Log In'}
              </Button>
              <Button onClick={() => setIsSignUp(true)} mr={2}>
                {language === 'ar' ? 'إنشاء حساب' : 'Sign Up'}
              </Button>
              <Button onClick={handleGoogleSignIn} colorScheme="blue" mr={2}>
                Google
              </Button>
              <Button onClick={handleFacebookSignIn} colorScheme="blue">
                Facebook
              </Button>
            </Box>
          )}
        </Flex>

        {/* صورة الغلاف */}
        <Image
          src="https://via.placeholder.com/800x200"
          alt={language === 'ar' ? 'غلاف التطبيق' : 'App Cover'}
          borderRadius="md"
          mb={4}
        />

        {/* رسالة الترحيب */}
        {user && <Alert status="success" mb={4}><AlertIcon />{welcomeMessage}</Alert>}

        {/* عرض الأخطاء */}
        {error && <Alert status="error" mb={4}><AlertIcon />{error}</Alert>}

        {/* نماذج تسجيل الدخول والتسجيل */}
        {!user && (
          <Box>
            {!isSignUp ? (
              <Box mt={4} maxWidth="400px" mx="auto">
                <Heading size="md" mb={4}>{language === 'ar' ? 'تسجيل الدخول' : 'Log In'}</Heading>
                <FormControl mb={3}>
                  <Input
                    type="email"
                    placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <Input
                    type="password"
                    placeholder={language === 'ar' ? 'كلمة المرور' : 'Password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Button onClick={handleAuth} colorScheme="teal" width="100%">
                  {language === 'ar' ? 'تسجيل الدخول' : 'Log In'}
                </Button>
              </Box>
            ) : (
              <Box mt={4} maxWidth="400px" mx="auto">
                <Heading size="md" mb={4}>{language === 'ar' ? 'إنشاء حساب' : 'Sign Up'}</Heading>
                <FormControl mb={3}>
                  <Input
                    type="email"
                    placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <Input
                    type="password"
                    placeholder={language === 'ar' ? 'كلمة المرور' : 'Password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Button onClick={handleAuth} colorScheme="green" width="100%">
                  {language === 'ar' ? 'إنشاء حساب' : 'Sign Up'}
                </Button>
              </Box>
            )}
          </Box>
        )}

        {/* محتوى الصفحات */}
        <Routes>
          <Route
            path="/"
            element={
              <Box>
                <Flex mt={4} justifyContent="center">
                  <iframe
                    width="350"
                    height="200"
                    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </Flex>
                <HStack mt={4} spacing={4} justify="center">
                  <Button colorScheme="blue" size="sm">
                    <FaThumbsUp /> {language === 'ar' ? 'إعجاب' : 'Like'}
                  </Button>
                  <Button colorScheme="green" size="sm">
                    <FaShareAlt /> {language === 'ar' ? 'مشاركة' : 'Share'}
                  </Button>
                  <Button colorScheme="yellow" size="sm">
                    <FaSave /> {language === 'ar' ? 'حفظ' : 'Save'}
                  </Button>
                </HStack>
              </Box>
            }
          />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/settings" element={
            <Box>
              <Heading>{language === 'ar' ? 'الإعدادات' : 'Settings'}</Heading>
              <VStack align="start" mt={4}>
                <Box>
                  <Text mb={2}>{language === 'ar' ? 'تغيير الخلفية' : 'Change Background'}</Text>
                  <ChromePicker
                    color={bgColor}
                    onChangeComplete={(color) => setBgColor(color.hex)}
                  />
                </Box>
                <Box w="100%">
                  <Text mb={2}>{language === 'ar' ? 'حجم النص' : 'Text Size'}</Text>
                  <Slider
                    defaultValue={16}
                    min={10}
                    max={30}
                    onChange={(val) => setTextSize(val)}
                  >
                    <SliderTrack bg="teal.100">
                      <SliderFilledTrack bg="teal.500" />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                      <FaPaintBrush />
                    </SliderThumb>
                  </Slider>
                  <Flex alignItems="center" mt={2}>
                    <Text>
                      {language === 'ar' ? 'حجم النص الحالي:' : 'Current Text Size:'} {textSize}px
                    </Text>
                    <IconButton
                      ml={2}
                      icon={<FaPaintBrush />}
                      colorScheme="teal"
                      aria-label="Change Text Size"
                      isDisabled
                    />
                  </Flex>
                </Box>
              </VStack>
            </Box>
          } />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/users" element={<Users />} />
        </Routes>

        {/* زر دردشة واتساب */}
        <Button
          position="fixed"
          bottom="20px"
          right="20px"
          bg="green.500"
          color="white"
          borderRadius="full"
          boxShadow="lg"
          onClick={() => window.open('https://wa.me/966563864551', '_blank')}
        >
          <FaWhatsapp size={30} />
        </Button>
      </Box>
    </Router>
  );
}

export default App;

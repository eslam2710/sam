import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, Alert, AlertIcon, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebaseConfig'; // تأكد من استيراد "auth" بشكل صحيح
import backgroundImg from './images/background.jpg'; // التأكد من استيراد الصورة بشكل صحيح

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password); // تأكد من استخدام المعلمات الصحيحة هنا
      navigate('/'); // توجيه المستخدم بعد تسجيل الدخول بنجاح
    } catch (error) {
      setError('فشل تسجيل الدخول: ' + error.message);
    }
  };

  return (
    <Box position="relative" h="100vh" bg="gray.100">
      <Image
        src={backgroundImg}
        alt="Background"
        objectFit="cover"
        w="100%"
        h="100%"
        position="absolute"
        top="0"
        left="0"
        zIndex="-1"
      />
      <Box maxW="md" mx="auto" mt="10" p="6" boxShadow="md" borderRadius="md" bg="white" opacity="0.9">
        <Heading mb="6" size="lg" textAlign="center">تسجيل الدخول</Heading>
        {error && (
          <Alert status="error" mb="6">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <form onSubmit={handleLogin}>
          <FormControl isRequired mb="4">
            <FormLabel>البريد الإلكتروني</FormLabel>
            <Input type="email" placeholder="أدخل بريدك الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl isRequired mb="6">
            <FormLabel>كلمة المرور</FormLabel>
            <Input type="password" placeholder="أدخل كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button colorScheme="teal" type="submit" width="full">تسجيل الدخول</Button>
        </form>
      </Box>
    </Box>
  );
}

export default Login;

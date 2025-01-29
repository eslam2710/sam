import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  useToast,
  Spinner,
} from '@chakra-ui/react';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast({
        title: language === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);

    try {
      console.log('Sending data to server:', { name, email, message });
      const response = await axios.post('http://localhost:3000/api/contact', {
        name,
        email,
        message,
      });

      if (response.data.success) {
        toast({
          title: language === 'ar' ? 'تم إرسال الرسالة بنجاح' : 'Message sent successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        toast({
          title: language === 'ar' ? 'حدث خطأ أثناء إرسال الرسالة' : 'Error sending message',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error sending message:', error.message);
      toast({
        title: language === 'ar' ? 'فشل الإرسال' : 'Sending failed',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const labels = {
    ar: {
      title: 'تواصل معنا',
      name: 'الاسم:',
      email: 'البريد الإلكتروني:',
      message: 'الرسالة:',
      submit: 'إرسال',
    },
    en: {
      title: 'Contact Us',
      name: 'Name:',
      email: 'Email:',
      message: 'Message:',
      submit: 'Send',
    },
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      p={5}
      bg="gray.50"
    >
      <Box
        width="100%"
        maxWidth="500px"
        p={6}
        boxShadow="md"
        borderRadius="md"
        bg="white"
      >
        <Heading size="lg" mb={6} textAlign="center">
          {labels[language].title}
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4} isRequired>
            <FormLabel>{labels[language].name}</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={language === 'ar' ? 'أدخل اسمك' : 'Enter your name'}
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>{labels[language].email}</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>{labels[language].message}</FormLabel>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={language === 'ar' ? 'أدخل رسالتك' : 'Enter your message'}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            width="100%"
            isLoading={isLoading}
            loadingText={language === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
          >
            {labels[language].submit}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ContactUs;

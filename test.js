const mongoose = require('mongoose');
const Contact = require('./contactModel'); // استيراد الموديل

// الاتصال بقاعدة البيانات
const uri = 'mongodb://localhost:27017/test';
mongoose.connect(uri)
  .then(() => {
    console.log('تم الاتصال بقاعدة البيانات.');

    // إضافة بيانات نموذج "تواصل معنا"
    const newContact = new Contact({
      name: 'إسلام',
      email: 'example@example.com',
      message: 'هذا هو رسالتي عبر النموذج.',
    });

    return newContact.save(); // حفظ البيانات في القاعدة
  })
  .then(() => {
    console.log('تم حفظ بيانات التواصل بنجاح!');
    mongoose.disconnect(); // إغلاق الاتصال بعد الحفظ
  })
  .catch(err => {
    console.error('حدث خطأ:', err);
    mongoose.disconnect();
  });

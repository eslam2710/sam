const mongoose = require('mongoose');

// تعريف Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // لإضافة تاريخ الإنشاء والتحديث تلقائيًا

// إنشاء الموديل
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;

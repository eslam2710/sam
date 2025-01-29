const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const portfinder = require('portfinder');
const readlineSync = require('readline-sync');

const app = express();

app.use(cors());
app.use(express.json());

// الاتصال بقاعدة البيانات MongoDB
mongoose.connect('mongodb://localhost:27017/yourdatabase', {
  serverSelectionTimeoutMS: 3003 // وقت انتظار لاختيار الخادم
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Contact = mongoose.model('Contact', contactSchema);

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log("Data received:", { name, email, message });
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving contact message:', error.message);
    res.status(500).json({ success: false });
  }
});

// تعديل رأس CSP
app.use(function(req, res, next) {
  res.setHeader('Content-Security-Policy', "script-src 'self' https://your-trusted-source.com;");
  next();
});

// استخدام portfinder للبحث عن منفذ متاح
const DEFAULT_PORT = process.env.PORT || 3003;

portfinder.getPortPromise({ port: DEFAULT_PORT, stopPort: DEFAULT_PORT + 1000 })
  .then(port => {
    if (port !== DEFAULT_PORT) {
      const useAlternatePort = readlineSync.question(`Port ${DEFAULT_PORT} is occupied. Do you want to use port ${port} instead? (Y/N): `);
      if (useAlternatePort.toLowerCase() !== 'y') {
        console.log('Exiting server setup.');
        process.exit(0);
      }
    }
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Error finding port:', err.message);
  });

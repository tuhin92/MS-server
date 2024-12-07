const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();  

// Initialize the app
const app = express();
const port = process.env.PORT || 3010;

// Enable CORS
const corsOptions = {
  origin: '*', // Update to your frontend domain for production
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// SMTP configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,  
    pass: process.env.SMTP_PASS  
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Email Sending Service!');
});

// Email sending route
app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  // Email options
  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    text
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred while sending email:', error);
      return res.status(500).json({ message: 'An error occurred while sending the email.' });
    }
    res.status(200).json({ message: `Email sent successfully to ${to}.` });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

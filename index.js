const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();  

// Initialize the app
const app = express();
const port = 3010;

// Enable CORS 
app.use(cors());

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

// send the email
app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  // demo template 
  const mailOptions = {
    from: process.env.SMTP_USER, 
    to: to,                     
    subject: subject,           
    text: text                 
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: error.toString() });
    }
    res.status(200).json({ message: 'Email sent: ' + info.response });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

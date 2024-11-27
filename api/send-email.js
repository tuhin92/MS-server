// /api/send-email.js
const nodemailer = require('nodemailer');

module.exports = (req, res) => {
  if (req.method === 'POST') {
    const { to, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: error.toString() });
      }
      res.status(200).json({ message: 'Email sent: ' + info.response });
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

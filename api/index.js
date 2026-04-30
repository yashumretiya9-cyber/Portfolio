import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODE_EMAIL,
    pass: process.env.NODE_PASS,
  },
});

// Routes
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.NODE_EMAIL,
    subject: `Portfolio Contact: ${subject || 'New Message'}`,
    text: `
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      
      Message:
      ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  });
});

// For Vercel, we export the app instead of calling app.listen()
export default app;

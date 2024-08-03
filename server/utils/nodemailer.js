const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure dotenv is called to load the .env variables

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: process.env.SMTP_SECURE === 'true', // True for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
const sendEmail = async (to, subject, text) => {
  try {
    if (!to) {
      throw new Error("No recipients defined");
    }

    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};


module.exports = sendEmail;

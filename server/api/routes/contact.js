// routes/contact.js
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Create transporter using email provider 
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dauding159@gmail.com',
      pass: 'bhui tamr xvwp fvoo', 
    },
  });

 const mailOptions = {
  from: 'yourgmail@gmail.com', 
  to: 'dauding159@gmail.com',
  subject: `Contact Message from ${name}`,
  text: `You have received a new message:

Name: ${name}
Email: ${email}

Message:
${message}
`,
};

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Mail send failed:', error);
    res.status(500).json({ success: false, message: 'Email sending failed.' });
  }
});

module.exports = router;
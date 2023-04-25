const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_UNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'nairvaishak101@gmail.com',
    to: options.email,
    subject: "Lunch Box - Dev | Vaishak Nair | Password Reset",
    text: options.message
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

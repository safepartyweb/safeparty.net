import nodemailer from 'nodemailer';

export const sendResetEmail = async (toEmail, resetLink) => {
  // Create transporter using your email provider SMTP settings
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or 'SendGrid', 'Mailgun', etc.
    auth: {
      user: process.env.EMAIL_USER,      // your Gmail or SMTP user
      pass: process.env.EMAIL_PASS,      // your app password or SMTP password
    },
  });

  const mailOptions = {
    from: `"Safe Party Support Team" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Password Reset Instructions',
    html: `
      <p>Hi,</p>
      <p>You requested to reset your password. Click the link below to continue:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 15 minutes. If you didn’t request a reset, you can ignore this email.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reset email sent to ${toEmail}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send reset email');
  }
};

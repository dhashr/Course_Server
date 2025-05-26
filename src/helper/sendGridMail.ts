import sgMail from '@sendgrid/mail';
import * as dotenv from 'dotenv';
import { IEmailData } from '../types';

// I'm currently using node_tls_reject for node version issue or a proxy might be intercepting SSL.
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
dotenv.config()
sgMail.setApiKey("<Sendgrid API key>");
const LoginURL: string = "http://localhost:5173/login";

export const sendUserEmail = (mailData: IEmailData) => {
  const emailbody = `<p>Hi ${mailData.username},</p>
        <p>Welcome to Training and Certifications. Your account has been created successfully. Please find your credentials below:</p>
        <p>URL: ${LoginURL} <p>
        <p>Email: ${mailData.email}</p>
        <p>Password: ${mailData.password}</p>
        You can set up your account password by clicking on the link below: <br>
        <a href="${LoginURL}">${LoginURL}</a>
        <p>Thanks,</p>
        <p>Training Team</p>`

  const msg = {
    to: mailData.email,
    from: {
      name: "Training and Certification Center",
      email: 'kalidashramachandran@gmail.com',
    },
    subject: 'Welcome to Training and Certifications.',
    text: 'Welcome to our Training and Certifications platform!',
    html: emailbody,
  };

  sgMail.send(msg)
    .then(() => {
      console.log('Email sent successfully');
    })
    .catch((error) => {
      console.error('Error sending email:', error.response?.body || error.message);
      console.error('Error sending:', error);
    });
}


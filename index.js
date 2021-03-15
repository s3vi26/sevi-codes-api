require('dotenv').config();
const serverless = require('serverless-http');
const express = require('express');
const app = express();
const nodemailer = require("nodemailer");

const { EMAIL_HOST, EMAIL_PORT, USER, PASS, MY_EMAIL } = process.env;

app.post('/sendEmail', async function (req, res) {
  const body = req.body.toString('utf8');
  const { name, title, email, phone, link, description } = body;

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false,
    auth: {
      user: USER,
      pass: PASS,
    },
  });

  console.log('connection established');
  try {
    const info = await transporter.sendMail({
      to: MY_EMAIL,
      subject: "Sevi-Codes.io/Contact",
      text: `This email is from ${name} - ${title}. \n Their contact number is ${phone}; email is ${email}.\n Job posting link is here ${link}.\n Here is what they communicated about the job: ${description}`,
    });
  
    console.log(info);
  
    res.send('Email Sent!');
  } catch (e) {
    console.log('error occured');
    console.log(e);
  }
});

module.exports.handler = serverless(app);
require('dotenv').config();
const serverless = require('serverless-http');
const express = require('express');
const app = express();
const nodemailer = require("nodemailer");

const { EMAIL_HOST, EMAIL_PORT, USER, PASS, MY_EMAIL } = process.env;

app.post('/sendEmail', async function (req, res) {
  console.log(req.body);
  const { name, title, email, phone, link, description } = req.body;
  console.log(name, title, email, phone, link, description)
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false,
    auth: {
      user: USER,
      pass: PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `${email}`,
    to: MY_EMAIL,
    subject: "Sevi-Codes.io/Contact",
    text: `This email is from ${name} - ${title}. Their contact number is ${phone}. Job posting link is here ${link}. Here is what they communicated about the job: ${description}`,
  });

  console.log(info);

  res.send('Email Sent!');
});

module.exports.handler = serverless(app);
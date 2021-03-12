const serverless = require('serverless-http');
const express = require('express');
const app = express();
const nodemailer = require("nodemailer");

const { USER, PASS, MY_EMAIL } = process.env;

app.post('/send', async function (req, res) {
  console.log(req);

  const { name, title, email, phone, link, description } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: USER,
      pass: PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `${email}`, // sender address
    to: MY_EMAIL, // list of receivers
    subject: "Sevi-Codes.io/Contact", // Subject line
    text: `This email is from ${name} - ${title}. Their contact number is ${phone}. Job posting link is here ${link}. Here is what they communicated about the job: ${description}`, // plain text body
  });

  console.log(info);

  res.send('Email Sent!');
})

module.exports.handler = serverless(app);
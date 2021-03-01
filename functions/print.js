const fs = require("fs");
const nodemailer = require('nodemailer');
require('dotenv').config();
const mail = process.env.MAIL;
const pass = process.env.PASS;
const mailto = process.env.MAILTO;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mail,
      pass: pass
    }
});

function printViaMail(pdf) {
    var mailOptions = {
        from: mail,
        to: mailto,
        subject: 'dvar torah',
        attachments: [
            {
                filename: 'out.pdf',
                content: pdf,
                encoding: 'base64'
            }
        ]
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Printing....');
        }
    });
}

exports.printViaMail = printViaMail;

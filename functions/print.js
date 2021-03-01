const fs = require("fs");
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dvar.torah.online@gmail.com',
      pass: 'elkana321'
    }
});

function printViaMail() {
    console.log('PDF saved');
    var mailOptions = {
        from: 'dvar.torah.online@gmail.com',
        to: 'elkana.hendler@gmail.com',
        subject: 'dvar torah',
        attachments: [
            {
                filename: 'out.pdf',
                content: fs.createReadStream('out.pdf')
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

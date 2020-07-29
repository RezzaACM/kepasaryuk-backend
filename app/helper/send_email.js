const nodemailer = require('nodemailer');
const fs = require('fs');
const Hogan = require('hogan.js')

exports.sendMail = async (param, body) => {

    const template = fs.readFileSync('views/email/index.hjs', 'utf8');
    const compiledTemplate = Hogan.compile(template);

    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: 'noreply@mailtrap.com',
        to: 'funkyrezza@gmail.com',
        subject: 'Sending Email using Nodejs',
        html: compiledTemplate.render({
            name: body.name,
            email: body.email,
            token: body.remember_token
        })
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err
    })
}
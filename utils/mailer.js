const nodeMailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');


const transporterDetails = smtpTransport({
    host: "mail.ghorbany.dev",
    port: 465,
    secure: true,
    auth: {
        user: "toplearn@ghorbany.dev",
        pass: "toplearn123456"
    },
    tls: {
        rejectUnauthorized: false
    }
})


exports.sendEmail = (email, subject, message) => {
    const transporter = nodeMailer.createTransport(transporterDetails);
    transporter.sendMail({
        form: "toplearn@ghorbany.dev",
        to: email,
        subject: subject,
        html:
            `
            <p> ${message} </p>
            `
    }, (error) => {
        if (error) {
            console.log(error);
        }
    })
}
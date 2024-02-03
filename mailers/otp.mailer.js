const nodemailer = require('../config/nodemailer')

const sendOtp = (otp, mail) => {
    let htmlString = nodemailer.renderTemplate({ otp: otp }, '/otp.mailer.ejs')
    nodemailer.transporter.sendMail(
        {
            from: 'noreply@cakelaya.com',
            to: mail,
            subject: 'One-Time Password (OTP) Verification for Cakeलाया ?',
            html: htmlString,
        },
        (err, info) => {
            if (err) {
                console.log('Error in sending mail', err);
                return;
            }
            console.log('Message sent', info);
            return;
        }
    )
}

module.exports = { sendOtp };

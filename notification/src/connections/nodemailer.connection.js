var nodemailer = require('nodemailer');
var {host,pass,port,user}= require("../config").nodemailer
var transporter = nodemailer.createTransport({host,port,auth:{user,pass}
});
const sendEmail = (receiver) => {
    const mailOptions = {
        from: user, // sender address
        to: receiver, // list of receivers
        subject: 'Welcome to Audifric ', // Subject line
        html: '<h1>Email Notification test</h1>'// plain text body
      };
    transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 })
}
module.exports = sendEmail
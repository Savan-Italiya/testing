import express from "express"
import nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js"
import random from "../services/randomOtp.js"

const mailerRouter = express.Router()

mailerRouter.post("/send/email/:email_id", async (req, res) => {
  try {
    const senderEmail = req.params.email_id.trim().toLowerCase()


    var transporter = nodemailer.createTransport(
      new SMTPTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'jalondhravishal@gmail.com',
          pass: 'kcnutlrdlznjyyib'
        },
        tls: {

          rejectUnauthorized: false,

        }

      }));

    //   console.log("transpoter = ",transporter);

    var mailOptions = {
      from: 'jalondhravishal@gmail.com',
      to: senderEmail,
      subject: 'Sending Email using Node.js',
      // html: '<h1>this is text mail</h1><img src="https://www.blender.org/wp-content/uploads/2023/05/blender_36_lts_splash.jpg">',

      text: random.toString()

    };

    //   console.log("mailoption == " , mailOptions);

    let sendMailerdata = await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    //   console.log("sendmailerdata = ==" , sendMailerdata);
    res.status(200).send({
      status: 200,
      sendMailerdata,

    })
    console.log(random);
  } catch (error) {
    console.log(error);
  }
})

export default mailerRouter


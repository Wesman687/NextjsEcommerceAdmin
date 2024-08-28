import nodemailer from 'nodemailer'
import { User } from "../model/user-model";
import bcryptjs from "bcryptjs";
import { dbConnect } from "../lib/mongo";

export const sendEmail = async ({ email, emailType, userId }) => {
  console.log('sending email from send')
   await dbConnect()
  try {
    const hasToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      const test = await User.findByIdAndUpdate(userId, {
        verifyToken: hasToken,
        verifyyTokenExpiry: Date.now() + 3600000, //approx 1 hour
      });
    }
    if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hasToken,
        forgetPasswordTokenExpiry: Date.now() + 3600000, //approx 1 hour
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 465,
      auth: {
        user: process.env.WEB_MAILER,
        pass: process.env.WEB_MAILER_PASSWORD,
      },
    });
    const mailOptions = {
      from: '<admin@ecommerce.email>', // sender address
      to: email, // list of receivers
      subject: emailType, // Subject line
      text: "Hello world?", // plain text body
      html: `<p>Click <a href=${process.env.DOMAIN}/verifyemail?token=${hasToken}>
       to verify</a> to ${emailType === 'VERIFY' ? "verify your email" : "reset your password"} </p>`, // html body
    }
    const mailResponse = await transporter.sendMail(mailOptions);
    console.log(mailResponse, 'mail respone')
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};

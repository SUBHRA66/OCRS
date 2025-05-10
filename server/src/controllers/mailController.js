import nodemailer from "nodemailer";

export const sendMail = (email, otp) => {
 
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "subhrand66@gmail.com",
      pass: process.env.OCRS_APP_PASSWORD,
    },
  });
  const mailOptions = {
    from: "ocrs.server@gmail.com",
    to: email,
    subject: "OTP for Forget password",
    text: `OTP for forget password is ${otp}. Do not share it with anyone`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
      return error.message;
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};

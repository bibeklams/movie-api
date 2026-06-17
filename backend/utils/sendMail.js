import nodemailer from "nodemailer";

// const sendEmail = async (to, subject, html) => {
//   try {
//     // 1. Create transporter (Gmail SMTP)
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // 2. Email options
//     const mailOptions = {
//       from: `"Movie Booking System" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     };

//     // 3. Send email
//     const info = await transporter.sendMail(mailOptions);

//     console.log("Email sent:", info.messageId);

//     return info;
//   } catch (error) {
//     console.error("Email error:", error);
//     throw new Error("Email could not be sent");
//   }
// };

// export default sendEmail;

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: `Movie Booking System <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent", info.messageId);
    return info;
  } catch (error) {
    console.log("Email Error", error);
    throw new Error("message couldn't be sent");
  }
};
export default sendEmail;

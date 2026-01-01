require("dotenv").config();
const nodemailer = require("nodemailer");
// const userModel = require("../../models/mailSend.schema"); // optional

exports.sendMail = async (request, response) => {
  try {
    const { name, email, message, mobile } = request.body;

    if (!name || !email || !message || !mobile) {
      return response.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 1️⃣ Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your gmail
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    // 2️⃣ Send Mail
    const info = await transporter.sendMail({
      from: `"Website Contact Form" <${process.env.EMAIL_USER}>`, // ✅ FIXED
      to: "naveensainijpr@gmail.com", // ✅ YOU
      replyTo: email, // ✅ USER EMAIL
      subject: "New Contact Form Submission",
      text: `
New Contact Request

Name   : ${name}
Email  : ${email}
Mobile : ${mobile}

Message:
${message}
      `,
    });

    // 3️⃣ Response
    response.status(200).json({
      success: true,
      message: "Email sent successfully!",
      info,
    });
  } catch (error) {
    console.error("Mail Error:", error);

    response.status(500).json({
      success: false,
      message: "Email sending failed",
      error: error.message,
    });
  }
};

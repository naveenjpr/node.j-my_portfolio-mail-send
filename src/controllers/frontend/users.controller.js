const nodemailer = require("nodemailer")
const userModel = require("../../models/users.schema")

//आप बार-बार एक ही ईमेल पर मेल भेज सकते हैं।

exports.sendMail = async (request, response) => {
  const { name, email, message, mobile } = request.body
  console.log(request.body)

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "naveensainijpr@gmail.com", // Your Gmail
      pass: "clru iyqi omdh jnkt", // Your App Password
    },
  })

  try {
    const info = await transporter.sendMail({
      from: "naveensainijpr@gmail.com", // Always send from your Gmail
      to: "naveensainijpr@gmail.com", // Always receive at your Gmail
      replyTo: email, // Allows you to reply directly to the sender
      subject: "New Contact Form Submission",
      text: `Hello Naveen,
  
  You received a new message from your website:
  
  Name: ${name}
  Email: ${email}
  mobile: ${mobile}
  Message: "${message}"
  
  Check and respond accordingly.
  
  Best regards,
  Your Website`,
    })

    response.status(200).json({
      success: true,
      message: "Email sent successfully!",
      info,
    })
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Failed to send email!",
      error: error.message,
    })
  }
}

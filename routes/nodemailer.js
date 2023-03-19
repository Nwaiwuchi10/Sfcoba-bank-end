const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const router = require("express").Router();

router.post(
  "/",

  async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      //   host: "smtp.gmail.com",
      //   port: 587,
      service: "gmail",
      auth: {
        user: "djnchrys@gmail.com",
        pass: "xqqsddmzxpnqethy",
      },
    });

    const mailOptions = {
      from: "djnchrys@gmail.com",
      //   to: "nwaiwugetrude@gmail.com",
      to: email,
      subject: `New Message to ${name}`,
      //   subject: "testing",
      //   text: "Just know that nafa is our project, who is chris?. chris is a team player from Jovine360 FC",
      text: message,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  }
);

module.exports = router;

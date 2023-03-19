const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const port = 5000;

function sendEmail() {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "djnchrys@gmail.com",
        pass: "mictdtqklnuerfkg",
      },
    });
    const mail_configs = {
      from: "djnchrys@gmail.com",
      to: "nwaiwugetrude@gmail.com",
      subject: "Testing Nafa Email Notification from Backend",
      text: "Just know that nafa is our project, who is chris?. chris is a team player from Jovine360 FC",
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      return resolve({
        message: "Email sent succesfuly",
      });
    });
  });
}
app.get("/", (req, res) => {
  sendEmail()
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});

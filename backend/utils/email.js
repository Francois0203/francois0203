const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.PERSONAL_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(to, subject, text) {
    const mailOptions = {
      from: process.env.PERSONAL_EMAIL,
      to,
      subject,
      text,
    };

    console.log(`Preparing to send email to ${to} with subject: ${subject}`);
    
    try {
      await this.transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  }
}

module.exports = new EmailService();
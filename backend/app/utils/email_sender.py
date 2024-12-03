import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

class EmailSender:
    SENDER_EMAIL = "francoismeiring0203@gmail.com" 
    EMAIL_PASSWORD = "qmtx lzru oibu aiuo" 

    @classmethod
    def send_email(cls, recipient_emails, subject, body):
        try:
            # Create email
            msg = MIMEMultipart()
            msg["From"] = cls.SENDER_EMAIL
            msg["Subject"] = subject
            msg.attach(MIMEText(body, "plain"))
            
            # Connect to SMTP server and send email
            with smtplib.SMTP("smtp.gmail.com", 587) as server:
                server.starttls()
                server.login(cls.SENDER_EMAIL, cls.EMAIL_PASSWORD)
                msg["To"] = ", ".join(recipient_emails)
                server.sendmail(cls.SENDER_EMAIL, recipient_emails, msg.as_string())
            print(f"Email sent successfully to {', '.join(recipient_emails)}!")
        except Exception as e:
            print(f"Failed to send email: {e}")

# Example Usage
if __name__ == "__main__":
    EmailSender.send_email(["francoismeiring0203@gmail.com"], "Test Subject", "This is a test email.")
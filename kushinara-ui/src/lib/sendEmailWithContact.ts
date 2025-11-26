import nodemailer from "nodemailer";

export const sendEmailWithContact = async ({ fullName, email, phoneNumber, date, helpMsg }: { fullName: string, email: string, phoneNumber: string, date: string, helpMsg: string }) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `${fullName} <${email}>`,
        to: process.env.EMAIL_USER,
        subject: `Contact to ${fullName}`,
        text: `Please contact to ${fullName} through ${phoneNumber} or ${email} regarding to ${helpMsg}..`,
        html: `
            <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Contact Form Submission</title>

<style>
  body { font-family: Arial, sans-serif; background:#f7f7f7; margin:0; padding:0; }
  .container { max-width:600px; margin: 20px auto; background:#fff; border-radius:10px; overflow:hidden; }
  .header {
    background: #920c77;
    color:white; text-align:center; padding:25px 10px;
  }
  .header h2 { margin:0; font-size:24px; font-weight:700; }
  .header p { margin:5px 0 0; font-size:14px; }
  .content { padding:25px 25px 10px 25px; color:#333; font-size:15px; line-height:1.6; }
  .content strong { color:#222; }
  .btn {
    display:inline-block; text-decoration:none; background:#6a0add;
    padding:12px 28px; color:#ffffff !important; font-weight:600; border-radius:8px;
    margin-top:20px;
  }
  .footer {
    background:#eee; text-align:center; padding:18px 12px;
    font-size:13px; color:#555;
  }

  /* Responsive */
  @media (max-width:480px){
    .header h2 { font-size:20px; }
    .content { padding:20px; }
    .btn { width:100%; text-align:center; display:block; }
  }
</style>
</head>

<body>

<div class="container">
  <!-- Header -->
  <div class="header">
    <h2>Buddh Bhumi Kusinara Charitable Trust</h2>
    <p>Focused on Culture, Education, Health, and Awareness</p>
  </div>

  <!-- Content -->
  <div class="content">
    <p>Dear Admin,</p>

    <p>You have received a new contact request from your website.</p>
    <p><strong>Name:</strong> ${fullName}</p>
    <p><strong>Phone Number:</strong> ${phoneNumber}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong><br>${helpMsg}</p>
    <p>Kindly respond to the user at your earliest convenience.</p>
    <a href="https://www.websofy.com/"
       target="_blank"
       class="btn">
       View Details
    </a>

    <p style="margin-top:25px;">With regards,<br>
    <strong>Buddh Bhumi Kushinara Charitable Trust</strong></p>
  </div>

  <!-- Footer -->
  <div class="footer">
    © 2025 Buddh Bhumi Kushinara Charitable Trust — Focused on Culture, Education, Health, and Awareness
  </div>
</div>
</body>
</html>`});
};

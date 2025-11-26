import nodemailer from "nodemailer";


export const sendGreetEmail = async (fullName: string, email: string,) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Buddh Bhumi Kusinara Charitable Trust" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Congratulations and Welcome to Buddh Bhumi Kushinara Charitable Trust!",
    text: `Thank you for joining our mission at Buddh Bhumi Kushinara Charitable Trust.`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Welcome — Buddh Bhumi Kusinara Charitable Trust</title>
  <style>
    /* Reset and general styles */
    body {
      margin: 0;
      padding: 24px;
      background: #f7fafc;
      font-family: Inter, Arial, sans-serif;
    }
    table {
      border-collapse: collapse;
    }
    img {
      max-width: 100%;
      height: auto;
      display: block;
    }

    /* Responsive typography */
    h1 {
      font-size: 20px;
      margin: 0;
    }
    p {
      margin: 0 0 14px;
      line-height: 1.6;
    }

    /* CTA button */
    .cta-button {
      display: inline-block;
      background: #7e22ce;
      color: #ffffff !important;
      padding: 10px 18px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
    }

    /* Responsive tweaks */
    @media screen and (max-width: 620px) {
      body {
        padding: 12px;
      }
      .container {
        width: 100% !important;
        border-radius: 0 !important;
      }
      h1 {
        font-size: 18px !important;
      }
      p {
        font-size: 14px !important;
      }
      .cta-button {
        padding: 12px 16px;
        font-size: 14px;
      }
      td.padding {
        padding: 20px !important;
      }
    }
  </style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center">
        <!-- container -->
        <table class="container" width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,0.08);">
          <!-- header -->
          <tr>
            <td style="background:#920c77;padding:28px 20px;text-align:center;color:#ffffff;">
              <h1>Buddh Bhumi Kushinara Charitable Trust</h1>
              <p style="margin:6px 0 0;font-size:13px;opacity:.95;">Focused on Culture, Education, Health, and Awareness</p>
            </td>
          </tr>

          <!-- body -->
          <tr>
            <td class="padding" style="padding:28px 24px;color:#1f2937;">
              <p>Dear <strong>${fullName}</strong>,</p>

              <p style="color:#4b5563;">
                Thank you for joining our mission at <strong>Buddh Bhumi Kushinara Charitable Trust</strong>.
              </p>

              <p style="color:#4b5563;">
                You are now part of a community dedicated to <strong>Culture, Education, Health, and Awareness</strong> — working together to create a positive change in society.
              </p>

              <p style="color:#4b5563;">
                We’re excited to have you with us! Stay tuned for upcoming initiatives, events, and opportunities to make a difference.
              </p>

              <p style="color:#4b5563;">
                With gratitude,<br/>
                <strong>The Buddh Bhumi Kushinara Charitable Trust Team</strong>
              </p>

              <!-- optional CTA -->
              <div style="text-align:center;margin-top:8px;">
                <a href="https://www.websofy.com/" target="_blank" class="cta-button">
                  Visit Our Website
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background:#f3f4f6;padding:12px 20px;text-align:center;color:#6b7280;font-size:12px;">
              © <span id="year">2025</span> Buddh Bhumi Kushihnara Charitable Trust — Focused on Culture, Education, Health, and Awareness
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`,
  });
};

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phoneNumber, email, address, refrenceNumber, amount, transactionId, paymentMethod } = body;
    if (!name || !phoneNumber || !address || !amount || !refrenceNumber) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }


    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Donation Acknowledgment — Buddh Bhumi Kusinara Charitable Trust",
      html: `<html lang="en">
<head>
  <style>
    body {
      font-family: "Inter", Arial, sans-serif;
      margin: 0;
      padding: 24px;
      background: #f9fafb;
      color: #1f2937;
    }

    .receipt-container {
      max-width: 700px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0,0,0,0.08);
      padding: 24px;
    }

    .header {
      background: linear-gradient(90deg, #7e22ce, #a855f7, #facc15);
      color: #ffffff;
      text-align: center;
      padding: 20px 10px;
      border-radius: 8px;
    }

    .header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
    }

    .header p {
      margin: 4px 0 0;
      font-size: 13px;
      opacity: 0.95;
    }

    .section {
      margin-top: 24px;
    }

    .section-title {
      font-size: 18px;
      font-weight: 600;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 4px;
      margin-bottom: 12px;
    }

    .details {
      width: 100%;
      border-collapse: collapse;
    }

    .details td {
      padding: 8px 4px;
      font-size: 15px;
      vertical-align: top;
    }

    .details td:first-child {
      font-weight: 600;
      width: 40%;
      color: #374151;
    }

    .footer {
      text-align: center;
      margin-top: 32px;
      font-size: 13px;
      color: #6b7280;
    }

    .thankyou {
      text-align: center;
      margin-top: 16px;
      font-size: 16px;
      font-weight: 500;
      color: #4b5563;
    }

    .signature {
      margin-top: 40px;
      text-align: right;
      font-size: 15px;
      color: #374151;
    }

    /* Responsive */
    @media screen and (max-width: 640px) {
      body {
        padding: 12px;
      }
      .receipt-container {
        padding: 16px;
      }
      .header h1 {
        font-size: 18px;
      }
      .section-title {
        font-size: 16px;
      }
      .details td {
        font-size: 14px;
      }
      .thankyou {
        font-size: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="receipt-container">
    <div class="header">
      <h1>Buddh Bhumi Kusinara Charitable Trust</h1>
      <p>Focused on Culture, Education, Health, and Awareness</p>
    </div>

    <div class="section">
      <div class="section-title">Donation Receipt No. : ${generateReceiptNumber()}</div>
      <table class="details">
        <tr>
          <td>Donor Name:</td>
          <td>${name}</td>
        </tr>
        <tr>
          <td>Contact:</td>
          <td>${phoneNumber}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>${email}</td>
        </tr>
        <tr>
          <td>Date:</td>
          <td>${new Date().toLocaleDateString()}</td>
        </tr>
        <tr>
          <td>Address:</td>
          <td>${address}</td>
        </tr>
        
        <tr>
          <td>Donation Amount:</td>
          <td><strong>₹${amount}</strong></td>
        </tr>
        <tr>
          <td>Payment Method:</td>
          <td>${paymentMethod}</td>
        </tr>
        <tr>
          <td>Transaction ID:</td>
          <td>${transactionId}</td>
        </tr>
        <tr>
          <td>Purpose:</td>
          <td>Donation</td>
        </tr>
      </table>
    </div>

    <p class="thankyou">Thank you for your generous contribution!<br/>
      Your support helps us continue our mission toward Culture, Education, Health, and Awareness.</p>

    <div class="signature">
      <p><strong>Authorized Signature</strong><br/>For Buddh Bhumi Kusinara Charitable Trust</p>
    </div>

    <div class="footer">
      © 2025 Buddh Bhumi Kusinara Charitable Trust. All Rights Reserved.<br/>
      Registered Charitable Trust | Email: info@bbkct.org | Website: www.bbkct.org
    </div>
  </div>
</body>
</html>`
    };
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: "Receipt sent successfully",
    });
  } catch (err: any) {
    console.error("Email sending error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to send receipt" },
      { status: 500 }
    );
  }
}


function generateReceiptNumber() {
  const prefix = "BBKCT";
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit number
  return `${prefix}${datePart}${random}`;
}




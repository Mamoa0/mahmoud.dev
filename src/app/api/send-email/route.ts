import { NextRequest, NextResponse } from "next/server";

// ensure the file only runs on the server
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, from, subject, message, to } = await req.json();
    
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: to,
      replyTo: from,
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${from}\n\nMessage:\n${message}`,
      html: `
        <div>
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${from}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <h4>Message:</h4>
          <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
      `,
    });
    
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email", error: (error as Error).message },
      { status: 500 }
    );
  }
}
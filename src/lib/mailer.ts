import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendBookingNotification({
  name,
  email,
  mobile,
  message,
  packageTitle,
}: {
  name: string;
  email: string;
  mobile: string;
  message?: string;
  packageTitle: string | null;
}) {
  await transporter.sendMail({
    from: `"Alps Travels Website" <${process.env.GMAIL_USER}>`,
    to: process.env.ADMIN_NOTIFY_EMAIL,
    replyTo: email,
    subject: packageTitle
      ? `Nayi Enquiry — ${packageTitle}`
      : `Nayi Enquiry — General Contact`,
    html: `
      <h2>Nayi enquiry aayi hai</h2>
      <p><strong>Tour/Package:</strong> ${packageTitle ?? "General enquiry (koi specific package nahi)"}</p>
      <p><strong>Naam:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>Message:</strong> ${message || "—"}</p>
    `,
  });
}
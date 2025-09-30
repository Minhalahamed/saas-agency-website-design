import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, teamSize, message } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Get admin email from environment variable
    const adminEmail = process.env.ADMIN_EMAIL || "admin@nimbus.app";

    // Send email to admin
    const { data, error } = await resend.emails.send({
      from: "Nimbus Demo Requests <onboarding@resend.dev>",
      to: adminEmail,
      subject: `New Demo Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">
            New Demo Request Received
          </h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">Contact Information</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            ${company ? `<p style="margin: 5px 0;"><strong>Company:</strong> ${company}</p>` : ""}
            ${teamSize ? `<p style="margin: 5px 0;"><strong>Team Size:</strong> ${teamSize}</p>` : ""}
          </div>

          ${message ? `
            <div style="margin: 20px 0;">
              <h3 style="color: #555; margin-bottom: 5px;">Message</h3>
              <p style="background: #f5f5f5; padding: 15px; border-radius: 5px; line-height: 1.6;">
                ${message}
              </p>
            </div>
          ` : ""}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 12px;">
            <p>This email was sent from your Nimbus demo request form.</p>
            <p>Reply directly to ${email} to follow up with this prospect.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { error: "Failed to send email notification" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Demo request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing demo request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json();
    const { name, email, phone, interest, message } = body;

    // Validate required fields
    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Please enter your name." },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!message || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Please enter a message of at least 5 characters." },
        { status: 400 }
      );
    }

    // Log the submission to console (as specified in PRD Section 7.9)
    console.log("[Maison Oak Contact Submission]:", {
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || "Not provided",
      interest: interest || "General Inquiry",
      message: message.trim(),
    });

    /**
     * TODO: Production Integration:
     * 1. Send transactional notification email via Resend, Postmark, or SendGrid
     * 2. Synchronize lead with CRM (HubSpot, Salesforce, or Airtable)
     * 3. Forward to showroom concierge team slack webhook
     */

    return NextResponse.json({
      success: true,
      message:
        "Thank you for contacting Maison Oak. Our showroom concierge will review your inquiry and reach out within 24 hours.",
    });
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

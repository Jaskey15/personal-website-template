import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// SECURITY NOTE: Rate Limiting
// This endpoint has no rate limiting in the template for development simplicity.
// Before deploying to production, consider adding rate limiting to prevent spam:
// - Use Vercel's Edge Middleware rate limiting (if deploying to Vercel)
// - Use @upstash/ratelimit with Redis for custom solutions
// - Implement IP-based request counting
// Recommended: 5 requests per hour per IP address

// SECURITY NOTE: CORS
// Next.js API routes use same-origin policy by default in most deployments.
// If you need to call these APIs from different domains, configure CORS headers.

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send email using Resend
    // Update these email addresses with your own:
    // - from: Use your verified domain (e.g., contact@contact.yourdomain.com)
    // - to: Your personal email where you want to receive contact form submissions
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <contact@contact.yourdomain.com>',
      to: 'your.email@example.com',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `New Contact Form Submission

From: ${name}
Email: ${email}

Message:
${message}`,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InquiryRequest {
  fullName: string;
  email: string;
  whatsapp: string;
  businessName: string;
  niche: string;
  websiteGoal: string;
  websiteGoalOther?: string;
  keyFeatures?: string;
  specialRequests?: string;
  referenceStyle?: string;
}

// Logic: Basic email integrity
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Logic: Robust data validation and sanitization
function validateInquiryData(data: unknown): { valid: boolean; error?: string; data?: InquiryRequest } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: "Invalid request format" };
  }

  const inquiry = data as Record<string, unknown>;

  const requiredFields = ['fullName', 'email', 'whatsapp', 'businessName', 'niche', 'websiteGoal'];
  for (const field of requiredFields) {
    if (!inquiry[field] || typeof inquiry[field] !== 'string' || (inquiry[field] as string).trim().length === 0) {
      return { valid: false, error: `${field} is required for processing.` };
    }
  }

  if (!isValidEmail(inquiry.email as string)) {
    return { valid: false, error: "Please provide a valid contact email." };
  }

  return {
    valid: true,
    data: {
      fullName: (inquiry.fullName as string).trim(),
      email: (inquiry.email as string).trim().toLowerCase(),
      whatsapp: (inquiry.whatsapp as string).trim(),
      businessName: (inquiry.businessName as string).trim(),
      niche: (inquiry.niche as string).trim(),
      websiteGoal: (inquiry.websiteGoal as string).trim(),
      websiteGoalOther: inquiry.websiteGoalOther ? (inquiry.websiteGoalOther as string).trim() : undefined,
      keyFeatures: inquiry.keyFeatures ? (inquiry.keyFeatures as string).trim() : undefined,
      specialRequests: inquiry.specialRequests ? (inquiry.specialRequests as string).trim() : undefined,
      referenceStyle: inquiry.referenceStyle ? (inquiry.referenceStyle as string).trim() : undefined,
    }
  };
}

async function sendEmailNotification(to: string[], subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Areesha Abbas <onboarding@resend.dev>", // Verification note: update this once your domain is live
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Email dispatch failed: ${error}`);
  }

  return res.json();
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData = await req.json();
    const validation = validateInquiryData(rawData);
    
    if (!validation.valid || !validation.data) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const inquiryData = validation.data;
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Pre-generating ID to ensure frontend tracking works immediately
    const inquiryId = crypto.randomUUID();

    const { error: dbError } = await supabase
      .from("orders")
      .insert({
        id: inquiryId,
        full_name: inquiryData.fullName,
        email: inquiryData.email,
        whatsapp: inquiryData.whatsapp,
        business_name: inquiryData.businessName,
        niche: inquiryData.niche,
        website_goal: inquiryData.websiteGoal,
        website_goal_other: inquiryData.websiteGoalOther,
        key_features: inquiryData.keyFeatures,
        special_requests: inquiryData.specialRequests,
        reference_style: inquiryData.referenceStyle,
      });

    if (dbError) throw new Error("Database synchronization failed.");

    const goalText = inquiryData.websiteGoal === "other" 
      ? inquiryData.websiteGoalOther 
      : inquiryData.websiteGoal;

    // Email Template: Internal Notification
    const hostEmailHtml = `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #6366f1;">New Project Inquiry</h2>
        <p><strong>Client:</strong> ${inquiryData.fullName}</p>
        <p><strong>Business:</strong> ${inquiryData.businessName}</p>
        <p><strong>Goal:</strong> ${goalText}</p>
        <hr />
        <p>Check the admin dashboard for full technical requirements.</p>
      </div>
    `;

    await sendEmailNotification(["areeshaabbas07@gmail.com"], `🚀 New Project: ${inquiryData.businessName}`, hostEmailHtml);

    // Email Template: Client Confirmation
    try {
      const clientEmailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; padding: 40px;">
          <h1 style="color: #4f46e5; font-size: 24px;">Inquiry Received, ${inquiryData.fullName}.</h1>
          <p style="font-size: 16px; color: #4b5563; line-height: 1.6;">
            I've received your request for <strong>${inquiryData.businessName}</strong>. 
            I'm currently reviewing your requirements and will reach out shortly.
          </p>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">Inquiry Reference:</p>
            <p style="margin: 4px 0 0 0; font-family: monospace; font-weight: bold;">${inquiryId}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            Best regards,<br />
            <strong>Areesha Abbas</strong><br />
            AI Solutions & Web Development
          </p>
        </div>
      `;

      await sendEmailNotification([inquiryData.email], "Project Inquiry Received | Areesha Abbas", clientEmailHtml);
    } catch (e) {
      console.log("Client email skipped (domain verification pending)");
    }

    return new Response(
      JSON.stringify({ success: true, inquiryId }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Request failed" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
const requiredFields = [
  "name",
  "businessName",
  "email",
  "industry",
  "objective",
  "contentNeeded",
] as const;

type EnquiryPayload = Record<string, unknown> & {
  consent?: boolean;
  company?: string;
};

export async function POST(request: Request) {
  let payload: EnquiryPayload;

  try {
    payload = (await request.json()) as EnquiryPayload;
  } catch {
    return Response.json({ error: "Invalid enquiry data." }, { status: 400 });
  }

  if (payload.company) {
    return Response.json({ ok: true });
  }

  const missingField = requiredFields.find((field) => {
    const value = payload[field];
    return typeof value !== "string" || value.trim() === "";
  });

  if (missingField || payload.consent !== true) {
    return Response.json(
      { error: "Please complete all required fields and consent to contact." },
      { status: 400 }
    );
  }

  const email = String(payload.email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhookUrl) {
    return Response.json(
      {
        error:
          "Online enquiries are not configured yet. Please use the direct email option.",
      },
      { status: 503 }
    );
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.ENQUIRY_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        ...payload,
        submittedAt: new Date().toISOString(),
        source: "cabijstudio.co",
      }),
      cache: "no-store",
    });

    if (!webhookResponse.ok) {
      throw new Error(`Webhook returned ${webhookResponse.status}`);
    }
  } catch {
    return Response.json(
      {
        error:
          "The enquiry service is temporarily unavailable. Please email us directly.",
      },
      { status: 502 }
    );
  }

  return Response.json({ ok: true }, { status: 201 });
}

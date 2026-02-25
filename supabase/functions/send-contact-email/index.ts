import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const CONTACT_EMAIL = Deno.env.get("CONTACT_EMAIL") || "contact@example.com";

    if (!RESEND_API_KEY) {
      console.log("RESEND_API_KEY not configured, skipping email");
      return new Response(
        JSON.stringify({ success: false, message: "Email not configured" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { form_type, name, email, phone, message, budget, property_type, desired_location, desired_surface, timeline } = body;

    const isMandat = form_type === "mandat_recherche";
    const subject = isMandat
      ? `🔍 Nouveau mandat de recherche - ${name}`
      : `📩 Nouveau message de contact - ${name}`;

    let htmlContent = `
      <h2>${isMandat ? "Nouveau mandat de recherche" : "Nouveau message de contact"}</h2>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Email :</strong> ${email}</p>
      ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ""}
    `;

    if (isMandat) {
      htmlContent += `
        <hr />
        <h3>Détails du projet</h3>
        ${property_type ? `<p><strong>Type de bien :</strong> ${property_type}</p>` : ""}
        ${budget ? `<p><strong>Budget :</strong> ${budget}</p>` : ""}
        ${desired_location ? `<p><strong>Localisation :</strong> ${desired_location}</p>` : ""}
        ${desired_surface ? `<p><strong>Surface :</strong> ${desired_surface}</p>` : ""}
        ${timeline ? `<p><strong>Délai :</strong> ${timeline}</p>` : ""}
      `;
    }

    if (message) {
      htmlContent += `<hr /><h3>Message</h3><p>${message}</p>`;
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Formulaire <onboarding@resend.dev>",
        to: [CONTACT_EMAIL],
        subject,
        html: htmlContent,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Relais « Nouvelle demande du site ».
// Le site l'appelle après chaque formulaire. Elle ne fait que prévenir le CRM
// (https://emilio-immo-chasseimmo.vercel.app), qui relit lui-même les demandes
// pas encore annoncées dans contact_submissions et envoie le mail par Mailjet.
// Aucune clé ici, et rien de ce que le navigateur envoie n'est utilisé :
// l'appeler en boucle n'envoie aucun mail de plus.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const CRM = Deno.env.get("CRM_URL") || "https://emilio-immo-chasseimmo.vercel.app";

const reponse = (corps: unknown) =>
  new Response(JSON.stringify(corps), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const r = await fetch(`${CRM}/api/demandes-site/notifier`, { method: "POST" });
    const corps = await r.json().catch(() => ({}));
    if (!r.ok) console.error("CRM", r.status, corps);
    return reponse({ success: r.ok, ...corps });
  } catch (e) {
    // Jamais d'erreur pour le visiteur : sa demande est déjà enregistrée.
    console.error("CRM injoignable", e);
    return reponse({ success: false, message: String(e) });
  }
});

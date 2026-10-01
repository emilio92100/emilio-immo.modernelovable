/* Fenêtre « Demande d'informations » : ouverte par tous les boutons de contact du site.
   Les demandes arrivent dans le CRM (table contact_submissions → onglet « Demandes du site »). */
import { useRef, useState } from "react";
import { CheckCircle2, Phone, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { checkSubmission, honeypotFieldName, honeypotStyle, markSubmitted } from "@/lib/antiBot";
import { useToast } from "@/hooks/use-toast";
import { ModalShell, TeamStack } from "./ModalShell";
import { Btn, TEL, TEL_HREF } from "./ui";
import { Consent, Field, Pills } from "./form";
import type { ContactObjet, ContactPrefill } from "./SiteModals";
import alexandre from "@/assets/refonte/alexandre-detoure.webp";

const OBJETS: ContactObjet[] = ["Vendre", "Acheter", "Estimer", "Visiter un bien", "Autre"];

export default function ContactModal({ open, onClose, prefill }: { open: boolean; onClose: () => void; prefill: ContactPrefill }) {
  const { toast } = useToast();
  const [objet, setObjet] = useState<ContactObjet>(prefill.objet || (prefill.propertyRef ? "Visiter un bien" : "Vendre"));
  const [f, setF] = useState({ prenom: "", nom: "", tel: "", email: "", message: prefill.message || "" });
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const startedAt = useRef(Date.now());

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF((p) => ({ ...p, [k]: e.target.value }));
  const canSend = f.prenom.trim() && f.nom.trim() && f.email.trim() && f.tel.trim() && consent;

  const send = async () => {
    if (!canSend || sending) return;
    const name = `${f.prenom.trim()} ${f.nom.trim()}`;
    const check = checkSubmission({ honeypot, startedAt: startedAt.current, name, email: f.email, phone: f.tel, requirePhone: true });
    if (!check.ok) {
      if (check.silent) return setDone(true);
      toast({ title: "Vérification", description: check.reason, variant: "destructive" });
      return;
    }
    setSending(true);
    const surBien = !!prefill.propertyRef;
    const message = [`Objet : ${objet}`, prefill.propertyRef ? `Bien : ${prefill.propertyTitle || ""} (Réf. ${prefill.propertyRef})` : null, f.message.trim() ? `Message : ${f.message.trim()}` : null].filter(Boolean).join("\n");
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        form_type: surBien ? "rappel_bien" : "contact",
        name,
        email: f.email.trim(),
        phone: f.tel.trim(),
        message,
        property_ref: prefill.propertyRef || null,
        property_title: prefill.propertyTitle || null,
      });
      if (error) throw error;
      markSubmitted();
      try {
        await supabase.functions.invoke("send-contact-email", { body: { form_type: surBien ? "rappel_bien" : "contact", name, email: f.email, phone: f.tel, message } });
      } catch {
        /* le CRM relit la table de toute façon */
      }
      setDone(true);
    } catch {
      toast({ title: "Erreur", description: "L’envoi n’a pas abouti. Réessayez, ou appelez-nous au " + TEL + ".", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <ModalShell open={open} onClose={onClose} title="Demande d’informations">
      {done ? (
        <div className="flex flex-col items-center gap-4 px-2 py-10 text-center">
          <CheckCircle2 className="h-16 w-16 text-[#2E9A66]" strokeWidth={1.6} />
          <h2 className="m-0 font-display text-[28px] font-medium text-brand-ink">Merci {f.prenom.trim() || ""}, c’est bien reçu</h2>
          <p className="m-0 max-w-[420px] text-[15.5px] leading-relaxed text-brand-txt">Un membre de l’équipe vous répond rapidement, par téléphone ou par e-mail.</p>
          <Btn variant="outline" onClick={onClose}>Fermer</Btn>
        </div>
      ) : (
        <div className="flex flex-col gap-[18px]">
          <div className="flex items-center gap-3.5 pr-12">
            <TeamStack photo={alexandre} />
            <div className="flex flex-col gap-0.5">
              <h2 className="m-0 font-display text-[24px] font-medium leading-tight text-brand-ink sm:text-[28px]">Demande d’informations</h2>
              <span className="text-sm text-brand-mut">Un membre de l’équipe vous répond rapidement.</span>
            </div>
          </div>
          {prefill.propertyTitle && (
            <div className="rounded-xl border border-brand-line bg-brand-pale px-3.5 py-2.5 text-sm text-brand-txt">
              Bien concerné : <strong className="text-brand-ink">{prefill.propertyTitle}</strong>
            </div>
          )}
          <div className="flex flex-col gap-2.5">
            <span className="text-sm font-extrabold text-brand-ink">Votre demande concerne</span>
            <Pills options={OBJETS} value={[objet]} onToggle={(v) => setObjet(v as ContactObjet)} size="sm" />
          </div>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <Field label="Prénom" placeholder="Votre prénom" autoComplete="given-name" value={f.prenom} onChange={set("prenom")} />
            <Field label="Nom" placeholder="Votre nom" autoComplete="family-name" value={f.nom} onChange={set("nom")} />
            <Field label="Téléphone" placeholder="06 12 34 56 78" type="tel" inputMode="tel" autoComplete="tel" value={f.tel} onChange={set("tel")} />
            <Field label="E-mail" placeholder="vous@exemple.fr" type="email" inputMode="email" autoComplete="email" value={f.email} onChange={set("email")} />
            <Field area className="sm:col-span-2" label="Votre message" placeholder="Dites-nous en quelques mots ce que vous cherchez ou ce que vous souhaitez savoir." value={f.message} onChange={set("message") as never} />
          </div>
          <input type="text" name={honeypotFieldName} tabIndex={-1} autoComplete="off" aria-hidden style={honeypotStyle} value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          <Consent checked={consent} onChange={setConsent}>J’accepte qu’Emilio Immobilier utilise ces informations pour me recontacter.</Consent>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <a href={TEL_HREF} className="inline-flex min-h-[44px] items-center gap-2 text-[15px] font-bold text-brand">
              <Phone className="h-4 w-4 text-brand-orange-text" /> {TEL}
            </a>
            <Btn onClick={send} disabled={!canSend || sending} icon={<Send className="h-4 w-4" />}>
              {sending ? "Envoi…" : "Envoyer ma demande"}
            </Btn>
          </div>
        </div>
      )}
    </ModalShell>
  );
}

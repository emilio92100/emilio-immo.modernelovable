/* Fenêtre « Nous écrire » / « Demander une visite » / « Poser une question ».
   Sur téléphone, un panneau qui monte du bas : tout tient sur l’écran, le bouton d’envoi reste visible.
   Les demandes arrivent dans le CRM (table contact_submissions → onglet « Demandes du site »). */
import { useRef, useState } from "react";
import { ArrowRight, CalendarDays, MessageCircle, Phone, Plus, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { checkSubmission, honeypotFieldName, honeypotStyle, markSubmitted } from "@/lib/antiBot";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { BoutonEnvoi, CocheEnvoyee, ModalShell, TeamStack } from "./ModalShell";
import { TEL, TEL_HREF } from "./ui";
import { Consent, Field, toggleIn } from "./form";
import type { ContactObjet, ContactPrefill } from "./SiteModals";
import alexandre from "@/assets/refonte/alexandre-detoure.webp";

const OBJETS: ContactObjet[] = ["Vendre", "Acheter", "Estimer", "Visiter un bien", "Autre"];
const DISPOS = ["En semaine", "En soirée", "Le samedi"] as const;
/* Le message prérempli par les boutons ne sert qu’à dire de quoi il s’agit : on ne l’affiche pas tel quel. */
const MESSAGES_TYPES = ["Je souhaite visiter ce bien.", "J’ai une question sur ce bien : "];

export default function ContactModal({ open, onClose, prefill }: { open: boolean; onClose: () => void; prefill: ContactPrefill }) {
  const { toast } = useToast();
  const surBien = !!prefill.propertyRef;
  const [objet, setObjet] = useState<ContactObjet>(prefill.objet || (surBien ? "Visiter un bien" : "Vendre"));
  const messageInitial = MESSAGES_TYPES.includes(prefill.message || "") ? "" : prefill.message || "";
  const [f, setF] = useState({ prenom: "", nom: "", tel: "", email: "", message: messageInitial });
  const [dispos, setDispos] = useState<string[]>([]);
  const [avecMessage, setAvecMessage] = useState(!!messageInitial);
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const startedAt = useRef(Date.now());

  const visite = objet === "Visiter un bien";
  const question = surBien && !visite;
  const titre = visite && surBien ? "Demander une visite" : question ? "Poser une question" : "Nous écrire";
  const montrerMessage = !visite || avecMessage || !surBien;

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF((p) => ({ ...p, [k]: e.target.value }));
  const manque = !f.prenom.trim() || !f.nom.trim() ? "votre prénom et votre nom" : !f.tel.trim() ? "votre téléphone" : !f.email.trim() ? "votre e-mail" : question && !f.message.trim() ? "votre question" : !consent ? "la case d’accord" : "";
  const canSend = !manque;

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
    const message = [
      `Objet : ${surBien ? (visite ? "Demande de visite" : "Question sur le bien") : objet}`,
      surBien ? `Bien : ${prefill.propertyTitle || ""} (Réf. ${prefill.propertyRef})` : null,
      visite && dispos.length ? `Disponibilités : ${dispos.join(", ")}` : null,
      f.message.trim() ? `Message : ${f.message.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");
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

  const footer = done ? (
    <button type="button" onClick={onClose} className="inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-brand text-[15.5px] font-extrabold text-white">
      C’est noté, fermer
    </button>
  ) : (
    <div className="flex flex-col gap-2.5">
      <div className="[&_label]:text-[12.5px] [&_label]:leading-snug">
        <Consent checked={consent} onChange={setConsent}>J’accepte qu’Emilio Immobilier utilise ces informations pour me recontacter.</Consent>
      </div>
      <div className="flex items-center gap-2">
        <a href={TEL_HREF} aria-label={`Appeler l’agence au ${TEL}`} className="inline-flex h-[54px] w-[54px] flex-none items-center justify-center gap-2 rounded-2xl bg-brand-surf text-brand sm:w-auto sm:px-4 sm:text-[15px] sm:font-bold">
          <Phone className="h-[18px] w-[18px]" /> <span className="hidden sm:inline">{TEL}</span>
        </a>
        <BoutonEnvoi onClick={send} disabled={!canSend} sending={sending} icon={<Send className="h-[17px] w-[17px] flex-none" />} className="flex-1 sm:ml-auto sm:flex-none">
          Envoyer ma demande
        </BoutonEnvoi>
      </div>
      {!canSend && !sending && <span className="text-center text-[12.5px] text-brand-mut sm:text-right">Il manque {manque}.</span>}
    </div>
  );

  return (
    <ModalShell open={open} onClose={onClose} title={titre} footer={footer}>
      {done ? (
        <div className="flex flex-col items-center gap-3 px-1 pb-2 pt-6 text-center sm:pt-4">
          <CocheEnvoyee />
          <h2 className="envoye-monte m-0 mt-2 text-[24px] font-extrabold tracking-[-0.02em] text-brand-ink sm:text-[28px]" style={{ animationDelay: ".55s" }}>
            C’est envoyé{f.prenom.trim() ? `, merci ${f.prenom.trim()}` : ""} !
          </h2>
          <p className="envoye-monte m-0 max-w-[420px] text-[15px] leading-relaxed text-brand-txt" style={{ animationDelay: ".65s" }}>
            {visite && surBien
              ? "Alexandre ou un membre de l’équipe vous rappelle très vite pour fixer le jour et l’heure de la visite."
              : "Un membre de l’équipe vous répond rapidement, par téléphone ou par e-mail."}
          </p>
          {surBien && (
            <div className="envoye-monte mt-2 w-full max-w-[420px]" style={{ animationDelay: ".75s" }}>
              <BienResume prefill={prefill} />
            </div>
          )}
          <div className="envoye-monte mt-2 flex items-center gap-3 rounded-2xl bg-brand-surf px-4 py-3 text-left" style={{ animationDelay: ".85s" }}>
            <TeamStack photo={alexandre} size={34} />
            <span className="text-[13.5px] leading-snug text-brand-txt">
              Une urgence ? Appelez-nous au <a href={TEL_HREF} className="font-extrabold text-brand">{TEL}</a>
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3.5 sm:gap-[18px]">
          <div className="flex items-center gap-3 pr-12">
            <TeamStack photo={alexandre} size={38} />
            <div className="flex min-w-0 flex-col">
              <h2 className="m-0 text-[20px] font-extrabold leading-tight tracking-[-0.02em] text-brand-ink sm:text-[26px]">{titre}</h2>
              <span className="text-[13px] text-brand-mut sm:text-sm">On vous répond rapidement.</span>
            </div>
          </div>

          {surBien ? (
            <>
              <BienResume prefill={prefill} />
              {/* Visite ou question : on peut changer d’avis sans fermer */}
              <div role="group" aria-label="Votre demande" className="relative grid grid-cols-2 rounded-2xl bg-brand-surf p-1">
                <span aria-hidden className={cn("absolute bottom-1 top-1 w-[calc(50%-4px)] rounded-xl bg-white shadow-[0_4px_12px_-6px_rgba(19,36,61,0.45)] transition-transform duration-300 ease-out", visite ? "translate-x-1" : "translate-x-[calc(100%+4px)]")} />
                {(
                  [
                    ["Visiter un bien", "Une visite", CalendarDays],
                    ["Autre", "Une question", MessageCircle],
                  ] as const
                ).map(([k, t, I]) => (
                  <button key={k} type="button" aria-pressed={objet === k} onClick={() => setObjet(k)} className={cn("relative z-[1] inline-flex h-11 items-center justify-center gap-2 rounded-xl text-[14.5px] font-bold transition-colors", objet === k ? "text-brand-ink" : "text-brand-mut")}>
                    <I className={cn("h-4 w-4", objet === k ? "text-brand" : "")} /> {t}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-[13.5px] font-extrabold text-brand-ink">Votre demande concerne</span>
              <div className="no-scrollbar -mx-[18px] flex gap-1.5 overflow-x-auto px-[18px] sm:mx-0 sm:flex-wrap sm:px-0">
                {OBJETS.map((o) => (
                  <button key={o} type="button" aria-pressed={objet === o} onClick={() => setObjet(o)} className={cn("inline-flex h-10 flex-none items-center rounded-full px-3.5 text-[13.5px] font-bold transition", objet === o ? "bg-brand text-white" : "bg-brand-surf text-brand-ink")}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          )}

          {visite && surBien && (
            <div className="flex flex-col gap-2">
              <span className="text-[13.5px] font-extrabold text-brand-ink">
                Quand êtes-vous disponible ? <span className="font-semibold text-brand-mut">(facultatif)</span>
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {DISPOS.map((d) => {
                  const on = dispos.includes(d);
                  return (
                    <button key={d} type="button" aria-pressed={on} onClick={() => setDispos(toggleIn(dispos, d))} className={cn("h-10 rounded-xl border-[1.5px] text-[13px] font-bold transition", on ? "border-brand bg-brand text-white" : "border-brand-line bg-white text-brand-ink")}>
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <Field label="Prénom" placeholder="Votre prénom" autoComplete="given-name" value={f.prenom} onChange={set("prenom")} />
            <Field label="Nom" placeholder="Votre nom" autoComplete="family-name" value={f.nom} onChange={set("nom")} />
            <Field className="col-span-2 sm:col-span-1" label="Téléphone" placeholder="06 12 34 56 78" type="tel" inputMode="tel" autoComplete="tel" value={f.tel} onChange={set("tel")} />
            <Field className="col-span-2 sm:col-span-1" label="E-mail" placeholder="vous@exemple.fr" type="email" inputMode="email" autoComplete="email" value={f.email} onChange={set("email")} />
            {montrerMessage ? (
              <Field
                area
                lignes={question ? 3 : 2}
                className="col-span-2"
                label={question ? "Votre question" : "Votre message (facultatif)"}
                placeholder={question ? "Ex. : la cave est-elle comprise ? Y a-t-il des travaux prévus ?" : "Dites-nous en quelques mots ce que vous cherchez ou ce que vous souhaitez savoir."}
                value={f.message}
                onChange={set("message") as never}
              />
            ) : (
              <button type="button" onClick={() => setAvecMessage(true)} className="col-span-2 inline-flex min-h-[40px] items-center gap-1.5 self-start text-[14px] font-bold text-brand">
                <Plus className="h-4 w-4" /> Ajouter un message
              </button>
            )}
          </div>
          <input type="text" name={honeypotFieldName} tabIndex={-1} autoComplete="off" aria-hidden style={honeypotStyle} value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </div>
      )}
    </ModalShell>
  );
}

/** Le bien concerné, en petit : photo, titre, prix. */
const BienResume = ({ prefill }: { prefill: ContactPrefill }) => (
  <div className="flex items-center gap-3 rounded-2xl border border-brand-line bg-white p-2 pr-3 text-left">
    {prefill.propertyImage ? (
      <img src={prefill.propertyImage} alt="" className="h-14 w-16 flex-none rounded-xl object-cover" />
    ) : (
      <span className="grid h-14 w-16 flex-none place-items-center rounded-xl bg-brand-sky text-brand">
        <ArrowRight className="h-4 w-4" />
      </span>
    )}
    <span className="flex min-w-0 flex-col leading-tight">
      <span className="truncate text-[14.5px] font-extrabold text-brand-ink">{prefill.propertyTitle}</span>
      <span className="mt-0.5 text-[13px] font-semibold text-brand-mut">
        {prefill.propertyPrice ? `${prefill.propertyPrice} · ` : ""}Réf. {prefill.propertyRef}
      </span>
    </span>
  </div>
);

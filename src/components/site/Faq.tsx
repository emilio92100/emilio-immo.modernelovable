/* Questions fréquentes : chaque réponse s’ouvre en douceur ; même fermée, elle reste dans la page (bon pour Google). */
import { useId, useState, type ReactNode } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, SectionHead, TEL, TEL_HREF } from "@/components/site/ui";
import alexandre from "@/assets/refonte/alexandre-detoure.webp";

export type QA = { q: string; a: ReactNode };

/** Une question : s’ouvre et se referme en douceur (la hauteur suit, la réponse apparaît en fondu). */
const FaqItem = ({ it, ouvertAuDepart }: { it: QA; ouvertAuDepart: boolean }) => {
  const [ouvert, setOuvert] = useState(ouvertAuDepart);
  const id = useId();
  return (
    <div className={cn("rounded-2xl border bg-white transition-colors duration-500", ouvert ? "border-brand-orange/50" : "border-brand-line")}>
      <button
        type="button"
        onClick={() => setOuvert((o) => !o)}
        aria-expanded={ouvert}
        aria-controls={id}
        className="flex min-h-[64px] w-full cursor-pointer items-center justify-between gap-4 rounded-2xl px-[22px] py-3 text-left text-[16.5px] font-bold text-brand-ink"
      >
        <span>{it.q}</span>
        <span className={cn("grid h-8 w-8 flex-none place-items-center rounded-full bg-brand-tint text-brand transition-transform duration-500 [transition-timing-function:cubic-bezier(.22,.8,.24,1)] motion-reduce:transition-none", ouvert && "rotate-180")}>
          <ChevronDown className="h-[18px] w-[18px]" />
        </span>
      </button>
      <div
        id={id}
        aria-hidden={!ouvert}
        className={cn(
          "grid transition-[grid-template-rows,opacity] motion-reduce:transition-none",
          ouvert ? "grid-rows-[1fr] opacity-100 duration-500 [transition-timing-function:cubic-bezier(.22,.8,.24,1)]" : "grid-rows-[0fr] opacity-0 [transition-duration:480ms] [transition-timing-function:cubic-bezier(.45,0,.25,1)]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={cn(
              "max-w-[760px] px-[22px] pb-[22px] text-[15.5px] leading-relaxed text-brand-txt text-pretty transition-transform duration-500 [transition-timing-function:cubic-bezier(.22,.8,.24,1)] motion-reduce:transition-none",
              ouvert ? "translate-y-0" : "-translate-y-2",
            )}
          >
            {it.a}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FaqList = ({ items, className }: { items: QA[]; className?: string }) => (
  <div className={cn("flex min-w-0 flex-col gap-3", className)}>
    {items.map((it, i) => <FaqItem key={i} it={it} ouvertAuDepart={i === 0} />)}
  </div>
);

/** Section FAQ complète : titre à gauche, questions à droite, encart téléphone. */
export const FaqSection = ({ eyebrow = "Questions fréquentes", title, items, tone = "pale", id = "faq" }: { eyebrow?: string; title: ReactNode; items: QA[]; tone?: "pale" | "white"; id?: string }) => (
  <section id={id} className={tone === "pale" ? "bg-brand-pale" : "bg-white"}>
    <Container className="flex flex-wrap items-start gap-x-16 gap-y-10 py-14 md:py-[96px]">
      <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-[26px]">
        <SectionHead eyebrow={eyebrow} title={title} />
        <div className="flex items-center gap-4 rounded-2xl bg-brand p-[22px]">
          <span className="block h-[60px] w-[60px] flex-none overflow-hidden rounded-full bg-brand-tint">
            <img src={alexandre} alt="" loading="lazy" className="block h-[88px] w-[60px] object-cover object-top" />
          </span>
          <span className="flex flex-col gap-0.5">
            <span className="text-[15px] text-brand-bt">Une autre question ?</span>
            <a href={TEL_HREF} className="inline-flex min-h-[44px] items-center gap-2 text-lg font-extrabold text-white"><Phone className="h-[17px] w-[17px] text-brand-orange" />{TEL}</a>
          </span>
        </div>
      </div>
      <FaqList items={items} className="flex-[1.6_1_520px]" />
    </Container>
  </section>
);

/** JSON-LD FAQPage à partir de questions en texte simple. */
export const faqJsonLd = (items: { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

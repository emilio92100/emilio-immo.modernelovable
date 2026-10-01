/* Sections de l'accueil (et reprises sur d'autres pages) */
import { Link } from "react-router-dom";
import { ArrowRight, Camera, EyeOff, Handshake, Home, KeyRound, LineChart, Lock, Megaphone, Phone, Quote, Route, ShieldCheck, Star, Target, Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteModals } from "@/components/site/SiteModals";
import { Btn, Checks, Container, Em, FRAME_SHADOW, SectionHead, TEL, TEL_HREF, TextLink } from "@/components/site/ui";
import { TeamStack } from "@/components/site/ModalShell";
import { AVIS, AVIS_GOOGLE_URL } from "@/data/avis";
import facade from "@/assets/refonte/paris-facade-eiffel.webp";
import alexandre from "@/assets/refonte/alexandre-detoure.webp";

/* ── Vente confidentielle (bleu) ── */
export const Confidential = () => {
  const { openContact } = useSiteModals();
  const pts = [
    { icon: <EyeOff className="h-5 w-5" />, t: "Aucune annonce en ligne", d: "Votre bien n’apparaît sur aucun portail." },
    { icon: <ShieldCheck className="h-5 w-5" />, t: "Des acquéreurs vérifiés", d: "Présenté seulement à des acheteurs dont le projet et le financement sont vérifiés." },
    { icon: <Users className="h-5 w-5" />, t: "Notre réseau off-market", d: "Des acheteurs et des confrères avec qui nous travaillons en direct." },
  ];
  return (
    <section id="confidentiel" className="bg-brand">
      <Container className="grid grid-cols-1 items-center gap-x-20 gap-y-8 py-12 md:grid-cols-2 md:py-[92px]">
        <div className="relative mx-auto w-full max-w-[560px]">
          <span aria-hidden className="absolute -bottom-[22px] -right-[22px] left-[22px] top-[22px] hidden rounded-[28px] border-[1.5px] border-[rgba(242,178,102,0.7)] md:block" />
          <div className="relative rounded-[26px] bg-white p-3 shadow-[0_50px_90px_-40px_rgba(0,0,0,0.6)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-brand-tint">
              <img src={facade} alt="Immeubles haussmanniens et tour Eiffel, à Paris" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center" />
            </div>
            <div className="flex items-center gap-3 px-2.5 pb-1 pt-3.5">
              <span className="grid h-[38px] w-[38px] flex-none place-items-center rounded-xl bg-brand text-brand-orange"><Lock className="h-[18px] w-[18px]" /></span>
              <span className="flex flex-col leading-snug">
                <span className="text-[15px] font-extrabold text-brand-ink">Présenté sans annonce</span>
                <span className="text-[13.5px] text-brand-mut">Seulement à des acquéreurs vérifiés</span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-[26px]">
          <SectionHead dark eyebrow="Vente confidentielle" title={<>Vendez votre bien en toute <Em dark>discrétion</Em></>} lead="Vous préférez vendre sans vous afficher ? Votre bien est présenté uniquement à des acquéreurs vérifiés, sans aucune annonce en ligne." />
          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {pts.map((p) => (
              <li key={p.t} className="flex items-start gap-3.5">
                <span className="grid h-[42px] w-[42px] flex-none place-items-center rounded-xl bg-white/10 text-brand-orange">{p.icon}</span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[16.5px] font-bold text-white">{p.t}</span>
                  <span className="text-[15px] leading-normal text-brand-bt">{p.d}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-1">
            <Btn onClick={() => openContact({ objet: "Vendre", message: "Je souhaite vendre en toute discrétion (vente confidentielle)." })} icon={<ArrowRight className="h-[18px] w-[18px]" />}>En parler en toute discrétion</Btn>
            <Btn href={TEL_HREF} variant="ghost" iconLeft={<Phone className="h-[18px] w-[18px]" />}>{TEL}</Btn>
          </div>
        </div>
      </Container>
    </section>
  );
};

/* ── Services : un seul interlocuteur ── */
export const Services = ({ tone = "white" }: { tone?: "white" | "pale" }) => {
  const { openEstimation } = useSiteModals();
  const cards = [
    { n: "01", icon: <LineChart className="h-[26px] w-[26px]" />, t: "Estimer", d: "Connaître le juste prix de votre bien, avant de décider quoi que ce soit.", items: ["Visite sur place", "Analyse des ventes comparables du quartier", "Rapport d’estimation détaillé"], tag: "Gratuit et sans engagement", cta: <Btn full onClick={() => openEstimation()} icon={<ArrowRight className="h-[18px] w-[18px]" />}>Demander une estimation</Btn> },
    { n: "02", icon: <Home className="h-[26px] w-[26px]" />, t: "Vendre", d: "Une vente préparée, suivie et expliquée, étape par étape.", items: ["Photos professionnelles et vidéo drone", "Diffusion portails et réseau off-market", "Compte-rendu après chaque visite"], tag: "Un point chaque semaine", cta: <Btn full to="/vendre" variant="blue" icon={<ArrowRight className="h-[18px] w-[18px]" />}>Vendre avec Emilio</Btn> },
    { n: "03", icon: <KeyRound className="h-[26px] w-[26px]" />, t: "Acheter", d: "Un chasseur qui cherche pour vous, et qui reste de votre côté.", items: ["Biens off-market et réseau de confrères", "Étude du dossier et de la copropriété", "Un espace client rien que pour vous"], tag: "Votre appli de recherche", cta: <Btn full to="/acheter" variant="outline" icon={<ArrowRight className="h-[18px] w-[18px]" />}>Confier ma recherche</Btn> },
  ];
  const steps = [
    { icon: <LineChart className="h-[22px] w-[22px]" />, t: "Estimation gratuite" },
    { icon: <Camera className="h-[22px] w-[22px]" />, t: "Mise en valeur" },
    { icon: <Target className="h-[22px] w-[22px]" />, t: "Stratégie de commercialisation" },
    { icon: <Megaphone className="h-[22px] w-[22px]" />, t: "Diffusion multi-canal" },
    { icon: <Handshake className="h-[22px] w-[22px]" />, t: "Sélection & négociation" },
    { icon: <KeyRound className="h-[22px] w-[22px]" />, t: "Accompagnement jusqu’aux clés" },
  ];
  return (
    <section id="services" className={cn(tone === "pale" ? "bg-brand-pale" : "bg-white", "max-md:bg-brand-pale")}>
      <Container className="flex flex-col gap-7 py-12 md:gap-8 md:py-[88px]">
        <SectionHead center eyebrow="Nos services" title={<>Estimer, vendre, acheter{"\u00a0"}: <Em>un seul interlocuteur</Em></>} lead="Que vous vendiez, cherchiez ou vouliez simplement connaître la valeur de votre bien, Alexandre ou un membre de l’équipe vous suit du début à la fin." className="max-w-[820px]" />
        <div className={cn("flex max-w-full items-center gap-3.5 self-center rounded-full bg-white py-1.5 pl-1.5 pr-5", FRAME_SHADOW)}>
          <TeamStack photo={alexandre} size={46} />
          <span className="text-sm leading-snug text-brand-txt md:text-[15px]"><strong className="text-brand-ink">Une petite équipe, un interlocuteur dédié</strong> qui vous suit du premier rendez-vous à la signature.</span>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <article key={c.n} className={cn("flex flex-col rounded-[22px] bg-white p-2.5 transition-transform duration-300 hover:-translate-y-1", FRAME_SHADOW)}>
              <div className="relative flex items-start justify-between overflow-hidden rounded-2xl bg-brand-pale px-[22px] pb-5 pt-[22px]">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white shadow-[0_12px_24px_-12px_rgba(19,36,61,0.8)]">{c.icon}</span>
                <span className="font-display text-[64px] italic leading-[0.8] text-brand-orange-lt/90">{c.n}</span>
                <span className="absolute bottom-0 left-[22px] h-[3px] w-11 rounded-t bg-brand-orange" />
              </div>
              <div className="flex flex-1 flex-col gap-4 px-5 pb-5 pt-[22px]">
                <div className="flex flex-col gap-2">
                  <h3 className="m-0 font-display text-[30px] font-medium text-brand-ink">{c.t}</h3>
                  <p className="m-0 text-base leading-relaxed text-brand-txt text-pretty">{c.d}</p>
                </div>
                <Checks items={c.items} />
                <span className="inline-flex h-[30px] items-center self-start rounded-full bg-[#FFF1DF] px-3 text-[13px] font-extrabold text-[#8A4A07]">{c.tag}</span>
                <div className="mt-auto pt-1">{c.cta}</div>
              </div>
            </article>
          ))}
        </div>
        <div className={cn("flex flex-col gap-[26px] rounded-[22px] bg-white px-5 py-6 md:px-[34px] md:pb-[34px] md:pt-[30px]", FRAME_SHADOW)}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="m-0 font-display text-2xl font-medium text-brand-ink md:text-[28px]">Votre vente, <Em>étape par étape</Em></h3>
            <TextLink to="/vendre">Voir le détail de la vente</TextLink>
          </div>
          <ol className="relative m-0 grid list-none grid-cols-1 gap-3.5 p-0 md:grid-cols-6 md:gap-4">
            <span aria-hidden className="absolute left-[8%] right-[8%] top-[27px] hidden h-0.5 bg-[repeating-linear-gradient(90deg,#C3CEDB_0_8px,transparent_8px_14px)] md:block" />
            {steps.map((s, i) => (
              <li key={s.t} className="relative z-[1] flex flex-row items-center gap-3.5 md:flex-col md:gap-3 md:text-center">
                <span className={cn("grid h-[54px] w-[54px] flex-none place-items-center rounded-full", i === 0 ? "bg-brand-orange text-brand-ink shadow-[0_0_0_2px_#E68B23,0_10px_20px_-12px_rgba(19,36,61,0.5)]" : "bg-white text-brand shadow-[0_0_0_1.5px_#C3CEDB,0_10px_20px_-12px_rgba(19,36,61,0.5)]")}>{s.icon}</span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-display text-lg italic leading-none text-brand-orange-lt">0{i + 1}</span>
                  <span className="text-[15px] font-bold leading-snug text-brand-ink">{s.t}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
};

/* ── Alexandre et l'agence ── */
export const AboutAlexandre = () => {
  const facts = [
    { icon: <Users className="h-[19px] w-[19px]" />, t: "Une équipe de cinq collaborateurs", d: "autour d’Alexandre, avec un interlocuteur dédié pour chaque client" },
    { icon: <Clock className="h-[19px] w-[19px]" />, t: "Joignable 7 j/7", d: "par téléphone ou par e-mail" },
    { icon: <Route className="h-[19px] w-[19px]" />, t: "Plusieurs agences avant 2020", d: "des réseaux généralistes à l’immobilier de prestige" },
  ];
  return (
    <section id="agence" className="bg-white">
      <Container className="grid grid-cols-1 items-center gap-x-16 gap-y-8 py-12 md:grid-cols-2 md:py-[100px]">
        <div className="relative h-[330px] overflow-hidden rounded-[14px] bg-brand-tint md:h-[580px]">
          <span aria-hidden className="absolute left-1/2 top-9 h-[250px] w-[250px] -translate-x-1/2 rounded-full border-[1.5px] border-brand-orange opacity-55 md:top-[70px] md:h-[400px] md:w-[400px]" />
          <img src={alexandre} alt="Alexandre, fondateur et directeur d’Emilio Immobilier" loading="lazy" className="absolute bottom-0 left-1/2 h-[310px] w-auto max-w-none -translate-x-1/2 md:h-[540px]" />
          <div className="absolute bottom-3 left-3 flex flex-col rounded-[10px] bg-white px-4 py-3 shadow-xl md:bottom-5 md:left-5">
            <span className="text-base font-bold text-brand-ink">Alexandre</span>
            <span className="text-[13.5px] text-brand-mut">Fondateur et directeur</span>
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-5">
          <span className="inline-flex items-center gap-3 text-[12.5px] font-bold uppercase tracking-[0.18em] text-brand-orange-text">L’agence</span>
          <Quote className="h-10 w-10 text-brand-orange" aria-hidden />
          <blockquote className="m-0 font-display text-[clamp(26px,2.8vw,40px)] italic leading-[1.25] text-brand-ink text-balance">Offrir à mes clients le service que j’aurais aimé recevoir moi-même.</blockquote>
          <div className="flex items-center gap-3.5"><span className="block h-[2px] w-14 bg-brand-orange" /><span className="text-[15px] font-bold text-brand-ink">Alexandre, fondateur et directeur</span></div>
          <p className="m-0 max-w-[580px] text-[16.5px] leading-[1.7] text-brand-txt">
            Alexandre a créé Emilio en septembre 2020 à Boulogne-Billancourt, après plusieurs années passées dans différentes agences. Il en a gardé une idée simple : chaque client doit être suivi personnellement, par quelqu’un qui connaît son dossier.
          </p>
          <ul className="m-0 list-none border-b border-brand-line2 p-0">
            {facts.map((f) => (
              <li key={f.t} className="flex items-center gap-3.5 border-t border-brand-line2 py-3.5">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-[10px] bg-brand-tint text-brand">{f.icon}</span>
                <span className="text-[15.5px] text-brand-txt"><strong className="font-bold text-brand-ink">{f.t}</strong>, {f.d}</span>
              </li>
            ))}
          </ul>
          <div><TextLink to="/notre-histoire">Découvrir notre histoire</TextLink></div>
        </div>
      </Container>
    </section>
  );
};

/* ── Avis clients (vrais avis Google, sans date) ── */
export const Reviews = () => (
  <section id="avis" className="bg-brand-pale">
    <Container className="flex flex-col gap-9 py-12 md:py-24">
      <SectionHead center eyebrow="Avis clients" title={<>Ils nous ont fait <Em>confiance</Em></>} />
      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-[22px] md:overflow-visible md:p-0">
        {AVIS.map((a) => (
          <article key={a.nom} className="flex w-[300px] flex-none snap-start flex-col gap-[18px] rounded-[14px] border border-brand-line bg-white p-7 shadow-[0_1px_2px_rgba(19,36,61,0.05),0_14px_34px_-20px_rgba(19,36,61,0.28)] md:w-auto">
            <div className="flex items-center justify-between">
              <span className="flex gap-0.5" aria-label="5 étoiles sur 5">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-[18px] w-[18px] fill-[#F4B400] text-[#F4B400]" />)}
              </span>
              <span className="inline-flex h-[26px] items-center rounded-full bg-brand-pale px-2.5 text-xs font-bold text-brand-mut">Avis Google</span>
            </div>
            <p className="m-0 font-display text-[18px] italic leading-[1.55] text-brand-ink">« {a.texte} »</p>
            <div className="mt-auto flex items-center gap-3 border-t border-brand-line2 pt-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-tint text-sm font-extrabold text-brand">{a.nom[0]}</span>
              <span className="flex flex-col"><span className="text-[15px] font-bold text-brand-ink">{a.nom}</span><span className="text-[13.5px] text-brand-mut">{a.projet}</span></span>
            </div>
          </article>
        ))}
      </div>
      <div className="flex justify-center">
        <Btn href={AVIS_GOOGLE_URL} variant="outline" icon={<ArrowRight className="h-[18px] w-[18px]" />}>Lire tous les avis sur Google</Btn>
      </div>
    </Container>
  </section>
);

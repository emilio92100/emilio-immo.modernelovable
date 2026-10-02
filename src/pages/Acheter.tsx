/* Page « Acheter » (refonte 2026) : le chasseur, l'espace client, le formulaire en 3 temps. */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpDown, Building2, Car, Fence, Leaf, School, Sofa, Sun, Umbrella, CalendarDays, FileText, Handshake, Heart, Home, KeyRound, Lock, MapPin, MessageCircle, Phone, Search, Sparkles, Users, Plus, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import PropertyCard from "@/components/PropertyCard";
import { useBiens } from "@/components/home/FeaturedProperties";
import { supabase } from "@/integrations/supabase/client";
import { checkSubmission, honeypotFieldName, honeypotStyle, markSubmitted } from "@/lib/antiBot";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Btn, Container, Crumbs, Em, Eyebrow, FRAME_SHADOW, SectionHead, TEL, TEL_HREF, TextLink, TrustRow } from "@/components/site/ui";
import { PhoneScreen } from "@/components/site/PhoneScreen";
import { CocheEnvoyee } from "@/components/site/ModalShell";
import { Consent, Field, Group, Pills, Segmented, Steps, Tile, toggleIn } from "@/components/site/form";
import { BUDGET_STEPS, CityPicker, RangeDual, RangeOne, euros } from "@/components/site/SearchControls";
import rueEiffel from "@/assets/refonte/paris-rue-eiffel.webp";
import alexandre from "@/assets/refonte/alexandre-detoure.webp";

/* ── Le chasseur (juste après l’espace client) ── */
const Hero = () => (
  <section className="bg-white">
    <Container className="flex flex-wrap items-center gap-x-14 gap-y-10 py-14 md:py-[88px]">
      <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-[22px]">
        <Eyebrow>Votre chasseur immobilier</Eyebrow>
        <h2 className="m-0 font-display text-[27px] sm:text-[clamp(32px,3.6vw,50px)] font-medium leading-[1.06] tracking-[-0.015em] text-brand-ink text-balance">
          Un chasseur qui cherche pour vous, <Em wrap>et reste de votre côté</Em>
        </h2>
        <p className="m-0 max-w-[560px] text-base leading-relaxed text-brand-txt text-pretty sm:text-lg">
          Vous nous dites ce que vous cherchez. On cherche partout, y compris là où les biens ne sont pas affichés, on vérifie chaque dossier et on négocie pour vous, jusqu’à la signature.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <Btn href="#recherche" icon={<ArrowRight className="h-[18px] w-[18px]" />}>Confier ma recherche</Btn>
          <Btn href={TEL_HREF} variant="outline" iconLeft={<Phone className="h-[18px] w-[18px]" />}>{TEL}</Btn>
        </div>
        <TrustRow className="pt-2.5" />
      </div>
      <div className="min-w-0 flex-[1_1_480px]">
        <div className="relative mx-4 mb-4">
          <span aria-hidden className="absolute -bottom-4 -left-4 h-[70%] w-[62%] rounded-[28px] bg-brand" />
          <div className={cn("relative rounded-[24px] bg-white p-3", FRAME_SHADOW)}>
            <div className="relative h-[340px] overflow-hidden rounded-2xl bg-brand-tint md:h-[560px]">
              <img src={rueEiffel} alt="Rue haussmannienne avec vue sur la tour Eiffel" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "50% 40%" }} />
              <div className={cn("absolute bottom-[22px] left-[22px] z-[2] flex max-w-[calc(100%-44px)] items-center gap-3 rounded-2xl bg-white py-2.5 pl-2.5 pr-[18px]", FRAME_SHADOW)}>
                <span className="block h-[50px] w-[50px] flex-none overflow-hidden rounded-full bg-brand-tint"><img src={alexandre} alt="" className="block h-[74px] w-[50px] object-cover object-top" /></span>
                <span className="flex flex-col leading-snug">
                  <span className="text-[15px] font-extrabold text-brand-ink">Alexandre et son équipe cherchent pour vous</span>
                  <span className="text-[13.5px] text-brand-mut">À Paris, dans les Hauts-de-Seine et au-delà</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

/* ── Pourquoi un chasseur ── */
const Pourquoi = () => {
  const why = [
    { icon: <Sparkles className="h-6 w-6" />, t: "Les biens avant les autres", d: "Des biens hors marché, notre carnet d’adresses et notre réseau de confrères : on voit des biens qui ne sont pas encore, ou jamais, en ligne." },
    { icon: <FileText className="h-6 w-6" />, t: "Un dossier vérifié", d: "Avant de vous engager, on étudie le dossier du bien et la copropriété, pour que vous achetiez en connaissance de cause." },
    { icon: <Handshake className="h-6 w-6" />, t: "La négociation à vos côtés", d: "On défend votre intérêt à vous, acheteur : le prix, mais aussi les conditions de la vente." },
    { icon: <KeyRound className="h-6 w-6" />, t: "Jusqu’à la signature", d: "Offre, compromis, notaire : on vous accompagne à chaque étape, jusqu’à la remise des clés." },
  ];
  return (
    <section className="bg-brand-pale">
      <Container className="flex flex-col gap-8 py-12 sm:gap-11 md:py-[100px]">
        <SectionHead center eyebrow="Pourquoi un chasseur" title={<>Quelqu’un qui travaille <Em>pour l’acheteur</Em></>} lead="Une agence classique travaille pour le vendeur. Avec un mandat de recherche, on travaille pour vous." className="max-w-[760px]" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-[22px] lg:grid-cols-4">
          {why.map((w, n) => (
            <article key={w.t} className={cn("flex items-start gap-3.5 rounded-[20px] bg-white p-4 transition-transform duration-300 hover:-translate-y-1 sm:flex-col sm:items-stretch sm:gap-0 sm:rounded-[22px] sm:p-2.5", FRAME_SHADOW)}>
              <div className="flex flex-none items-center justify-between sm:rounded-2xl sm:bg-brand-pale sm:p-[22px]">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand text-white sm:h-[54px] sm:w-[54px] sm:rounded-2xl">{w.icon}</span>
                <span className="hidden font-display text-[44px] italic leading-[0.8] text-brand-orange-lt sm:inline">0{n + 1}</span>
              </div>
              <div className="flex min-w-0 flex-col gap-1 sm:gap-2.5 sm:px-[18px] sm:pb-[18px] sm:pt-5">
                <h3 className="m-0 font-display text-[19px] font-medium leading-tight text-brand-ink sm:text-2xl">{w.t}</h3>
                <p className="m-0 text-[14px] leading-relaxed text-brand-txt text-pretty sm:text-[15.5px]">{w.d}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

/* ── L'espace client acheteur : téléphone animé + atouts autour ── */
const Bulle = ({ icon, t, d, i, orange }: { icon: JSX.Element; t: string; d: string; i: number; orange?: boolean }) => (
  <div className={cn("anim-highlight flex items-start gap-3.5 rounded-[18px] bg-white px-[18px] py-4", FRAME_SHADOW)} style={{ animationDelay: `${i ? i * 3 - 15 : 0}s` }}>
    <span className={cn("grid h-[46px] w-[46px] flex-none place-items-center rounded-[14px]", orange ? "bg-brand-orange text-brand-ink" : "bg-brand text-white")}>{icon}</span>
    <span className="flex flex-col gap-[3px]">
      <span className="text-[15.5px] font-extrabold leading-snug text-brand-ink">{t}</span>
      <span className="text-[13.5px] leading-normal text-brand-txt">{d}</span>
    </span>
  </div>
);

const EspaceClient = ({ photos }: { photos: string[] }) => {
  const phone = (
    <div className="anim-phone relative z-[2] h-[630px] w-[300px] flex-none rounded-[46px] bg-brand-ink p-[11px] shadow-[0_60px_100px_-40px_rgba(19,36,61,0.75),inset_0_0_0_2px_#34465f]">
      <div className="relative h-full w-full overflow-hidden rounded-[36px]">
        <PhoneScreen photos={photos} />
        <span aria-hidden className="absolute left-1/2 top-[9px] h-6 w-[90px] -translate-x-1/2 rounded-full bg-brand-ink" />
      </div>
    </div>
  );
  const pins: [number, number, string, string, number][] = [[30, 34, "995 k€", "#16a34a", 0], [68, 46, "1,25 M€", "#c9a84c", -6], [44, 74, "880 k€", "#7c3aed", -3]];
  const carte = (
    <div className={cn("anim-highlight rounded-[18px] bg-white p-2", FRAME_SHADOW)} style={{ animationDelay: "-6s" }}>
      <div className="relative h-[140px] overflow-hidden rounded-xl bg-[#EEF2F7]">
        <svg viewBox="0 0 300 140" aria-hidden className="absolute inset-0 h-full w-full">
          <path d="M-10 92 C 40 70, 80 110, 130 84 S 220 40, 310 66" fill="none" stroke="#8EBBE5" strokeWidth="9" strokeLinecap="round" />
          <path d="M20 0 L60 140 M150 0 L120 140 M230 0 L270 140 M0 30 L300 50 M0 120 L300 100" stroke="#FFFFFF" strokeWidth="5" />
          <path d="M0 64 L300 74" stroke="#FFFFFF" strokeWidth="3" />
        </svg>
        {pins.map(([x, y, t, c, d]) => (
          <span key={t} className="anim-pin absolute inline-flex h-6 items-center whitespace-nowrap rounded-full px-[9px] text-[11.5px] font-extrabold text-white shadow-[0_6px_12px_-6px_rgba(0,0,0,0.5)]" style={{ left: `${x}%`, top: `${y}%`, background: c, animationDelay: `${d}s` }}>{t}</span>
        ))}
      </div>
      <div className="flex items-center gap-2 px-1.5 pb-[3px] pt-[9px] text-sm font-extrabold text-brand-ink"><MapPin className="h-4 w-4 text-brand-orange-text" /> Vos biens sur la carte</div>
    </div>
  );
  const notif = (
    <div className="anim-notif flex items-center gap-2.5 rounded-2xl bg-white/[.98] py-2.5 pl-2.5 pr-3.5 shadow-[0_24px_40px_-18px_rgba(19,36,61,0.6),0_0_0_1px_rgba(19,36,61,0.06)]" style={{ animationDelay: "-1s" }}>
      <span className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[10px] bg-[#1a2332] font-jakarta text-base font-extrabold text-white">E</span>
      <span className="flex flex-col leading-snug">
        <span className="text-[11px] font-bold text-brand-mut">Ma recherche · maintenant</span>
        <span className="text-sm font-extrabold text-brand-ink">Un nouveau bien pour vous</span>
      </span>
    </div>
  );
  const left = [
    { top: 10, cls: "anim-bob-a", el: <Bulle i={0} icon={<Star className="h-[22px] w-[22px]" />} t="Une sélection privée" d="Les biens retenus pour vous, annonces du marché et biens hors marché, au même endroit." /> },
    { top: 222, cls: "anim-bob-c", el: <Bulle i={1} orange icon={<Heart className="h-[22px] w-[22px]" />} t="Votre avis en un clic" d="« Ça me plaît », « Pas pour moi » : on affine la recherche avec vous." /> },
    { top: 418, cls: "anim-bob-b", el: carte },
  ];
  const right = [
    { top: 20, cls: "anim-bob-b", el: notif },
    { top: 150, cls: "anim-bob-a", el: <Bulle i={2} icon={<CalendarDays className="h-[22px] w-[22px]" />} t="La visite, en direct" d="« Je veux visiter » depuis la fiche du bien, et le rendez-vous s’ajoute à votre agenda." /> },
    { top: 360, cls: "anim-bob-c", el: <Bulle i={3} orange icon={<FileText className="h-[22px] w-[22px]" />} t="Votre mandat signé en ligne" d="Un code reçu par e-mail, une signature au doigt : c’est fait." /> },
    { top: 530, cls: "anim-bob-a", el: <Bulle i={4} icon={<Sparkles className="h-[22px] w-[22px]" />} t="Prévenu en premier" d="Une notification dès qu’un bien qui vous correspond arrive." /> },
  ];
  const perks = [
    [<Lock key="l" className="h-[17px] w-[17px]" />, "Un lien personnel, sans mot de passe"],
    [<Home key="h" className="h-[17px] w-[17px]" />, "S’installe comme une appli"],
    [<Users key="u" className="h-[17px] w-[17px]" />, "Votre conseiller à portée de main"],
    [<CalendarDays key="c" className="h-[17px] w-[17px]" />, "Vos visites et documents au même endroit"],
  ];
  const mobileList = [
    [<Star key="s" className="h-5 w-5" />, "Une sélection privée", "Les biens retenus pour vous, au même endroit."],
    [<Heart key="h" className="h-5 w-5" />, "Votre avis en un clic", "« Ça me plaît », « Pas pour moi »."],
    [<CalendarDays key="c" className="h-5 w-5" />, "La visite, en direct", "« Je veux visiter » depuis la fiche du bien."],
    [<FileText key="f" className="h-5 w-5" />, "Votre mandat signé en ligne", "Un code par e-mail, une signature au doigt."],
    [<Sparkles key="p" className="h-5 w-5" />, "Prévenu en premier", "Une notification dès qu’un bien arrive."],
  ];
  return (
    <section id="espace" className="bg-brand-pale" style={{ backgroundImage: "radial-gradient(circle at 50% 58%, #E4ECF6 0%, rgba(228,236,246,0) 46%)" }}>
      <Container className="flex flex-col gap-6 pb-14 pt-4 md:pb-[84px] md:pt-8">
        <Crumbs items={[{ label: "Accueil", to: "/" }, { label: "Acheter" }]} />
        <SectionHead
          as="h1"
          center
          eyebrow="Acheter avec Emilio"
          title={<><span className="sr-only">Chasseur immobilier à Paris et dans les Hauts-de-Seine : </span>Un espace créé <Em>rien que pour vous</Em></>}
          lead="Dès que vous nous confiez votre recherche, vous recevez votre lien personnel. Vous y retrouvez tous les biens qu’on sélectionne pour vous, sur ordinateur comme sur téléphone."
          className="max-w-[800px]"
        />
        {/* Sur ordinateur, les boutons tout de suite ; sur téléphone, après le téléphone et ses atouts */}
        <div className="hidden flex-wrap justify-center gap-3 sm:flex">
          <Btn href="#recherche" icon={<ArrowRight className="h-[18px] w-[18px]" />}>Confier ma recherche</Btn>
          <Btn href={TEL_HREF} variant="outline" iconLeft={<Phone className="h-[18px] w-[18px]" />}>{TEL}</Btn>
        </div>
        {/* Ordinateur : la scène animée */}
        <div className="hidden h-[610px] lg:block">
        <div className="relative flex h-[690px] origin-top scale-[.86] justify-center pt-6">
          {[[-210, 18, 10, "#E68B23", "anim-bob-b"], [186, 330, 8, "#22497D", "anim-bob-a"], [-190, 400, 7, "#9AACC4", "anim-bob-c"], [170, 600, 12, "#E68B23", "anim-bob-c"], [-178, 640, 9, "#22497D", "anim-bob-a"]].map(([x, y, r, c, cl], k) => (
            <span key={k} aria-hidden className={cn("absolute rounded-full opacity-85", cl as string)} style={{ left: `calc(50% + ${x}px)`, top: y as number, width: r as number, height: r as number, background: c as string }} />
          ))}
          {left.map((b, k) => (
            <div key={`l${k}`} className="absolute z-[3] w-[290px]" style={{ right: "calc(50% + 200px)", top: b.top }}>
              <div className={b.cls} style={{ animationDelay: `-${(k + 1) * 1.7}s` }}>{b.el}</div>
            </div>
          ))}
          {right.map((b, k) => (
            <div key={`r${k}`} className={cn("absolute w-[290px]", k === 0 ? "z-[4]" : "z-[3]")} style={{ left: "calc(50% + 200px)", top: b.top }}>
              <div className={b.cls} style={{ animationDelay: `-${(k + 4) * 1.7}s` }}>{b.el}</div>
            </div>
          ))}
          {phone}
        </div>
        </div>
        {/* Téléphone et tablette : téléphone au centre, atouts en dessous */}
        <div className="flex flex-col items-center gap-6 lg:hidden">
          <div className="relative w-full max-w-[300px]">{notif}</div>
          <div className="origin-top scale-[.9]">{phone}</div>
          <ul className="m-0 grid w-full max-w-[640px] list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
            {mobileList.map(([ic, t, d]) => (
              <li key={t as string} className={cn("flex items-start gap-3 rounded-2xl bg-white p-3.5", FRAME_SHADOW)}>
                <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-brand text-white">{ic}</span>
                <span className="flex flex-col"><span className="text-[15px] font-extrabold text-brand-ink">{t}</span><span className="text-[13.5px] text-brand-txt">{d}</span></span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap justify-center gap-2.5">
          {perks.map(([ic, t]) => (
            <span key={t as string} className="inline-flex h-[42px] items-center gap-2 rounded-full border border-brand-line bg-white px-4 text-[14.5px] font-bold text-brand-ink"><span className="text-brand-orange-text">{ic}</span>{t}</span>
          ))}
        </div>
        <div className="flex flex-col gap-2.5 sm:hidden">
          <Btn href="#recherche" full icon={<ArrowRight className="h-[18px] w-[18px]" />}>Confier ma recherche</Btn>
          <Btn href={TEL_HREF} full variant="outline" iconLeft={<Phone className="h-[18px] w-[18px]" />}>{TEL}</Btn>
        </div>
      </Container>
    </section>
  );
};

/* ── Étapes ── */
const Etapes = () => {
  const steps = [
    { icon: <MessageCircle className="h-[22px] w-[22px]" />, t: "On définit votre projet", d: "Type de bien, secteurs, budget, délais : on prend le temps de tout poser ensemble." },
    { icon: <Search className="h-[22px] w-[22px]" />, t: "On cherche partout", d: "Portails, biens hors marché, confrères, carnet d’adresses : on ne se limite pas aux annonces." },
    { icon: <Home className="h-[22px] w-[22px]" />, t: "On présélectionne", d: "Vous ne visitez que les biens qui correspondent vraiment à votre recherche." },
    { icon: <FileText className="h-[22px] w-[22px]" />, t: "On vérifie le dossier", d: "Copropriété, charges, travaux, diagnostics : on regarde tout avant que vous vous engagiez." },
    { icon: <Handshake className="h-[22px] w-[22px]" />, t: "On négocie pour vous", d: "Prix et conditions : on mène la négociation à vos côtés." },
    { icon: <KeyRound className="h-[22px] w-[22px]" />, t: "On vous accompagne", d: "Offre, compromis, notaire, jusqu’à la remise des clés." },
  ];
  return (
    <section className="bg-white">
      <Container className="flex flex-col gap-7 py-12 sm:gap-9 md:py-[84px]">
        <SectionHead center eyebrow="Comment ça se passe" title={<>Votre recherche, <Em>étape par étape</Em></>} />
        <ol className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.t} className={cn("flex items-start gap-3.5 rounded-[18px] bg-white p-4 sm:flex-col sm:items-stretch sm:gap-3 sm:p-5", FRAME_SHADOW)}>
              <div className="flex flex-none items-center justify-between">
                <span className={cn("grid h-10 w-10 place-items-center rounded-full sm:h-11 sm:w-11", i === 0 ? "bg-brand-orange text-brand-ink" : "bg-brand-tint text-brand")}>{s.icon}</span>
                <span className="hidden font-display text-[26px] italic leading-none text-brand-orange-lt sm:inline">0{i + 1}</span>
              </div>
              <div className="flex min-w-0 flex-col gap-1 sm:gap-3">
                <span className="text-[15px] font-extrabold text-brand-ink sm:text-[16px]"><span className="mr-1.5 font-display italic text-brand-orange-lt sm:hidden">0{i + 1}</span>{s.t}</span>
                <span className="text-[13.5px] leading-normal text-brand-txt sm:text-[14.5px]">{s.d}</span>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
};

/* ── Formulaire « Confier ma recherche » : une étape à la fois ── */
const TYPES = [
  { k: "Appartement", icon: <Building2 className="h-[22px] w-[22px]" /> },
  { k: "Maison", icon: <Home className="h-[22px] w-[22px]" /> },
  { k: "Immeuble", icon: <Building2 className="h-[22px] w-[22px]" /> },
  { k: "Autre", icon: <Plus className="h-[22px] w-[22px]" /> },
];
/* Ce qui compte pour l’acheteur : au moins un choix, chacun avec son icône */
const ATOUTS: { t: string; icon: JSX.Element }[] = [
  { t: "Balcon", icon: <Fence className="h-[18px] w-[18px]" /> },
  { t: "Terrasse", icon: <Umbrella className="h-[18px] w-[18px]" /> },
  { t: "Ascenseur", icon: <ArrowUpDown className="h-[18px] w-[18px]" /> },
  { t: "Parking", icon: <Car className="h-[18px] w-[18px]" /> },
  { t: "Calme", icon: <Leaf className="h-[18px] w-[18px]" /> },
  { t: "Lumineux", icon: <Sun className="h-[18px] w-[18px]" /> },
  { t: "Proche des écoles", icon: <School className="h-[18px] w-[18px]" /> },
  { t: "Sans travaux", icon: <Sofa className="h-[18px] w-[18px]" /> },
];
const B_MAX = BUDGET_STEPS.length - 1;
const bIdx = (v: number) => Math.max(0, BUDGET_STEPS.indexOf(v));
const fmtBudget = (v: number, last: boolean) => (last ? "5 M€ et +" : euros(v));
const fmtSurface = (v: number) => (v ? `${v} m² minimum` : "Faites glisser");
/* Le formulaire en pages : sur ordinateur 3 pages, sur téléphone 7 petites pages qui tiennent
   chacune sur l’écran (pas besoin de faire défiler), avec « Suivant ». Les 3 temps restent les mêmes. */
type Bloc = "type" | "usage" | "quand" | "ou" | "budget" | "piecesChambres" | "pieces" | "chambres" | "surface" | "atouts" | "coord" | "mot" | "espace" | "consent";
const PAGES_ORDI: Bloc[][] = [["type", "usage", "quand", "piecesChambres"], ["ou", "budget", "surface", "atouts"], ["coord", "mot", "espace", "consent"]];
const PAGES_MOBILE: Bloc[][] = [["type", "usage"], ["quand", "pieces", "chambres"], ["ou"], ["budget", "surface"], ["atouts"], ["coord"], ["mot", "espace", "consent"]];
/* Petits téléphones (écran peu haut, type iPhone SE) : une question de plus par page coupée en deux, pour que tout tienne sans défiler */
const PAGES_PETIT: Bloc[][] = [["type"], ["usage", "quand"], ["pieces", "chambres"], ["ou"], ["budget"], ["surface"], ["atouts"], ["coord"], ["mot", "consent"]];
const TEMPS = (page: Bloc[]) => (page.some((b) => ["coord", "mot", "consent"].includes(b)) ? 3 : page.some((b) => ["ou", "budget", "surface", "atouts"].includes(b)) ? 2 : 1);
const AIDE: Partial<Record<Bloc, string>> = {
  type: "Choisissez un type de bien pour continuer.",
  pieces: "Choisissez le nombre de pièces.",
  chambres: "Choisissez le nombre de chambres minimum.",
  piecesChambres: "Choisissez le nombre de pièces et de chambres.",
  ou: "Ajoutez au moins une ville pour continuer.",
  surface: "Indiquez la surface minimum.",
  atouts: "Choisissez au moins un critère.",
  coord: "Remplissez vos coordonnées pour continuer.",
  consent: "Cochez la case pour envoyer.",
};

/** Téléphone (moins de 640 px de large), et « petit » s’il est aussi peu haut (moins de 740 px) */
const useMobile = () => {
  const [m, setM] = useState<"" | "mobile" | "petit">("");
  useEffect(() => {
    const q = window.matchMedia("(max-width: 639px)");
    const f = () => setM(!q.matches ? "" : window.innerHeight < 740 ? "petit" : "mobile");
    f();
    /* Mesuré une fois (et quand on tourne le téléphone), pas à chaque mouvement de la barre d’adresse */
    q.addEventListener("change", f);
    return () => q.removeEventListener("change", f);
  }, []);
  return m;
};

const Recherche = () => {
  const { toast } = useToast();
  const mobile = useMobile();
  const pages = mobile === "petit" ? PAGES_PETIT : mobile ? PAGES_MOBILE : PAGES_ORDI;
  const [page, setPage] = useState(0);
  const [fini, setFini] = useState(false);
  const [sens, setSens] = useState(1);
  const [type, setType] = useState("");
  const [usage, setUsage] = useState("Résidence principale");
  const [quand, setQuand] = useState("");
  const [secteurs, setSecteurs] = useState<string[]>([]);
  const [pieces, setPieces] = useState("");
  const [chambres, setChambres] = useState("");
  const [surface, setSurface] = useState(0);
  const [bLo, setBLo] = useState(bIdx(500_000));
  const [bHi, setBHi] = useState(bIdx(1_200_000));
  const [atouts, setAtouts] = useState<string[]>([]);
  const [c, setC] = useState({ prenom: "", nom: "", tel: "", email: "", mot: "" });
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const startedAt = useRef(Date.now());
  const ref = useRef<HTMLDivElement>(null);
  const carte = useRef<HTMLDivElement>(null);

  /* On passe du téléphone à l’ordinateur (ou l’inverse) : on reste sur la même question. */
  const premier = useRef<Bloc>("type");
  useEffect(() => {
    const i = pages.findIndex((p) => p.includes(premier.current));
    setPage(Math.max(0, i));
  }, [pages]);
  useEffect(() => {
    premier.current = pages[page]?.[0] ?? "type";
  }, [page, pages]);

  /* Sur téléphone, quand le formulaire occupe l’écran, la barre « Appeler / Estimer » s’efface. */
  useEffect(() => {
    if (!mobile || !carte.current) return;
    const o = new IntersectionObserver(([e]) => document.body.classList.toggle("formulaire-plein", e.intersectionRatio > 0.35), { threshold: [0, 0.35, 0.6] });
    o.observe(carte.current);
    return () => {
      o.disconnect();
      document.body.classList.remove("formulaire-plein");
    };
  }, [mobile]);

  const budget = `${euros(BUDGET_STEPS[bLo])} – ${bHi === B_MAX ? "5 000 000 € et plus" : euros(BUDGET_STEPS[bHi])}`;
  const valide: Partial<Record<Bloc, boolean>> = {
    type: !!type,
    pieces: !!pieces,
    chambres: !!chambres,
    piecesChambres: !!pieces && !!chambres,
    ou: secteurs.length > 0,
    surface: surface > 0,
    atouts: atouts.length > 0,
    coord: !!(c.prenom.trim() && c.nom.trim() && c.tel.trim() && c.email.trim()),
    consent,
  };
  const courante = pages[page] || pages[0];
  const bloque = courante.find((b) => valide[b] === false);
  const ok = !bloque;
  const derniere = page === pages.length - 1;
  const temps = TEMPS(courante);
  const go = (n: number) => {
    setSens(n > page ? 1 : -1);
    setPage(n);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const setStep = (n: number) => n === 4 && (setFini(true), ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }));

  const send = async () => {
    if (!ok || sending) return;
    const name = `${c.prenom.trim()} ${c.nom.trim()}`;
    const check = checkSubmission({ honeypot, startedAt: startedAt.current, name, email: c.email, phone: c.tel, requirePhone: true });
    if (!check.ok) {
      if (check.silent) return setStep(4);
      toast({ title: "Vérification", description: check.reason, variant: "destructive" });
      return;
    }
    setSending(true);
    const message = [
      `Usage : ${usage}`,
      quand && `Délai : ${quand}`,
      `Budget : ${budget}`,
      pieces && `Pièces : ${pieces}`,
      chambres && `Chambres minimum : ${chambres}`,
      surface && `Surface minimum : ${surface} m²`,
      atouts.length && `Priorités : ${atouts.join(", ")}`,
      c.mot.trim() && `Message : ${c.mot.trim()}`,
    ].filter(Boolean).join("\n");
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        form_type: "mandat_recherche",
        name,
        email: c.email.trim(),
        phone: c.tel.trim(),
        budget,
        property_type: type,
        desired_location: secteurs.join(", "),
        desired_surface: surface ? String(surface) : null,
        timeline: quand || null,
        message,
      });
      if (error) throw error;
      markSubmitted();
      try {
        await supabase.functions.invoke("send-contact-email", { body: { form_type: "mandat_recherche", name, email: c.email, phone: c.tel, budget, message } });
      } catch { /* le CRM relit la table */ }
      setStep(4);
    } catch {
      toast({ title: "Erreur", description: `L’envoi n’a pas abouti. Réessayez, ou appelez-nous au ${TEL}.`, variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const left = (
    <div className="flex min-w-0 flex-col gap-7 lg:pt-10">
      <SectionHead dark eyebrow="Confier ma recherche" title={<>Dites-nous ce que <Em dark>vous cherchez</Em></>} lead="Trois petites étapes pour commencer. On vous rappelle pour en parler." />
      <ul className="m-0 flex list-none flex-col gap-[18px] p-0">
        {[[<MessageCircle key="m" className="h-5 w-5" />, "Un premier échange", "Pour bien comprendre votre projet et votre calendrier."], [<Users key="u" className="h-5 w-5" />, "Un interlocuteur dédié", "Alexandre ou un membre de l’équipe, joignable 7 j/7."], [<Sparkles key="s" className="h-5 w-5" />, "Votre espace client", "Tous les biens retenus pour vous, sur votre téléphone."]].map(([ic, t, d]) => (
          <li key={t as string} className="flex items-start gap-3.5">
            <span className="grid h-[42px] w-[42px] flex-none place-items-center rounded-xl bg-white/10 text-brand-orange">{ic}</span>
            <span className="flex flex-col gap-0.5"><span className="text-[16.5px] font-bold text-white">{t}</span><span className="text-[15px] leading-normal text-brand-bt">{d}</span></span>
          </li>
        ))}
      </ul>
      <a href={TEL_HREF} className="inline-flex min-h-[44px] items-center gap-2.5 text-xl font-extrabold text-white"><Phone className="h-5 w-5 text-brand-orange" /> {TEL}</a>
    </div>
  );

  const labels = ["Votre projet", "Où et combien", "Vos coordonnées"];
  const bloc = (b: Bloc) => {
    switch (b) {
      case "type":
        return (
          <Group key={b} title="Quel type de bien ?">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{TYPES.map((t) => <Tile key={t.k} icon={t.icon} label={t.k} on={type === t.k} onClick={() => setType(t.k)} />)}</div>
          </Group>
        );
      case "usage":
        return <Group key={b} title="C’est pour…"><Pills options={["Résidence principale", "Investissement", "Pied-à-terre"] as const} value={[usage as never]} onToggle={(v) => setUsage(v)} /></Group>;
      case "quand":
        return <Group key={b} title="Pour quand ?" optional><Pills options={["Dès que possible", "D’ici 6 mois", "Je prends le temps"] as const} value={[quand as never]} onToggle={(v) => setQuand(quand === v ? "" : v)} /></Group>;
      case "ou":
        return (
          <Group key={b} title="Où cherchez-vous ?" hint="Tapez une ville ou un arrondissement, puis choisissez-le. Vous pouvez en ajouter plusieurs.">
            <CityPicker value={secteurs} onChange={setSecteurs} />
          </Group>
        );
      case "budget":
        return (
          <Group key={b} title="Votre budget" hint="Honoraires compris. Faites glisser les deux ronds.">
            <div className="rounded-2xl border border-brand-line bg-brand-pale px-4 pb-3 pt-4">
              <RangeDual steps={BUDGET_STEPS} lo={bLo} hi={bHi} onChange={(x, y) => { setBLo(x); setBHi(y); }} format={fmtBudget} labels={["Budget minimum", "Budget maximum"]} />
            </div>
          </Group>
        );
      case "pieces":
        return <Group key={b} title="Nombre de pièces"><Segmented options={["1", "2", "3", "4", "5 +"] as const} value={[pieces as never]} onChange={(v) => setPieces(v)} /></Group>;
      case "chambres":
        return <Group key={b} title="Chambres minimum"><Segmented options={["0", "1", "2", "3", "4 +"] as const} value={[chambres as never]} onChange={(v) => setChambres(v)} /></Group>;
      case "surface":
        return (
          <Group key={b} title="Surface minimum" hint="Faites glisser le rond pour indiquer la surface.">
            <div className="rounded-2xl border border-brand-line bg-brand-pale px-4 pb-1.5 pt-3"><RangeOne min={0} max={300} step={5} value={surface} onChange={setSurface} format={fmtSurface} label="Surface minimum" /></div>
          </Group>
        );
      case "piecesChambres":
        return <div key={b} className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">{bloc("pieces")}{bloc("chambres")}</div>;
      case "atouts":
        return (
          <Group key={b} title="Ce qui compte pour vous" hint="Choisissez au moins un critère.">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {ATOUTS.map((x) => {
                const on = atouts.includes(x.t);
                return (
                  <button
                    key={x.t}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setAtouts(toggleIn(atouts, x.t))}
                    className={cn(
                      "flex min-h-[52px] min-w-0 items-center gap-2.5 rounded-[14px] border-[1.5px] px-2.5 py-2 text-left text-[13.5px] font-bold leading-tight transition sm:text-[14px] [@media(max-height:620px)]:min-h-[46px] [@media(max-height:620px)]:py-1.5",
                      on ? "border-brand bg-brand text-white" : "border-brand-line bg-white text-brand-ink hover:border-brand/40",
                    )}
                  >
                    <span className={cn("grid h-8 w-8 flex-none place-items-center rounded-[10px] transition", on ? "bg-white/15 text-brand-orange" : "bg-brand-pale text-brand")}>{x.icon}</span>
                    <span className="min-w-0">{x.t}</span>
                  </button>
                );
              })}
            </div>
          </Group>
        );
      case "coord":
        return (
          <div key={b} className="grid grid-cols-2 gap-2 sm:gap-2.5">
            <Field label="Prénom" placeholder="Votre prénom" autoComplete="given-name" value={c.prenom} onChange={(e) => setC({ ...c, prenom: e.target.value })} />
            <Field label="Nom" placeholder="Votre nom" autoComplete="family-name" value={c.nom} onChange={(e) => setC({ ...c, nom: e.target.value })} />
            <Field className="col-span-2 sm:col-span-1" label="Téléphone" type="tel" inputMode="tel" autoComplete="tel" placeholder="06 12 34 56 78" value={c.tel} onChange={(e) => setC({ ...c, tel: e.target.value })} />
            <Field className="col-span-2 sm:col-span-1" label="E-mail" type="email" inputMode="email" autoComplete="email" placeholder="vous@exemple.fr" value={c.email} onChange={(e) => setC({ ...c, email: e.target.value })} />
          </div>
        );
      case "mot":
        return <Field key={b} area label="Un mot sur votre projet (facultatif)" placeholder="Étage élevé, proche d’une école, pas de travaux…" value={c.mot} onChange={((e: React.ChangeEvent<HTMLTextAreaElement>) => setC({ ...c, mot: e.target.value })) as never} />;
      case "espace":
        return (
          <div key={b} className="flex items-center gap-3 rounded-[14px] border border-brand-line bg-brand-pale px-4 py-3.5">
            <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-brand text-white"><Sparkles className="h-[19px] w-[19px]" /></span>
            <span className="min-w-0 text-sm leading-normal text-brand-txt"><strong className="text-brand-ink">Votre espace client vous attend</strong> : vous recevez votre lien personnel par e-mail.</span>
          </div>
        );
      case "consent":
        return (
          <div key={b}>
            <input type="text" name={honeypotFieldName} tabIndex={-1} autoComplete="off" aria-hidden style={honeypotStyle} value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            <Consent checked={consent} onChange={setConsent}>J’accepte qu’Emilio Immobilier utilise ces informations pour ma recherche.</Consent>
          </div>
        );
    }
  };

  return (
    <section id="recherche" className="bg-brand">
      <Container className="grid grid-cols-1 items-start gap-x-16 gap-y-10 pt-14 sm:pb-14 md:py-[100px] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.25fr)]">
        {left}
        {/* Sur téléphone, le formulaire prend toute la largeur et toute la hauteur de l’écran */}
        <div ref={ref} className="relative -mx-5 min-w-0 scroll-mt-[72px] sm:mx-0 sm:scroll-mt-28 lg:mt-6">
          <div
            ref={carte}
            className="relative flex min-h-[calc(100svh-72px)] min-w-0 flex-col gap-[18px] rounded-t-[28px] [@media(max-height:620px)]:gap-3 [@media(max-height:620px)]:pt-4 bg-white px-[18px] pb-[max(16px,env(safe-area-inset-bottom))] pt-5 shadow-[0_50px_90px_-40px_rgba(0,0,0,0.6)] sm:min-h-[540px] sm:gap-[22px] sm:rounded-[26px] sm:p-[34px]"
          >
            <h3 className="m-0 font-display text-[20px] sm:text-[24px] font-medium text-brand-ink md:text-[28px] [@media(max-height:620px)]:text-[20px]">Votre recherche, <Em>en 3 temps</Em></h3>
            {!fini && (
              <>
                <div className="hidden sm:block"><Steps labels={labels} current={temps} /></div>
                <div className="flex flex-col gap-2.5 sm:hidden">
                  <Steps labels={labels} current={temps} compact />
                  <div aria-hidden className="flex gap-1">
                    {pages.map((_, i) => <span key={i} className={cn("h-1 flex-1 rounded-full transition-colors duration-300", i <= page ? "bg-brand-orange" : "bg-brand-line")} />)}
                  </div>
                </div>
              </>
            )}
            <div className="relative flex min-w-0 flex-1 flex-col">
              <AnimatePresence mode="wait" initial={false} custom={sens}>
                <motion.div
                  key={fini ? "fini" : `${mobile ? "m" : "o"}${page}`}
                  custom={sens}
                  variants={{ in: (d: number) => ({ opacity: 0, x: d * 36 }), on: { opacity: 1, x: 0 }, out: (d: number) => ({ opacity: 0, x: d * -36 }) }}
                  initial="in"
                  animate="on"
                  exit="out"
                  transition={{ duration: 0.24, ease: [0.22, 0.8, 0.24, 1] }}
                  className="flex min-w-0 flex-1 flex-col gap-6"
                >
                  {fini ? (
                    <div className="flex flex-col items-center gap-3.5 px-2.5 pb-1.5 pt-[18px] text-center">
                      <CocheEnvoyee />
                      <h4 className="m-0 mt-1.5 font-display text-[19.5px] sm:text-[23px] sm:text-[28px] font-medium text-brand-ink">C’est noté{c.prenom.trim() ? `, merci ${c.prenom.trim()}` : ""}</h4>
                      <p className="m-0 max-w-[440px] text-[15.5px] leading-relaxed text-brand-txt">Alexandre ou un membre de l’équipe vous appelle pour en parler. Ensuite, votre lien personnel arrive par e-mail : il ouvre votre espace client.</p>
                      <div className="flex flex-wrap justify-center gap-2.5 pt-1.5">
                        <Btn href="#espace" icon={<ArrowRight className="h-[18px] w-[18px]" />}>Découvrir l’espace client</Btn>
                        <Btn to="/" variant="outline">Retour à l’accueil</Btn>
                      </div>
                    </div>
                  ) : (
                    courante.map(bloc)
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            {!fini && (
              <div className="flex flex-col gap-2.5 border-t border-brand-line2 pt-4 sm:pt-[18px]">
                <div className="flex min-w-0 items-center gap-2.5">
                  {page > 0 && (
                    <button type="button" aria-label="Retour" onClick={() => go(page - 1)} className="inline-flex h-[54px] w-[54px] flex-none items-center justify-center gap-2 rounded-xl border-[1.5px] border-brand-line text-[15.5px] font-bold text-brand-ink hover:bg-brand-pale sm:w-auto sm:px-[18px]">
                      <ArrowLeft className="h-[18px] w-[18px]" /> <span className="hidden sm:inline">Retour</span>
                    </button>
                  )}
                  <span className="hidden text-sm text-brand-mut sm:inline">Étape {temps} sur 3</span>
                  <button
                    type="button"
                    disabled={!ok || sending}
                    onClick={() => (derniere ? send() : go(page + 1))}
                    className="ml-auto inline-flex h-[54px] min-w-0 flex-1 items-center justify-center gap-2.5 rounded-xl bg-brand-orange px-4 text-[15.5px] font-extrabold text-brand-ink transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-45 sm:flex-none sm:px-7 sm:text-[16px]"
                  >
                    {sending && <span aria-hidden className="h-[18px] w-[18px] flex-none animate-spin rounded-full border-[2.5px] border-brand-ink/25 border-t-brand-ink" />}
                    <span className="truncate">{derniere ? (sending ? "Envoi en cours…" : "Envoyer ma recherche") : "Suivant"}</span> <ArrowRight className={cn("h-[18px] w-[18px] flex-none", (derniere || sending) && "hidden sm:block", sending && "sm:hidden")} />
                  </button>
                </div>
                {bloque && AIDE[bloque] && <span className="text-[13px] text-brand-mut sm:text-right">{AIDE[bloque]}</span>}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

const Acheter = () => {
  const biens = useBiens();
  const photos = (biens || []).map((p) => p.images[0]).filter(Boolean).slice(0, 2);
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Acheter avec un chasseur immobilier à Paris et dans les Hauts-de-Seine | Emilio Immobilier"
        description="Confiez votre recherche à Emilio Immobilier : biens hors marché, dossier vérifié, négociation à vos côtés et un espace client rien que pour vous. Paris 6e, 7e, 15e, 16e, 17e et Hauts-de-Seine."
        canonical="https://www.emilio-immo.com/acheter"
      />
      <Navbar />
      <main>
        {/* D’abord l’espace client (on voit tout de suite l’appli), puis le chasseur */}
        <EspaceClient photos={photos.length ? photos : [rueEiffel, rueEiffel]} />
        <Hero />
        <Pourquoi />
        <Etapes />
        <Recherche />
        {biens && biens.length > 0 && (
          <section className="bg-brand-pale">
            <Container className="flex flex-col gap-10 py-14 md:py-24">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionHead eyebrow="Nos biens" title={<>En ce moment <Em>à l’agence</Em></>} />
                <TextLink to="/biens">Voir tous nos biens</TextLink>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {biens.slice(0, 3).map((p, k) => <PropertyCard key={p.id} property={p} index={k} imgClassName="h-[230px]" />)}
              </div>
            </Container>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Acheter;

/* Pages « vendre-appartement-… » (refonte 2026) : même adresse, même contenu, nouvelle présentation.
   Pas d'honoraires ici : ils sont sur la page « Nos honoraires ». */
import {
  AlertTriangle, ArrowRight, Calculator, Camera, CheckCircle2, Clock, FileText, Handshake, Home, LineChart, Network,
  Phone, ShieldCheck, Sparkles, TrendingUp, Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { cn } from "@/lib/utils";
import type { CityData } from "@/lib/cities";
import type { SellCityData } from "@/lib/sellCities";
import { useSiteModals } from "@/components/site/SiteModals";
import { Btn, Checks, Container, Crumbs, Em, Eyebrow, FRAME_SHADOW, SectionHead, TEL, TEL_HREF } from "@/components/site/ui";
import { EstimerCard } from "@/components/site/EstimerCard";
import { FaqSection, faqJsonLd } from "@/components/site/Faq";
import { AutresSecteurs, PrixCard, SITE, agentLd, aVille } from "@/components/site/CityParts";

type Props = { city: CityData; sell: SellCityData };

const METHODE = [
  { icon: TrendingUp, title: "Estimation", desc: "Analyse de votre bien et des ventes récentes du quartier, sur place. Gratuite et sans engagement." },
  { icon: Camera, title: "Mise en valeur", desc: "Reportage photo professionnel, plans, visite virtuelle si elle a du sens, annonce soignée." },
  { icon: Network, title: "Nos acheteurs d’abord", desc: "Nous présentons d’abord votre bien aux acheteurs déjà suivis par l’agence, avant toute mise en ligne." },
  { icon: Users, title: "Des visites utiles", desc: "Chaque visiteur est vérifié : projet sérieux et financement contrôlé en amont." },
  { icon: Handshake, title: "Négociation et signature", desc: "Compromis, conditions suspensives, notaire : on vous accompagne jusqu’à la remise des clés." },
];

const DOCUMENTS = [
  "Titre de propriété",
  "3 derniers procès-verbaux d’assemblée générale",
  "Règlement de copropriété et état descriptif de division",
  "Pré-état daté (à demander au syndic)",
  "Carnet d’entretien de l’immeuble",
  "Diagnostic de performance énergétique (DPE)",
  "Diagnostic plomb (immeubles construits avant 1949)",
  "Diagnostic amiante (permis de construire avant 1997)",
  "Diagnostics électricité et gaz (installations de plus de 15 ans)",
  "État des risques et pollutions (ERP)",
  "Mesurage loi Carrez",
  "Dernier appel de fonds et taxe foncière",
];

const SellCityPageTemplate = ({ city, sell }: Props) => {
  const { openEstimation, openContact } = useSiteModals();
  const url = `${SITE}/vendre-appartement-${city.slug}`;
  const ville = city.name.startsWith("Paris") ? "Paris" : city.name;
  const estimer = () => openEstimation({ city: ville, postalCode: city.postalCodes[0] });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      agentLd(city, url),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Vendre", item: `${SITE}/vendre` },
          { "@type": "ListItem", position: 3, name: `Vendre un appartement ${aVille(city)}`, item: url },
        ],
      },
      faqJsonLd(sell.faqs),
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead title={sell.metaTitle} description={sell.metaDescription} canonical={url} jsonLd={jsonLd} />
      <Navbar />
      <main>
        {/* Haut de page */}
        <section className="bg-brand-pale">
          <Container className="flex flex-wrap items-center gap-x-14 gap-y-10 pb-14 pt-6 md:pb-[80px] md:pt-10">
            <div className="flex min-w-0 flex-[1_1_540px] flex-col gap-[22px]">
              <Crumbs items={[{ label: "Accueil", to: "/" }, { label: "Vendre", to: "/vendre" }, { label: city.name }]} />
              <Eyebrow>Vendre · {city.postalLabel}</Eyebrow>
              <h1 className="m-0 font-display text-[29px] sm:text-[clamp(34px,4.2vw,58px)] font-medium leading-[1.07] tracking-[-0.015em] text-brand-ink text-balance">
                Vendre votre appartement <Em wrap>{aVille(city)}</Em>
              </h1>
              <p className="m-0 max-w-[580px] text-base leading-relaxed text-brand-txt text-pretty sm:text-lg">{sell.heroIntro}</p>
              <div className="pt-1"><EstimerCard city={ville} postalCode={city.postalCodes[0]} placeholder={`Adresse de votre bien ${aVille(city)}`} /></div>
              <span className="text-[14.5px] text-brand-mut">
                Vous préférez en parler ? <a href={TEL_HREF} className="inline-flex min-h-[44px] items-center font-bold text-brand">{TEL}</a>
              </span>
            </div>
            <div className="min-w-0 flex-[1_1_440px]">
              <PrixCard city={city} relief="blue" stats={false} />
            </div>
          </Container>
        </section>

        {/* Quartiers porteurs */}
        <section className="bg-white">
          <Container className="flex flex-col gap-10 py-14 md:py-[96px]">
            <SectionHead eyebrow="Connaissance du terrain" title={<>Les quartiers porteurs <Em>{city.name.startsWith("Paris") ? `du ${city.name.replace("Paris ", "")}` : `de ${city.name}`}</Em></>} lead="Chaque quartier a ses acheteurs, ses prix et son rythme. La stratégie de vente s’adapte au vôtre." />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {sell.quartiersForts.map((q) => (
                <article key={q.name} className={cn("flex gap-4 rounded-[20px] bg-white p-6", FRAME_SHADOW)}>
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-brand-tint text-brand"><Home className="h-5 w-5" /></span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="m-0 font-display text-[19px] sm:text-[22px] font-medium leading-tight text-brand-ink">{q.name}</h3>
                    <p className="m-0 text-[15.5px] leading-relaxed text-brand-txt text-pretty">{q.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* Délais et acheteurs */}
        <section className="bg-brand-pale">
          <Container className="flex flex-col gap-10 py-14 md:py-[96px]">
            <SectionHead eyebrow="Délais et acheteurs" title={<>Combien de temps pour vendre <Em wrap>{aVille(city)}</Em>{"\u00a0"}?</>} />
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <div className={cn("flex flex-col gap-3 rounded-[22px] bg-white p-7", FRAME_SHADOW)}>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-tint text-brand"><Clock className="h-5 w-5" /></span>
                <span className="text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-brand-orange-text">Délai moyen du marché</span>
                <span className="font-display text-[32px] sm:text-[44px] leading-none text-brand-ink">{sell.avgDelayCity}</span>
                <p className="m-0 text-[15px] leading-relaxed text-brand-txt">Observé {aVille(city)}, entre la mise en vente et l’accord avec un acheteur.</p>
              </div>
              <div className="flex flex-col gap-3 rounded-[22px] bg-brand p-7 text-brand-bt">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-orange text-brand-ink"><Sparkles className="h-5 w-5" /></span>
                <span className="text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-brand-orange-soft">Pour aller plus vite</span>
                <span className="font-display text-[18.5px] sm:text-[21px] sm:text-[26px] leading-tight text-white">Le bon prix dès le départ, et nos acheteurs en premier</span>
                <p className="m-0 text-[15px] leading-relaxed">Un prix juste attire les acheteurs sérieux dès la première semaine. Et votre bien est d’abord présenté aux acheteurs que nous suivons déjà.</p>
              </div>
              <div className={cn("flex flex-col gap-3 rounded-[22px] bg-white p-7", FRAME_SHADOW)}>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-tint text-brand"><Users className="h-5 w-5" /></span>
                <span className="text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-brand-orange-text">Qui achète {aVille(city)}</span>
                <p className="m-0 text-[15.5px] leading-relaxed text-brand-txt text-pretty">{sell.profilAcheteurs}</p>
              </div>
            </div>
          </Container>
        </section>

        {/* Points forts */}
        <section className="bg-white">
          <Container className="grid grid-cols-1 items-center gap-x-16 gap-y-10 py-14 md:grid-cols-2 md:py-[96px]">
            <SectionHead eyebrow="Atouts à valoriser" title={<>Pourquoi votre bien {aVille(city)} <Em>se vend bien</Em></>} lead="Les arguments concrets qui font décider les acheteurs dans votre secteur, et que nous mettons en avant." />
            <div className={cn("rounded-[22px] bg-white p-7", FRAME_SHADOW)}>
              <Checks items={sell.pointsForts} />
            </div>
          </Container>
        </section>

        {/* Méthode */}
        <section className="bg-brand-pale">
          <Container className="flex flex-col gap-10 py-14 md:py-[96px]">
            <SectionHead eyebrow="Notre méthode" title={<>Cinq étapes pour vendre <Em wrap>{aVille(city)}</Em></>} />
            <ol className="m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-5">
              {METHODE.map((m, i) => (
                <li key={m.title} className={cn("flex flex-col gap-3.5 rounded-[20px] bg-white p-6", FRAME_SHADOW)}>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[19.5px] sm:text-[23px] sm:text-[28px] sm:text-[36px] italic leading-none text-brand-orange-lt">0{i + 1}</span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-tint text-brand"><m.icon className="h-5 w-5" /></span>
                  </div>
                  <h3 className="m-0 font-display text-[18.5px] sm:text-[21px] font-medium leading-tight text-brand-ink">{m.title}</h3>
                  <p className="m-0 text-[15px] leading-relaxed text-brand-txt text-pretty">{m.desc}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* Le marché en ce moment */}
        <section className="bg-brand">
          <Container className="grid grid-cols-1 items-center gap-x-16 gap-y-8 py-14 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:py-[88px]">
            <div className="flex flex-col gap-5">
              <Eyebrow dark>Pourquoi vendre maintenant</Eyebrow>
              <h2 className="m-0 font-display text-[25px] sm:text-[clamp(30px,3.1vw,44px)] font-medium leading-[1.14] text-white">{city.name} <Em dark>en 2026</Em></h2>
              <p className="m-0 text-[17.5px] leading-relaxed text-brand-bt text-pretty">{sell.marketAngle}</p>
            </div>
            <div className="flex flex-col gap-3 rounded-[22px] bg-white p-6 md:p-7">
              <span className="font-display text-[20px] sm:text-[24px] leading-tight text-brand-ink">Combien vaut votre bien ?</span>
              <p className="m-0 text-[15px] leading-relaxed text-brand-txt">Une première fourchette tout de suite, puis l’avis de valeur d’un membre de l’équipe, sur place.</p>
              <Btn onClick={estimer} iconLeft={<LineChart className="h-[18px] w-[18px]" />} full>Estimer mon bien</Btn>
            </div>
          </Container>
        </section>

        {/* Documents et erreurs */}
        <section className="bg-white">
          <Container className="grid grid-cols-1 items-start gap-x-14 gap-y-12 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:py-[96px]">
            <div className="flex flex-col gap-7">
              <SectionHead eyebrow="Préparer son dossier" title={<>Les documents <Em>à réunir</Em></>} lead="Nous centralisons tout et faisons le lien avec votre syndic et votre notaire." />
              <ul className={cn("m-0 grid list-none grid-cols-1 gap-2 rounded-[22px] bg-white p-5 sm:grid-cols-2", FRAME_SHADOW)}>
                {DOCUMENTS.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 rounded-xl bg-brand-pale px-3.5 py-3 text-[14.5px] leading-snug text-brand-ink">
                    <FileText className="mt-0.5 h-4 w-4 flex-none text-brand-orange-text" /> {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-7">
              <SectionHead eyebrow="Pièges classiques" title={<>Les erreurs <Em>à éviter</Em></>} lead="Celles que l’on rencontre le plus souvent. Les anticiper, c’est vendre plus vite et au juste prix." />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {sell.erreursAEviter.map((e, i) => (
                  <article key={e.title} className="flex flex-col gap-2.5 rounded-[20px] border border-brand-line bg-white p-5">
                    <span className="inline-flex items-center gap-2 text-[12.5px] font-extrabold uppercase tracking-[0.14em] text-brand-orange-text"><AlertTriangle className="h-4 w-4" /> Erreur 0{i + 1}</span>
                    <h3 className="m-0 font-display text-[20px] font-medium leading-tight text-brand-ink">{e.title}</h3>
                    <p className="m-0 text-[14.5px] leading-relaxed text-brand-txt text-pretty">{e.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Fiscalité */}
        <section className="bg-brand-pale">
          <Container className="flex flex-col gap-10 py-14 md:py-[96px]">
            <SectionHead eyebrow="Aspect fiscal" title={<>La fiscalité <Em>de la vente</Em></>} />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className={cn("flex flex-col gap-3 rounded-[22px] bg-white p-7", FRAME_SHADOW)}>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand text-white"><Calculator className="h-5 w-5" /></span>
                <h3 className="m-0 font-display text-[20px] sm:text-[24px] font-medium text-brand-ink">Résidence principale</h3>
                <p className="m-0 text-[15.5px] leading-relaxed text-brand-txt">Exonération totale de la plus-value, sans condition de durée de détention. C’est le cas de la plupart des ventes que nous accompagnons.</p>
              </div>
              <div className={cn("flex flex-col gap-3 rounded-[22px] bg-white p-7", FRAME_SHADOW)}>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-orange text-brand-ink"><Calculator className="h-5 w-5" /></span>
                <h3 className="m-0 font-display text-[20px] sm:text-[24px] font-medium text-brand-ink">Résidence secondaire ou investissement</h3>
                <p className="m-0 text-[15.5px] leading-relaxed text-brand-txt">Plus-value soumise à l’impôt sur le revenu (19 %) et aux prélèvements sociaux (17,2 %), avec un abattement selon la durée de détention.</p>
                <Checks items={["Exonération d’impôt sur le revenu après 22 ans de détention", "Exonération de prélèvements sociaux après 30 ans", "Surtaxe de 2 à 6 % au-delà de 50 000 € de plus-value imposable"]} />
                <p className="m-0 text-[14px] italic text-brand-mut">Si votre situation le demande, nous vous orientons vers un notaire.</p>
              </div>
            </div>
          </Container>
        </section>

        {/* Engagements */}
        <section className="bg-white">
          <Container className="flex flex-col gap-10 py-14 md:py-[96px]">
            <SectionHead center eyebrow="Nos engagements" title={<>Pourquoi nous confier <Em>votre vente</Em></>} />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {[
                { icon: ShieldCheck, t: "Des honoraires clairs", d: "Présentés dès le premier rendez-vous, sans frais cachés." },
                { icon: Network, t: "Nos acheteurs d’abord", d: "Votre bien est présenté aux acheteurs suivis par l’agence, et peut se vendre sans annonce si vous le souhaitez." },
                { icon: Users, t: "Un interlocuteur dédié", d: "Alexandre ou un membre de l’équipe, de l’estimation à la remise des clés, joignable 7 j/7." },
              ].map((b) => (
                <div key={b.t} className={cn("flex flex-col gap-3 rounded-[20px] bg-white p-7", FRAME_SHADOW)}>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-tint text-brand"><b.icon className="h-5 w-5" /></span>
                  <h3 className="m-0 font-display text-[19.5px] sm:text-[23px] font-medium text-brand-ink">{b.t}</h3>
                  <p className="m-0 text-[15.5px] leading-relaxed text-brand-txt">{b.d}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2.5">
              {["Estimation gratuite", "Sans engagement", "Vente discrète possible", "Réponse sous 24 h"].map((b) => (
                <span key={b} className="inline-flex h-10 items-center gap-2 rounded-full border border-brand-line bg-brand-pale px-4 text-[14.5px] font-semibold text-brand-ink"><CheckCircle2 className="h-4 w-4 text-brand-orange-text" /> {b}</span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Btn onClick={estimer} iconLeft={<LineChart className="h-[18px] w-[18px]" />}>Estimer mon bien</Btn>
              <Btn variant="outline" onClick={() => openContact({ objet: "Vendre", message: `Je souhaite vendre mon appartement ${aVille(city)}.` })} icon={<ArrowRight className="h-[18px] w-[18px]" />}>Prendre rendez-vous</Btn>
              <Btn variant="outline" href={TEL_HREF} iconLeft={<Phone className="h-[18px] w-[18px]" />}>{TEL}</Btn>
            </div>
          </Container>
        </section>

        <FaqSection eyebrow="Questions de vendeurs" title={<>Vendre {aVille(city)}{"\u00a0"}: <Em>vos questions</Em></>} items={sell.faqs} />
        <AutresSecteurs current={city} kind="vendre" />
      </main>
      <Footer />
    </div>
  );
};

export default SellCityPageTemplate;

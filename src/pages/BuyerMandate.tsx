import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BellRing,
  Building2,
  CheckCircle2,
  Clock3,
  FileSearch,
  Phone,
  ReceiptText,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import BuyerMandateStepperForm from "@/components/BuyerMandateStepperForm";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-bg.jpg";
import BuyerProcessTimeline from "@/components/buyer-mandate/BuyerProcessTimeline";

const problemCards = [
  {
    icon: Clock3,
    title: "Trop d'annonces",
    description: "Des centaines d'annonces, mais peu de biens réellement intéressants.",
  },
  {
    icon: TrendingUp,
    title: "Prix difficiles à analyser",
    description: "Difficile de savoir si le prix demandé correspond réellement au marché.",
  },
  {
    icon: Users,
    title: "Concurrence entre acheteurs",
    description: "Les meilleurs biens partent souvent en quelques jours.",
  },
  {
    icon: ReceiptText,
    title: "Analyse technique complexe",
    description: "Diagnostics, charges, travaux votés… beaucoup d'informations difficiles à interpréter.",
  },
];

const processFlow = ["Recherche", "Analyse", "Négociation", "Acquisition"];

const timelineSteps = [
  {
    title: "Définition précise de votre recherche",
    description: "Analyse complète de vos critères, de votre budget et de votre tempo d'acquisition pour cadrer une stratégie réaliste et efficace dès le départ.",
  },
  {
    title: "Recherche active sur tout le marché",
    description: "Nous activons les portails immobiliers, les agences partenaires et notre réseau qualifié pour détecter les meilleures opportunités visibles et discrètes.",
  },
  {
    title: "Sélection et pré-analyse des biens",
    description: "Avant chaque visite, nous filtrons les biens, analysons leur cohérence de prix et écartons ceux qui ne tiennent pas la route.",
  },
  {
    title: "Organisation des visites pertinentes",
    description: "Vous ne visitez que des biens réellement alignés avec votre projet, avec un parcours clair et optimisé.",
  },
  {
    title: "Analyse complète du bien",
    description: "Nous passons en revue copropriété, diagnostics, historique, charges et points de vigilance pour sécuriser votre décision.",
  },
  {
    title: "Négociation stratégique",
    description: "Nous construisons l'offre, défendons votre position et négocions le prix ainsi que les conditions dans votre intérêt.",
  },
];

const pricingItems = [
  "recherche active sur l'ensemble du marché immobilier",
  "mobilisation de notre réseau off-market",
  "analyse du prix réel du marché",
  "sélection et tri des biens",
  "organisation des visites",
  "analyse des documents techniques et de copropriété",
  "stratégie et négociation du prix",
  "accompagnement jusqu'à la signature chez le notaire",
];

const trustStats = [
  { value: "10+", label: "années d'expérience" },
  { value: "300+", label: "transactions réalisées" },
  { value: "Paris", label: "expertise fine du marché" },
  { value: "Réseau", label: "d'agences partenaires activé" },
];

const BuyerMandate = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Acheter un bien à Paris | Emilio Immobilier"
        description="Mandat de recherche exclusif Emilio Immobilier : recherche, analyse, off-market et négociation pour acheter le bon bien au bon prix à Paris et dans les Hauts-de-Seine."
        canonical="https://emilio-immobilier.fr/mandat-recherche"
      />
      <Navbar />

      <main className="overflow-hidden">
        <section className="relative isolate pt-28">
          <div className="absolute inset-0">
            <img src={heroImage} alt="Appartement parisien lumineux" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-background/45" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/45 to-background" />
          </div>

          <div className="relative container mx-auto px-6 pb-24 pt-12 md:pb-32 md:pt-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4 text-primary" />
                Mandat de recherche exclusif
              </div>
              <h1 className="font-sans-modern max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
                Achetez le bon bien, au bon prix, sans perdre des mois à chercher.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80 md:text-xl">
                Avec notre mandat de recherche exclusif, nous analysons le marché, trouvons les biens et négocions pour vous.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="rounded-full px-8 text-base shadow-lg shadow-primary/15">
                  <a href="#mandat-form">Parler de mon projet</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-border bg-background/85 px-8 text-base backdrop-blur hover:bg-background">
                  <a href="#contact">Être rappelé</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-28">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Le constat</span>
              <h2 className="font-sans-modern mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                Pourquoi acheter un bien est devenu si compliqué ?
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {problemCards.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <Card className="h-full rounded-[1.75rem] border-border bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <CardContent className="p-7">
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-sans-modern text-xl font-semibold tracking-tight">{item.title}</h3>
                      <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-28">
          <div className="container mx-auto px-6">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
              <div className="max-w-2xl">
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Notre solution</span>
                <h2 className="font-sans-modern mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                  Un accompagnement complet grâce au mandat de recherche exclusif
                </h2>
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
                  <p>Chez Emilio Immobilier, nous accompagnons les acquéreurs de façon proactive.</p>
                  <p>Nous travaillons uniquement sous mandat de recherche exclusif afin de garantir un travail sérieux, approfondi et efficace.</p>
                  <p>L'exclusivité nous permet de mobiliser notre temps, notre réseau et nos outils pour trouver les meilleures opportunités.</p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55 }}
                className="rounded-[2rem] border border-border bg-card p-6 shadow-sm md:p-8"
              >
                <div className="grid gap-4 md:grid-cols-4">
                  {processFlow.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.35 }}
                      className="flex items-center gap-3 md:flex-col md:items-start"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                        <span className="font-sans-modern text-sm font-semibold">0{index + 1}</span>
                      </div>
                      <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-4">
                        <p className="font-sans-modern text-lg font-semibold tracking-tight text-foreground">{item}</p>
                        {index < processFlow.length - 1 && (
                          <ArrowRight className="h-4 w-4 text-muted-foreground md:h-5 md:w-5 md:rotate-0" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-28">
          <div className="container mx-auto px-6">
            <div className="rounded-[2.25rem] border border-primary/10 bg-secondary/60 p-8 md:p-12">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
                <div>
                  <span className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Off market</span>
                  <h2 className="font-sans-modern mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                    Accédez aux biens avant tout le monde
                  </h2>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                    Grâce à notre réseau d'agences, de propriétaires et de professionnels de l'immobilier, nous pouvons vous proposer :
                  </p>
                  <ul className="mt-8 space-y-4">
                    {[
                      "des biens avant leur publication sur les portails immobiliers",
                      "des opportunités off-market",
                      "des biens réservés à certains acheteurs qualifiés",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-foreground md:text-lg">
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55 }}
                  className="relative mx-auto w-full max-w-md"
                >
                  <div className="absolute left-8 top-10 h-full w-full rounded-[2rem] border border-border bg-card/60" />
                  <div className="absolute left-4 top-5 h-full w-full rounded-[2rem] border border-border bg-card/80" />
                  <div className="relative rounded-[2rem] border border-primary/15 bg-background p-6 shadow-xl">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground">
                        <BellRing className="h-4 w-4" />
                        Off Market
                      </span>
                      <BadgeCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div className="rounded-[1.5rem] border border-border bg-secondary/50 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Nouvelle opportunité</p>
                          <h3 className="font-sans-modern mt-2 text-2xl font-semibold tracking-tight">Paris 16e</h3>
                        </div>
                        <Building2 className="h-10 w-10 text-primary" />
                      </div>
                      <div className="mt-6 grid gap-3 text-sm text-muted-foreground">
                        <div className="rounded-2xl border border-border bg-background px-4 py-3">Appartement familial lumineux</div>
                        <div className="rounded-2xl border border-border bg-background px-4 py-3">Analyse marché déjà préparée</div>
                        <div className="rounded-2xl border border-border bg-background px-4 py-3">Visite prioritaire réservée</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-28">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Méthode</span>
              <h2 className="font-sans-modern mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                Comment nous travaillons pour vous
              </h2>
            </div>
            <div className="mt-14">
              <BuyerProcessTimeline steps={timelineSteps} />
            </div>
          </div>
        </section>

        <section className="py-24 md:py-28">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-5xl rounded-[2.25rem] border border-primary/15 bg-card p-8 shadow-xl shadow-primary/5 md:p-12">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
                <div>
                  <span className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Rémunération</span>
                  <h2 className="font-sans-modern mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                    Un accompagnement complet pour 2,5 % du prix d'acquisition
                  </h2>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                    Cette rémunération comprend l'ensemble du travail réalisé pour sécuriser votre achat.
                  </p>
                  <div className="mt-8 inline-flex items-end gap-3 rounded-[1.5rem] border border-border bg-secondary/50 px-6 py-5">
                    <span className="font-sans-modern text-5xl font-semibold tracking-tight md:text-6xl">2,5 %</span>
                    <span className="pb-1 text-sm uppercase tracking-[0.2em] text-muted-foreground">TTC</span>
                  </div>
                  <p className="mt-6 text-base text-foreground">
                    La rémunération est uniquement due en cas d'acquisition réussie.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {pricingItems.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: index * 0.05 }}
                      className="flex gap-3 rounded-[1.25rem] border border-border bg-background p-4"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <p className="text-sm leading-relaxed text-foreground">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-28">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Crédibilité</span>
              <h2 className="font-sans-modern mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                Pourquoi nous faire confiance
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {trustStats.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="rounded-[1.75rem] border border-border bg-card p-8 text-center shadow-sm"
                >
                  <p className="font-sans-modern text-4xl font-semibold tracking-tight text-primary md:text-5xl">{item.value}</p>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24 pt-10 md:pb-28">
          <div className="container mx-auto px-6">
            <div className="rounded-[2.25rem] border border-primary/10 bg-primary px-8 py-12 text-primary-foreground shadow-2xl shadow-primary/15 md:px-12 md:py-16">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-foreground/70">Parlons-en</span>
                  <h2 className="font-sans-modern mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                    Parlons de votre projet immobilier
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-primary-foreground/75">
                    Un premier échange nous permettra de comprendre votre projet et de définir la stratégie de recherche.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg" variant="secondary" className="rounded-full px-8 text-base transition-transform duration-300 hover:-translate-y-0.5">
                    <a href="#mandat-form">
                      <Phone className="h-4 w-4" />
                      Planifier un appel
                    </a>
                  </Button>
                  <Button asChild size="lg" className="rounded-full border border-primary-foreground/15 bg-primary-foreground/10 px-8 text-base text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary-foreground/15">
                    <a href="#contact">
                      <ArrowUpRight className="h-4 w-4" />
                      Être rappelé
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="mandat-form">
          <BuyerMandateStepperForm />
        </div>
        <div id="contact">
          <ContactForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BuyerMandate;

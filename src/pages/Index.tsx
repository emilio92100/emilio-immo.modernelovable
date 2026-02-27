import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Star, Lock, Search, Home, Quote,
  Shield, Heart, Handshake, Eye, Zap, Clock, Award, MapPin } from
"lucide-react";
import PropertyCard from "@/components/PropertyCard";
import ContactForm from "@/components/ContactForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Property, mockProperties, fetchPropertiesFromFeed } from "@/lib/properties";
import heroBg from "@/assets/hero-bg.jpg";

const testimonials = [
{
  name: "Marie & Thomas D.",
  text: "Un accompagnement exceptionnel du début à la fin. Alexandre a su comprendre nos besoins et nous trouver le bien idéal en un temps record.",
  rating: 5
},
{
  name: "Sophie L.",
  text: "Professionnalisme et écoute remarquables. La vente de notre appartement s'est déroulée sans accroc grâce à l'expertise d'Emilio.",
  rating: 5
},
{
  name: "Jean-Pierre M.",
  text: "Grâce à leur réseau off-market, nous avons eu accès à des biens que nous n'aurions jamais trouvés seuls. Résultat parfait.",
  rating: 5
}];


const engagements = [
{
  icon: Shield,
  title: "Transparence totale",
  description: "Aucun frais caché, des honoraires clairs dès le départ. Vous savez exactement où vous en êtes à chaque étape."
},
{
  icon: Heart,
  title: "Écoute & bienveillance",
  description: "Votre projet est unique. Nous prenons le temps de comprendre vos besoins et de vous conseiller avec sincérité."
},
{
  icon: Handshake,
  title: "Négociation experte",
  description: "Nous défendons vos intérêts avec rigueur pour vous obtenir les meilleures conditions du marché."
},
{
  icon: Clock,
  title: "Réactivité 7j/7",
  description: "Une question, un doute ? Nous sommes disponibles et réactifs tout au long de votre projet."
},
{
  icon: Eye,
  title: "Accès off-market",
  description: "Profitez de biens exclusifs jamais publiés en ligne, accessibles uniquement via notre réseau."
},
{
  icon: Award,
  title: "Expertise locale",
  description: "Plus de 10 ans d'expérience sur Paris et les Hauts-de-Seine pour une connaissance fine du marché."
}];


const offMarketStats = [
{ value: "50+", label: "Biens off-market", description: "Biens exclusifs non diffusés sur les portails classiques" },
{ value: "200+", label: "Transactions", description: "Transactions réussies grâce à notre réseau privilégié" },
{ value: "72h", label: "Réactivité", description: "Délai moyen pour vous proposer un bien ciblé" }];


const Index = () => {
  const [properties, setProperties] = useState<Property[]>(mockProperties);

  useEffect(() => {
    fetchPropertiesFromFeed().then(setProperties);
  }, []);

  const latestProperties = [...properties].
  sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()).
  slice(0, 6);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-secondary" />
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-block font-body text-accent font-semibold text-sm tracking-widest uppercase mb-6">

              Emilio Immobilier
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground font-semibold leading-tight mb-6">

              Votre projet immobilier,
              <br />
              <span className="text-accent italic">notre expertise</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="font-body text-primary-foreground/80 text-lg md:text-xl max-w-xl mx-auto mb-10">

              Achat, vente et conseil sur-mesure en Île-de-France.
              Accédez à des biens d'exception, y compris en off-market.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center">

              <Link
                to="/biens"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 font-body font-semibold tracking-wide text-sm rounded hover:brightness-110 transition-all">

                Découvrir nos biens <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/vendre"
                className="inline-flex items-center justify-center gap-2 border text-accent px-8 py-3.5 font-body font-semibold tracking-wide text-sm rounded hover:text-accent-foreground transition-all bg-primary text-center border-accent">

                <Home className="w-4 h-4" /> Je souhaite vendre
              </Link>
            </motion.div>
          </div>
        </div>
        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-sm border-t border-border">
          <div className="container mx-auto px-6 py-5 grid grid-cols-3 gap-4">
            {[
            { value: "200+", label: "Transactions réussies" },
            { value: "10+", label: "Années d'expérience" },
            { value: "50+", label: "Biens off-market" }].
            map((s) =>
            <div key={s.label} className="text-center">
                <div className="font-display text-2xl md:text-3xl text-accent font-semibold">{s.value}</div>
                <div className="font-body text-muted-foreground text-xs mt-1">{s.label}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ENGAGEMENTS */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="font-body text-accent font-semibold text-sm tracking-wider uppercase">Ce qui nous définit</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mt-3 mb-4">
              Nos engagements
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {engagements.map((e, i) =>
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="group bg-card p-8 rounded-lg border border-border shadow-sm hover:shadow-lg hover:border-accent/30 hover:-translate-y-1 transition-all duration-300">

                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                  <e.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-lg mb-3">{e.title}</h3>
                <p className="font-body text-muted-foreground text-base leading-relaxed">{e.description}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* LATEST PROPERTIES */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="font-body text-accent font-semibold text-sm tracking-wider uppercase">Nos derniers biens</span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mt-3 mb-4">
                Une sélection de nos derniers biens
              </h2>
              <div className="w-16 h-0.5 bg-accent" />
            </div>
            <Link
              to="/biens"
              className="hidden md:flex items-center gap-2 text-accent font-body font-semibold text-sm hover:underline">

              Voir tout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestProperties.map((p, i) =>
            <PropertyCard key={p.id} property={p} index={i} />
            )}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/biens"
              className="inline-flex items-center gap-2 text-accent font-body font-semibold text-sm hover:underline">

              Voir tous nos biens <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* OFF-MARKET VENTE — pour les propriétaires */}
      <section className="relative py-24 bg-secondary overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-accent/5 rounded-full" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-5 py-2 mb-6">
                <Lock className="w-4 h-4 text-accent" />
                <span className="font-body text-accent font-semibold text-xs tracking-widest uppercase">Vente confidentielle</span>
              </div>
              <h2 className="font-display text-3xl md:text-5xl text-foreground mb-5 leading-tight">
                Vendez votre bien en toute
                <span className="text-accent italic"> discrétion</span>
              </h2>
              <p className="font-body text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                Vous souhaitez vendre sans apparaître sur les portails immobiliers ?
                Notre réseau off-market vous connecte directement à des acquéreurs qualifiés et sérieux.
              </p>
            </motion.div>

            {/* Content grid */}
            <div className="grid md:grid-cols-2 gap-8 items-center mb-14">
              {/* Left — advantages */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-5"
              >
                {[
                  {
                    icon: Eye,
                    title: "Aucune diffusion publique",
                    desc: "Votre bien reste invisible sur SeLoger, LeBonCoin et autres plateformes. Seuls nos acquéreurs pré-qualifiés y ont accès."
                  },
                  {
                    icon: Shield,
                    title: "Confidentialité garantie",
                    desc: "Ni vos voisins, ni votre entourage ne seront informés de la mise en vente. Un processus 100% discret."
                  },
                  {
                    icon: Zap,
                    title: "Acquéreurs ciblés & qualifiés",
                    desc: "Nous présentons votre bien uniquement à des acheteurs dont le profil correspond parfaitement, pour des visites utiles."
                  },
                  {
                    icon: Handshake,
                    title: "Négociation maîtrisée",
                    desc: "Moins de visibilité, plus de rareté : votre bien se positionne comme une opportunité exclusive sur le marché."
                  }
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="group flex gap-4 p-5 rounded-xl bg-card border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 shrink-0 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="font-body text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Right — decorative card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative bg-primary rounded-2xl p-10 md:p-12 overflow-hidden">
                  {/* Decorative circles */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 border border-accent/10 rounded-full" />
                  <div className="absolute -bottom-6 -left-6 w-28 h-28 border border-accent/10 rounded-full" />
                  <div className="absolute top-1/2 right-8 w-20 h-20 bg-accent/5 rounded-full" />

                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-accent/15 rounded-full flex items-center justify-center mb-8">
                      <Lock className="w-7 h-7 text-accent" />
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl text-primary-foreground mb-4 leading-snug">
                      Un réseau de
                      <span className="text-accent italic"> +200 acquéreurs</span>
                      <br />qualifiés
                    </h3>
                    <p className="font-body text-primary-foreground/70 text-base leading-relaxed mb-8">
                      Notre base d'acheteurs actifs et vérifiés nous permet de trouver preneur rapidement, sans jamais exposer votre bien publiquement.
                    </p>
                    <div className="flex items-center gap-6 mb-8 pb-8 border-b border-primary-foreground/10">
                      {[
                        { val: "72h", lab: "Délai moyen" },
                        { val: "98%", lab: "Taux de succès" }
                      ].map(s => (
                        <div key={s.lab}>
                          <div className="font-display text-3xl text-accent font-semibold">{s.val}</div>
                          <div className="font-body text-primary-foreground/50 text-xs mt-1">{s.lab}</div>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/vendre"
                      className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3 font-body font-semibold text-sm rounded hover:brightness-110 transition-all"
                    >
                      Vendre en off-market <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* OFF-MARKET ACHAT */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-accent" />
              <span className="font-body text-accent font-semibold text-sm tracking-wider uppercase">Accès privilégié</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-4">
              Notre base <span className="text-gold italic">Off-Market</span>
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
            <p className="font-body text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed text-base">
              Accédez à des biens d'exception qui ne sont jamais diffusés sur les portails classiques.
              Notre réseau privilégié vous ouvre les portes d'opportunités uniques.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            {offMarketStats.map((stat, i) =>
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-8 text-center cursor-default overflow-hidden transition-all duration-500 hover:bg-primary-foreground/10 hover:border-accent/30">

                <div className="transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-4">
                  <div className="font-display text-4xl text-accent mb-2 font-semibold">{stat.value}</div>
                  <div className="font-body text-primary-foreground/70 text-sm tracking-wide">{stat.label}</div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center p-6 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="text-center">
                    <div className="font-display text-2xl text-accent mb-2 font-semibold">{stat.value}</div>
                    <p className="font-body text-primary-foreground/80 text-sm leading-relaxed">{stat.description}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/mandat-recherche"
              className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 font-body font-semibold text-sm rounded hover:brightness-110 transition-all">

              Accéder au off-market <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">Ils nous font confiance</h2>
            <div className="w-16 h-0.5 bg-accent mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) =>
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded shadow-sm border border-border relative">

                <Quote className="w-8 h-8 text-accent/20 absolute top-4 right-4" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) =>
                <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                )}
                </div>
                <p className="font-body text-muted-foreground text-base leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
                <p className="font-body font-semibold text-foreground text-base">{t.name}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">Un projet immobilier ?</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
          <p className="font-body text-muted-foreground max-w-xl mx-auto mb-8 text-base">
            Que vous souhaitiez acheter, vendre ou simplement obtenir un avis d'expert, notre équipe est à votre écoute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/vendre"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 font-body font-semibold tracking-wide text-sm rounded hover:bg-navy-light transition-all">

              <Home className="w-4 h-4" /> Je souhaite vendre
            </Link>
            <Link
              to="/mandat-recherche"
              className="inline-flex items-center justify-center gap-2 border border-primary text-foreground px-8 py-3.5 font-body font-semibold tracking-wide text-sm rounded hover:bg-primary hover:text-primary-foreground transition-all">

              <Search className="w-4 h-4" /> Je cherche un bien
            </Link>
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </div>);

};

export default Index;
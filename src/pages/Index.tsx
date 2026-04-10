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
import SEOHead from "@/components/SEOHead";
import { Property, mockProperties, fetchPropertiesFromFeed } from "@/lib/properties";


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
  description: "Un suivi clair à chaque étape de votre projet. Vous êtes informé en temps réel, sans zone d'ombre."
},
{
  icon: Heart,
  title: "Écoute & bienveillance",
  description: "Votre projet est unique. Nous prenons le temps de comprendre vos attentes pour vous conseiller avec sincérité."
},
{
  icon: Handshake,
  title: "Négociation experte",
  description: "Nous défendons vos intérêts avec rigueur pour vous obtenir les meilleures conditions du marché."
},
{
  icon: Clock,
  title: "Réactivité 7j/7",
  description: "Une question, un doute ? Notre équipe est disponible et réactive tout au long de votre projet."
},
{
  icon: Eye,
  title: "Accès off-market",
  description: "Profitez de biens exclusifs jamais publiés en ligne, accessibles uniquement via notre réseau privilégié."
},
{
  icon: Award,
  title: "Expertise locale",
  description: "Une connaissance fine de Paris et des Hauts-de-Seine pour un accompagnement sur-mesure."
}];




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
      <SEOHead
        title="Émilio Immobilier — Agence immobilière Paris & Hauts-de-Seine"
        description="Agence immobilière à Paris et Hauts-de-Seine. Vente, achat, estimation gratuite. Accompagnement personnalisé par un expert local depuis 2020."
        canonical="https://www.emilio-immo.com/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Émilio Immobilier",
          "url": "https://www.emilio-immo.com",
          "telephone": "+33184801400",
          "description": "Agence immobilière spécialisée à Paris et Hauts-de-Seine. Vente, achat, estimation gratuite.",
          "areaServed": ["Paris", "Boulogne-Billancourt", "Neuilly-sur-Seine", "Saint-Cloud", "Garches", "Issy-les-Moulineaux"],
          "priceRange": "€€€",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Boulogne-Billancourt",
            "addressRegion": "Île-de-France",
            "addressCountry": "FR"
          }
        }} />
      
      <Navbar />

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/hero.mp4" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/65 to-primary/40" />
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 mb-8">
              
              <div className="h-px w-10 bg-accent" />
              <span className="font-body text-accent font-semibold tracking-[0.3em] uppercase text-lg text-center">
                Emilio Immobilier
              </span>
              <div className="h-px w-10 bg-accent" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground font-semibold leading-[1.1] mb-7">
              
              Votre projet immobilier,
              <br />
              <span className="text-accent italic">notre expertise</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="font-body text-primary-foreground/80 text-lg md:text-xl max-w-xl mx-auto mb-11 leading-relaxed">
              
              Achat, vente et conseil sur-mesure en Île-de-France.
              Accédez à des biens d'exception, y compris en off-market.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-4 justify-center">
              
              <Link
                to="/biens"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 font-body font-semibold tracking-wide text-sm rounded hover:brightness-110 transition-all">
                
                Découvrir nos biens <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/vendre"
                className="inline-flex items-center justify-center gap-2 border border-accent text-accent px-8 py-3.5 font-body font-semibold tracking-wide text-sm rounded hover:bg-accent hover:text-accent-foreground transition-all">
                
                <Home className="w-4 h-4" /> Je souhaite vendre
              </Link>
            </motion.div>
          </div>
        </div>
        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-primary/60 backdrop-blur-md border-t border-primary-foreground/10">
          <div className="container mx-auto px-6 py-5 grid grid-cols-3 gap-4">
            {[
            { value: "200+", label: "Transactions réussies" },
            { value: "10+", label: "Années d'expérience" },
            { value: "50+", label: "Biens off-market" }].
            map((s) =>
            <div key={s.label} className="text-center">
                <div className="font-display text-2xl md:text-3xl text-accent font-semibold">{s.value}</div>
                <div className="font-body text-primary-foreground/60 text-xs mt-1 tracking-wide">{s.label}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ENGAGEMENTS */}
      <section className="py-28 bg-background relative overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20">
            
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-accent" />
              <span className="font-body text-accent font-semibold text-sm tracking-[0.3em] uppercase">Ce qui nous définit</span>
              <div className="h-px w-12 bg-accent" />
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-6xl text-foreground mb-5">
              Nos <span className="text-accent italic">engagements</span>
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto text-sm sm:text-lg md:text-xl leading-relaxed">
              Six valeurs essentielles au service de votre projet immobilier.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {engagements.map((e, i) =>
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
               className="group relative bg-card rounded-2xl border border-border p-6 sm:p-10 hover:shadow-xl hover:border-accent/40 hover:-translate-y-1 transition-all duration-500">
              
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-5 sm:mb-7 group-hover:bg-accent group-hover:scale-110 transition-all duration-500">
                  <e.icon className="w-5 h-5 sm:w-7 sm:h-7 text-accent group-hover:text-accent-foreground transition-colors duration-500" />
                </div>
                <h3 className="font-display text-lg sm:text-2xl mb-3 sm:mb-4 text-foreground">{e.title}</h3>
                <p className="font-body text-muted-foreground text-sm sm:text-lg leading-relaxed">{e.description}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* LATEST PROPERTIES */}
      <section className="py-20">
        <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <span className="font-body text-accent font-semibold text-sm tracking-wider uppercase">Nos derniers biens</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mt-3 mb-4">
              Une sélection de nos derniers biens
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto" />
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
              className="text-center mb-16">
              
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
                className="space-y-5">
                
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
                }].
                map((item, i) =>
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group flex gap-4 p-5 rounded-xl bg-card border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                  
                    <div className="w-12 h-12 shrink-0 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="font-body text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Right — decorative card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative">
                
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
                      { val: "98%", lab: "Taux de succès" }].
                      map((s) =>
                      <div key={s.lab}>
                          <div className="font-display text-3xl text-accent font-semibold">{s.val}</div>
                          <div className="font-body text-primary-foreground/50 text-xs mt-1">{s.lab}</div>
                        </div>
                      )}
                    </div>
                    <Link
                      to="/vendre"
                      className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3 font-body font-semibold text-sm rounded hover:brightness-110 transition-all">
                      
                      Vendre en off-market <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
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
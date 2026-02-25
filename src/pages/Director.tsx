import { motion } from "framer-motion";
import { Award, Users, Target, Handshake } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import alexandreImg from "@/assets/alexandre.png";

const Director = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-12 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-display text-3xl md:text-5xl text-primary-foreground mb-4">Le Directeur</h1>
          <div className="w-16 h-0.5 bg-accent mx-auto" />
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative">
                <img
                  src={alexandreImg}
                  alt="Alexandre - Directeur Émilio Conseil Immobilier"
                  className="w-full max-w-md rounded shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-accent rounded -z-10" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="font-body text-accent font-semibold text-sm tracking-wider uppercase">Fondateur & Directeur</span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mt-3 mb-6">Alexandre</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                Passionné par l'immobilier depuis plus de 10 ans, Alexandre a fondé Émilio Conseil Immobilier
                avec une vision claire : offrir un service d'excellence et un accompagnement personnalisé
                à chaque client.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                Fort d'une expérience solide dans les marchés parisien et francilien, il met son expertise
                et son réseau au service de vos projets. Sa connaissance approfondie du marché,
                combinée à une approche humaine et transparente, fait de lui un interlocuteur de confiance
                pour toutes vos transactions immobilières.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-8">
                Son objectif : transformer chaque projet immobilier en une expérience sereine et réussie,
                en plaçant toujours l'intérêt du client au cœur de sa démarche.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Award, label: "10+ ans d'expérience" },
                  { icon: Users, label: "200+ clients accompagnés" },
                  { icon: Target, label: "Expert Île-de-France" },
                  { icon: Handshake, label: "98% satisfaction client" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-3 bg-secondary rounded">
                    <item.icon className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="font-body text-sm text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </div>
  );
};

export default Director;

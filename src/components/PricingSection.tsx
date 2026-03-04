import { motion } from "framer-motion";
import { CheckCircle, X, Crown, Sparkles } from "lucide-react";

interface PricingPlan {
  title: string;
  rate: string;
  subtitle: string;
  recommended?: boolean;
  features: { text: string; included: boolean }[];
  cta: string;
}

interface PricingSectionProps {
  heading: string;
  subheading: string;
  plans: PricingPlan[];
  onCtaClick?: () => void;
  ctaElement?: React.ReactNode;
  note?: React.ReactNode;
}

const PricingSection = ({ heading, subheading, plans, note }: PricingSectionProps) => {
  const gridClassName =
    plans.length === 1
      ? "grid max-w-2xl mx-auto"
      : "grid md:grid-cols-2 gap-8 max-w-4xl mx-auto";

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">{heading}</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
          <p className="font-body text-muted-foreground max-w-xl mx-auto text-base">{subheading}</p>
        </div>

        {note && (
          <div className="max-w-3xl mx-auto mb-10 rounded-3xl border border-accent/20 bg-accent/5 px-6 py-6 md:px-8 md:py-7">
            <div className="flex items-start gap-4 md:gap-5">
              <div className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-sm">
                <Sparkles className="h-7 w-7" />
              </div>
              <p className="font-body text-base md:text-xl text-foreground leading-relaxed text-left">
                {note}
              </p>
            </div>
          </div>
        )}

        <div className={gridClassName}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className={`relative rounded-xl border-2 p-8 transition-all ${
                plan.recommended
                  ? "border-accent bg-accent/5 shadow-lg scale-[1.02]"
                  : "border-border bg-card shadow-sm"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground px-4 py-1.5 rounded-full font-body text-xs font-bold tracking-wide uppercase">
                    <Crown className="w-3.5 h-3.5" /> Recommandé
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">{plan.title}</h3>
                <div className="font-display text-4xl md:text-5xl text-accent mb-2">{plan.rate}</div>
                <p className="font-body text-muted-foreground text-sm">{plan.subtitle}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-3 font-body text-sm">
                    {f.included ? (
                      <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground/40 shrink-0 mt-0.5" />
                    )}
                    <span className={f.included ? "text-foreground" : "text-muted-foreground/50"}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PricingSection;

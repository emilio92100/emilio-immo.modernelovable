import { useState } from "react";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message envoyé !", description: "Nous vous recontacterons dans les plus brefs délais." });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section className="bg-primary py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-4">Contactez-nous</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-4" />
          <p className="text-primary-foreground/70 font-body">
            Une question, un projet ? N'hésitez pas à nous écrire.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nom complet"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 rounded font-body text-sm focus:outline-none focus:border-accent transition-colors"
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 rounded font-body text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <input
            type="tel"
            placeholder="Téléphone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 rounded font-body text-sm focus:outline-none focus:border-accent transition-colors"
          />
          <textarea
            placeholder="Votre message..."
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 rounded font-body text-sm focus:outline-none focus:border-accent transition-colors resize-none"
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground py-3 rounded font-body font-semibold tracking-wide text-sm hover:brightness-110 transition-all"
          >
            <Send className="w-4 h-4" /> Envoyer
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;

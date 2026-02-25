import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Phone, Mail, Home, Search, MessageSquare, Clock, User, MapPin, Banknote, Maximize, CalendarClock, X } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

interface Submission {
  id: string;
  form_type: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  budget: string | null;
  property_type: string | null;
  desired_location: string | null;
  desired_surface: string | null;
  timeline: string | null;
  property_ref: string | null;
  property_title: string | null;
  created_at: string;
}

const typeLabels: Record<string, { label: string; color: string; icon: any }> = {
  contact: { label: "Contact", color: "bg-blue-100 text-blue-800", icon: MessageSquare },
  mandat_recherche: { label: "Mandat de recherche", color: "bg-purple-100 text-purple-800", icon: Search },
  rappel_bien: { label: "Rappel bien", color: "bg-amber-100 text-amber-800", icon: Phone },
};

const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) setSubmissions(data as Submission[]);
      setLoading(false);
    };
    fetchSubmissions();
  }, []);

  const filtered = activeFilter === "all" ? submissions : submissions.filter((s) => s.form_type === activeFilter);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const counts = {
    all: submissions.length,
    contact: submissions.filter((s) => s.form_type === "contact").length,
    mandat_recherche: submissions.filter((s) => s.form_type === "mandat_recherche").length,
    rappel_bien: submissions.filter((s) => s.form_type === "rappel_bien").length,
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/" className="text-muted-foreground hover:text-accent transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-display text-2xl md:text-3xl text-foreground">Demandes reçues</h1>
              <p className="font-body text-sm text-muted-foreground mt-1">{submissions.length} demande(s) au total</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { key: "all", label: "Toutes" },
              { key: "contact", label: "Contact" },
              { key: "mandat_recherche", label: "Mandat recherche" },
              { key: "rappel_bien", label: "Rappel bien" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 py-2 rounded-full font-body text-sm transition-all ${
                  activeFilter === f.key
                    ? "bg-accent text-accent-foreground font-semibold"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label} ({counts[f.key as keyof typeof counts]})
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 bg-card rounded border border-border">
              <p className="font-body text-muted-foreground">Aucune demande pour le moment.</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {filtered.map((s) => {
                const typeInfo = typeLabels[s.form_type] || { label: s.form_type, color: "bg-muted text-foreground", icon: MessageSquare };
                const TypeIcon = typeInfo.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSubmission(s)}
                    className="bg-card border border-border rounded-lg p-5 text-left hover:border-accent/50 hover:shadow-sm transition-all w-full"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 min-w-0">
                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <TypeIcon className="w-5 h-5 text-accent" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className={`text-xs font-body font-semibold px-2 py-0.5 rounded ${typeInfo.color}`}>
                              {typeInfo.label}
                            </span>
                            {s.property_title && (
                              <span className="text-xs font-body text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                                🏠 {s.property_title} (Réf. {s.property_ref})
                              </span>
                            )}
                          </div>
                          <p className="font-display text-sm text-foreground">{s.name}</p>
                          <div className="flex items-center gap-3 mt-1 text-muted-foreground">
                            <span className="font-body text-xs flex items-center gap-1"><Mail className="w-3 h-3" />{s.email}</span>
                            {s.phone && <span className="font-body text-xs flex items-center gap-1"><Phone className="w-3 h-3" />{s.phone}</span>}
                          </div>
                        </div>
                      </div>
                      <span className="font-body text-xs text-muted-foreground flex-shrink-0 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(s.created_at)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedSubmission(null)}>
          <div
            className="bg-background border border-border rounded-lg shadow-2xl max-w-lg w-full mx-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  {(() => {
                    const ti = typeLabels[selectedSubmission.form_type] || typeLabels.contact;
                    return <span className={`text-xs font-body font-semibold px-2.5 py-1 rounded ${ti.color}`}>{ti.label}</span>;
                  })()}
                </div>
                <button onClick={() => setSelectedSubmission(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5">
                {/* Contact info */}
                <div className="space-y-3">
                  <DetailRow icon={User} label="Nom" value={selectedSubmission.name} />
                  <DetailRow icon={Mail} label="Email" value={selectedSubmission.email} isLink={`mailto:${selectedSubmission.email}`} />
                  {selectedSubmission.phone && <DetailRow icon={Phone} label="Téléphone" value={selectedSubmission.phone} isLink={`tel:${selectedSubmission.phone}`} />}
                  <DetailRow icon={Clock} label="Date" value={formatDate(selectedSubmission.created_at)} />
                </div>

                {/* Property info */}
                {selectedSubmission.property_title && (
                  <div className="border-t border-border pt-4">
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">Bien concerné</p>
                    <div className="bg-accent/5 border border-accent/20 rounded p-4">
                      <p className="font-display text-sm text-foreground">{selectedSubmission.property_title}</p>
                      <p className="font-body text-xs text-muted-foreground mt-1">Réf. {selectedSubmission.property_ref}</p>
                      <Link
                        to={`/biens/${selectedSubmission.property_ref}`}
                        className="inline-flex items-center gap-1 text-accent text-xs font-body mt-2 hover:underline"
                      >
                        <Home className="w-3 h-3" /> Voir la fiche du bien
                      </Link>
                    </div>
                  </div>
                )}

                {/* Mandate info */}
                {selectedSubmission.form_type === "mandat_recherche" && (
                  <div className="border-t border-border pt-4">
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">Projet de recherche</p>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedSubmission.property_type && <DetailRow icon={Home} label="Type" value={selectedSubmission.property_type} />}
                      {selectedSubmission.budget && <DetailRow icon={Banknote} label="Budget" value={selectedSubmission.budget} />}
                      {selectedSubmission.desired_location && <DetailRow icon={MapPin} label="Localisation" value={selectedSubmission.desired_location} />}
                      {selectedSubmission.desired_surface && <DetailRow icon={Maximize} label="Surface" value={selectedSubmission.desired_surface} />}
                      {selectedSubmission.timeline && <DetailRow icon={CalendarClock} label="Délai" value={selectedSubmission.timeline} />}
                    </div>
                  </div>
                )}

                {/* Message */}
                {selectedSubmission.message && (
                  <div className="border-t border-border pt-4">
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Message</p>
                    <p className="font-body text-sm text-foreground whitespace-pre-line bg-secondary rounded p-4">
                      {selectedSubmission.message}
                    </p>
                  </div>
                )}
              </div>

              {/* Quick actions */}
              <div className="mt-6 pt-4 border-t border-border flex gap-2">
                {selectedSubmission.phone && (
                  <a href={`tel:${selectedSubmission.phone}`} className="flex-1 flex items-center justify-center gap-2 bg-accent text-accent-foreground py-2.5 rounded font-body font-semibold text-sm hover:brightness-110 transition-all">
                    <Phone className="w-4 h-4" /> Appeler
                  </a>
                )}
                <a href={`mailto:${selectedSubmission.email}`} className="flex-1 flex items-center justify-center gap-2 border border-border py-2.5 rounded font-body text-sm hover:bg-muted transition-colors">
                  <Mail className="w-4 h-4" /> Envoyer un email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailRow = ({ icon: Icon, label, value, isLink }: { icon: any; label: string; value: string; isLink?: string }) => (
  <div className="flex items-center gap-3">
    <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
    <div>
      <p className="font-body text-xs text-muted-foreground">{label}</p>
      {isLink ? (
        <a href={isLink} className="font-body text-sm text-accent hover:underline">{value}</a>
      ) : (
        <p className="font-body text-sm text-foreground">{value}</p>
      )}
    </div>
  </div>
);

export default AdminSubmissions;

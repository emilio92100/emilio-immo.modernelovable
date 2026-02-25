import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { fetchPropertiesFromFeed, Property, formatPrice } from "@/lib/properties";
import {
  Phone, Mail, Home, Search, MessageSquare, Clock, User, MapPin,
  Banknote, Maximize, CalendarClock, X, LogOut, CheckCircle, Circle,
  StickyNote, Settings, ChevronRight, Building, Eye, EyeOff, Save,
  ExternalLink, Sparkles, Archive, BarChart3,
} from "lucide-react";

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
  is_called: boolean;
  admin_notes: string | null;
  created_at: string;
}

const getTypeLabel = (form_type: string) => {
  switch (form_type) {
    case "rappel_bien": return "Demande info sur bien";
    case "mandat_recherche": return "Accompagnement acheteur";
    case "estimation": return "Estimation";
    default: return "Demande générale";
  }
};

const getTypeStyle = (form_type: string) => {
  switch (form_type) {
    case "rappel_bien": return { bg: "bg-amber-50", text: "text-amber-700", icon: Home };
    case "mandat_recherche": return { bg: "bg-violet-50", text: "text-violet-700", icon: Search };
    case "estimation": return { bg: "bg-emerald-50", text: "text-emerald-700", icon: BarChart3 };
    default: return { bg: "bg-sky-50", text: "text-sky-700", icon: MessageSquare };
  }
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
};

const formatTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
};

const relativeDate = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `il y a ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `il y a ${days}j`;
  return formatDate(iso);
};

/* ======== MAIN COMPONENT ======== */
const AdminSubmissions = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selected, setSelected] = useState<Submission | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [viewMode, setViewMode] = useState<"nouveau" | "ancien">("nouveau");

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin"); return; }

      const { data: roleData } = await supabase
        .from("user_roles").select("role")
        .eq("user_id", session.user.id).eq("role", "admin").maybeSingle();
      if (!roleData) { await supabase.auth.signOut(); navigate("/admin"); return; }

      const [subRes, props] = await Promise.all([
        supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
        fetchPropertiesFromFeed(),
      ]);

      if (!subRes.error && subRes.data) setSubmissions(subRes.data as Submission[]);
      setProperties(props);
      setLoading(false);
    };
    init();
  }, [navigate]);

  const newSubmissions = submissions.filter((s) => !s.is_called);
  const oldSubmissions = submissions.filter((s) => s.is_called);

  const applyTypeFilter = (list: Submission[]) =>
    activeFilter === "all" ? list : list.filter((s) => s.form_type === activeFilter);

  const displayed = applyTypeFilter(viewMode === "nouveau" ? newSubmissions : oldSubmissions);

  const counts: Record<string, number> = {
    all: submissions.length,
    contact: submissions.filter((s) => s.form_type === "contact").length,
    mandat_recherche: submissions.filter((s) => s.form_type === "mandat_recherche").length,
    rappel_bien: submissions.filter((s) => s.form_type === "rappel_bien").length,
    estimation: submissions.filter((s) => s.form_type === "estimation").length,
  };

  const toggleCalled = useCallback(async (id: string, current: boolean) => {
    const newVal = !current;
    setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, is_called: newVal } : s));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, is_called: newVal } : null);
    await supabase.from("contact_submissions").update({ is_called: newVal }).eq("id", id);
  }, [selected]);

  const saveNotes = useCallback(async (id: string, notes: string) => {
    setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, admin_notes: notes } : s));
    await supabase.from("contact_submissions").update({ admin_notes: notes }).eq("id", id);
  }, []);

  const getPropertyForSubmission = (s: Submission): Property | undefined => {
    if (!s.property_ref) return undefined;
    return properties.find((p) => p.id === s.property_ref);
  };

  const handleLogout = async () => { await supabase.auth.signOut(); navigate("/admin"); };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="inline-block w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top bar */}
      <header className="bg-card border-b border-border sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Building className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="font-display text-sm font-semibold">Administration</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setShowSettings(true)} className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <button onClick={handleLogout} className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Nouveau / Ancien toggle */}
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={() => setViewMode("nouveau")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-body text-sm font-medium transition-all ${
              viewMode === "nouveau"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Nouveau
            {newSubmissions.length > 0 && (
              <span className={`ml-1 text-xs font-bold px-1.5 py-0.5 rounded-full ${
                viewMode === "nouveau" ? "bg-accent-foreground/20 text-accent-foreground" : "bg-accent/10 text-accent"
              }`}>
                {newSubmissions.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setViewMode("ancien")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-body text-sm font-medium transition-all ${
              viewMode === "ancien"
                ? "bg-foreground text-background shadow-sm"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <Archive className="w-4 h-4" />
            Traité
            {oldSubmissions.length > 0 && (
              <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                {oldSubmissions.length}
              </span>
            )}
          </button>
        </div>

        {/* Type filters */}
        <div className="flex gap-1 mb-5 bg-card border border-border rounded-lg p-1 overflow-x-auto">
          {[
            { key: "all", label: "Toutes" },
            { key: "contact", label: "Demande générale" },
            { key: "mandat_recherche", label: "Accompagnement" },
            { key: "rappel_bien", label: "Info bien" },
            { key: "estimation", label: "Estimation" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`flex-1 py-2 rounded-md font-body text-xs sm:text-sm transition-all ${
                activeFilter === f.key
                  ? "bg-muted text-foreground shadow-sm font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* List */}
        {displayed.length === 0 ? (
          <div className="text-center py-20">
            {viewMode === "nouveau" ? (
              <>
                <CheckCircle className="w-12 h-12 text-emerald-300 mx-auto mb-3" />
                <p className="font-body text-muted-foreground text-sm">Aucune nouvelle demande</p>
                <p className="font-body text-muted-foreground/60 text-xs mt-1">Toutes les demandes ont été traitées</p>
              </>
            ) : (
              <>
                <Archive className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="font-body text-muted-foreground text-sm">Aucune demande traitée</p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {displayed.map((s) => {
              const style = getTypeStyle(s.form_type);
              const TypeIcon = style.icon;
              const prop = getPropertyForSubmission(s);
              return (
                <div
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className={`bg-card border rounded-xl transition-all hover:shadow-md cursor-pointer group ${
                    s.is_called ? "border-border/60" : "border-border"
                  }`}
                >
                  <div className="p-4">
                    {/* Top row: badge + time */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-md ${style.bg} ${style.text}`}>
                        <TypeIcon className="w-3 h-3" /> {getTypeLabel(s.form_type)}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-body text-[11px] text-muted-foreground">{relativeDate(s.created_at)}</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleCalled(s.id, s.is_called); }}
                          title={s.is_called ? "Marquer non traité" : "Marquer traité"}
                          className="p-1"
                        >
                          {s.is_called ? (
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Contact info */}
                    <div className="flex items-start gap-3">
                      {/* Property image for rappel_bien */}
                      {s.form_type === "rappel_bien" && prop && prop.images[0] && (
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-border">
                          <img src={prop.images[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm font-semibold text-foreground">{s.name}</p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                          {s.phone && (
                            <span className="font-body text-xs text-muted-foreground flex items-center gap-1">
                              <Phone className="w-3 h-3" /> {s.phone}
                            </span>
                          )}
                          <span className="font-body text-xs text-muted-foreground flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {s.email}
                          </span>
                        </div>

                        {/* Property info for rappel_bien */}
                        {s.form_type === "rappel_bien" && prop && (
                          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{prop.title} — {formatPrice(prop.price)}</span>
                            <Link
                              to={`/biens/${prop.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-accent hover:underline flex items-center gap-0.5 flex-shrink-0"
                            >
                              Voir <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                        )}
                        {s.form_type === "rappel_bien" && !prop && s.property_title && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            <span>Bien : {s.property_title} (Réf. {s.property_ref})</span>
                          </div>
                        )}

                        {/* Mandat summary */}
                        {s.form_type === "mandat_recherche" && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {s.budget && <MiniTag label={s.budget} />}
                            {s.desired_location && <MiniTag label={s.desired_location} />}
                            {s.property_type && <MiniTag label={s.property_type} />}
                          </div>
                        )}

                        {/* Message preview */}
                        {s.form_type === "contact" && s.message && (
                          <p className="font-body text-xs text-muted-foreground mt-2 line-clamp-1">{s.message}</p>
                        )}
                      </div>

                      {/* Notes indicator */}
                      {s.admin_notes && (
                        <StickyNote className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Panel */}
      {selected && (
        <DetailPanel
          submission={selected}
          property={getPropertyForSubmission(selected)}
          onClose={() => setSelected(null)}
          onToggleCalled={() => toggleCalled(selected.id, selected.is_called)}
          onSaveNotes={(notes) => {
            saveNotes(selected.id, notes);
            setSelected((prev) => prev ? { ...prev, admin_notes: notes } : null);
          }}
        />
      )}

      {/* Settings Panel */}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </div>
  );
};

/* ======== DETAIL PANEL ======== */
const DetailPanel = ({
  submission: s, property, onClose, onToggleCalled, onSaveNotes,
}: {
  submission: Submission; property?: Property; onClose: () => void;
  onToggleCalled: () => void; onSaveNotes: (notes: string) => void;
}) => {
  const [notes, setNotes] = useState(s.admin_notes || "");
  const [notesDirty, setNotesDirty] = useState(false);
  const style = getTypeStyle(s.form_type);

  useEffect(() => {
    setNotes(s.admin_notes || "");
    setNotesDirty(false);
  }, [s.id, s.admin_notes]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" />
      <div
        className="relative bg-background w-full max-w-md h-full overflow-y-auto shadow-2xl border-l border-border animate-in slide-in-from-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-5 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md ${style.bg} ${style.text}`}>
              {getTypeLabel(s.form_type)}
            </span>
            <button
              onClick={onToggleCalled}
              className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md transition-colors ${
                s.is_called ? "bg-emerald-50 text-emerald-700" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.is_called ? <CheckCircle className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
              {s.is_called ? "Traité" : "Non traité"}
            </button>
          </div>
          <button onClick={onClose} className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Contact */}
          <section>
            <SectionTitle>Contact</SectionTitle>
            <div className="space-y-2.5 mt-3">
              <InfoRow icon={User} label={s.name} />
              <InfoRow icon={Mail} label={s.email} href={`mailto:${s.email}`} />
              {s.phone && <InfoRow icon={Phone} label={s.phone} href={`tel:${s.phone}`} />}
              <InfoRow icon={Clock} label={`${formatDate(s.created_at)} à ${formatTime(s.created_at)}`} />
            </div>
          </section>

          {/* Property card for rappel_bien */}
          {s.form_type === "rappel_bien" && property && (
            <section>
              <SectionTitle>Bien concerné</SectionTitle>
              <div className="mt-3 border border-border rounded-xl overflow-hidden">
                <img src={property.images[0]} alt={property.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="font-display text-sm text-foreground font-semibold">{property.title}</p>
                  <p className="font-body text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {property.city} • {property.surface} m² • {property.rooms} pièces
                  </p>
                  <p className="font-display text-accent text-sm font-semibold mt-2">
                    {formatPrice(property.price)}
                  </p>
                  <Link
                    to={`/biens/${property.id}`}
                    className="inline-flex items-center gap-1.5 text-accent text-xs font-body font-medium mt-3 hover:underline"
                    onClick={onClose}
                  >
                    Voir la fiche complète <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </section>
          )}

          {s.form_type === "rappel_bien" && !property && s.property_title && (
            <section>
              <SectionTitle>Bien concerné</SectionTitle>
              <div className="mt-3 border border-border rounded-xl p-4">
                <p className="font-display text-sm font-semibold">{s.property_title}</p>
                <p className="font-body text-xs text-muted-foreground mt-1">Réf. {s.property_ref}</p>
              </div>
            </section>
          )}

          {/* Mandat details */}
          {s.form_type === "mandat_recherche" && (
            <section>
              <SectionTitle>Projet de recherche</SectionTitle>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {s.property_type && <MiniCard icon={Home} label="Type" value={s.property_type} />}
                {s.budget && <MiniCard icon={Banknote} label="Budget" value={s.budget} />}
                {s.desired_location && <MiniCard icon={MapPin} label="Localisation" value={s.desired_location} />}
                {s.desired_surface && <MiniCard icon={Maximize} label="Surface" value={s.desired_surface} />}
                {s.timeline && <MiniCard icon={CalendarClock} label="Délai" value={s.timeline} />}
              </div>
            </section>
          )}

          {/* Message */}
          {s.message && (
            <section>
              <SectionTitle>Message</SectionTitle>
              <p className="font-body text-sm text-foreground whitespace-pre-line bg-muted rounded-lg p-4 mt-3">
                {s.message}
              </p>
            </section>
          )}

          {/* Admin notes */}
          <section>
            <SectionTitle>Notes internes</SectionTitle>
            <div className="mt-3">
              <textarea
                value={notes}
                onChange={(e) => { setNotes(e.target.value); setNotesDirty(true); }}
                placeholder="Ajouter une note (ex: rappelé le 25/02, intéressé par…)"
                rows={3}
                className="w-full px-3 py-2.5 bg-muted border-0 text-foreground placeholder:text-muted-foreground rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
              />
              {notesDirty && (
                <button
                  onClick={() => { onSaveNotes(notes); setNotesDirty(false); }}
                  className="mt-2 inline-flex items-center gap-1.5 bg-accent text-accent-foreground px-3 py-1.5 rounded-md font-body text-xs font-semibold hover:brightness-110 transition-all"
                >
                  <Save className="w-3 h-3" /> Enregistrer
                </button>
              )}
            </div>
          </section>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            {s.phone && (
              <a href={`tel:${s.phone}`} className="flex-1 flex items-center justify-center gap-2 bg-accent text-accent-foreground py-2.5 rounded-lg font-body font-semibold text-sm hover:brightness-110 transition-all">
                <Phone className="w-4 h-4" /> Appeler
              </a>
            )}
            <a href={`mailto:${s.email}`} className="flex-1 flex items-center justify-center gap-2 border border-border py-2.5 rounded-lg font-body text-sm hover:bg-muted transition-colors">
              <Mail className="w-4 h-4" /> Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ======== SETTINGS PANEL ======== */
const SettingsPanel = ({ onClose }: { onClose: () => void }) => {
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChangePw = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (newPw !== confirmPw) { setMessage({ type: "error", text: "Les mots de passe ne correspondent pas." }); return; }
    if (newPw.length < 6) { setMessage({ type: "error", text: "Le mot de passe doit contenir au moins 6 caractères." }); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPw });
    if (error) { setMessage({ type: "error", text: error.message }); }
    else { setMessage({ type: "success", text: "Mot de passe modifié avec succès." }); setNewPw(""); setConfirmPw(""); }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative bg-background border border-border rounded-xl shadow-2xl max-w-sm w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-lg flex items-center gap-2"><Settings className="w-4 h-4 text-accent" /> Paramètres</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
        </div>

        <form onSubmit={handleChangePw} className="space-y-3">
          <p className="font-body text-xs text-muted-foreground uppercase tracking-wider font-semibold">Changer le mot de passe</p>

          {message && (
            <div className={`rounded-lg p-3 text-sm font-body ${
              message.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-destructive/10 text-destructive"
            }`}>
              {message.text}
            </div>
          )}

          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              placeholder="Nouveau mot de passe"
              required
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              className="w-full px-3 py-2.5 bg-muted border-0 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 pr-10"
            />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <input
            type={showPw ? "text" : "password"}
            placeholder="Confirmer le mot de passe"
            required
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            className="w-full px-3 py-2.5 bg-muted border-0 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-accent-foreground py-2.5 rounded-lg font-body font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-50"
          >
            {loading ? "Modification..." : "Modifier le mot de passe"}
          </button>
        </form>
      </div>
    </div>
  );
};

/* ======== SMALL COMPONENTS ======== */
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <p className="font-body text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">{children}</p>
);

const InfoRow = ({ icon: Icon, label, href }: { icon: any; label: string; href?: string }) => (
  <div className="flex items-center gap-2.5">
    <Icon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
    {href ? (
      <a href={href} className="font-body text-sm text-accent hover:underline">{label}</a>
    ) : (
      <span className="font-body text-sm text-foreground">{label}</span>
    )}
  </div>
);

const MiniCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="bg-muted rounded-lg p-3">
    <div className="flex items-center gap-1.5 mb-1">
      <Icon className="w-3 h-3 text-muted-foreground" />
      <span className="font-body text-[11px] text-muted-foreground">{label}</span>
    </div>
    <span className="font-body text-sm text-foreground font-medium">{value}</span>
  </div>
);

const MiniTag = ({ label }: { label: string }) => (
  <span className="font-body text-[11px] bg-muted text-muted-foreground px-2 py-0.5 rounded-md">{label}</span>
);

export default AdminSubmissions;

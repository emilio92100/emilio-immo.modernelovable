import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const [checkingLink, setCheckingLink] = useState(true);

  useEffect(() => {
    let active = true;
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const queryParams = new URLSearchParams(window.location.search);
    const isRecoveryLink = hashParams.get("type") === "recovery" || queryParams.has("code");
    const linkError = hashParams.get("error_description") || queryParams.get("error_description");

    const verifyRecovery = async () => {
      if (linkError) {
        if (active) {
          setError("Ce lien a expiré ou a déjà été utilisé. Demandez un nouveau lien depuis la page de connexion.");
          setCheckingLink(false);
        }
        return;
      }

      if (isRecoveryLink) setIsRecovery(true);

      const { data: { session } } = await supabase.auth.getSession();
      if (active) {
        // Le lien peut être consommé avant le chargement de cette page : la session confirme alors sa validité.
        if (session?.user) setIsRecovery(true);
        setCheckingLink(false);
      }
    };

    void verifyRecovery();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || (isRecoveryLink && session?.user)) {
        setIsRecovery(true);
        setCheckingLink(false);
      }
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (password !== confirm) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateError) {
      setError(updateError.message);
    } else {
      setDone(true);
      setTimeout(() => navigate("/admin"), 2500);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground rounded font-body text-sm focus:outline-none focus:border-accent transition-colors";

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
      <div className="bg-card border border-border rounded-lg shadow-lg p-8 max-w-sm w-full">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-accent" />
          </div>
          <h1 className="font-display text-xl text-foreground">Nouveau mot de passe</h1>
          <p className="font-body text-sm text-muted-foreground mt-1">
            Définissez votre nouveau mot de passe administrateur
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded p-3 mb-4 font-body text-sm">
            {error}
          </div>
        )}

        {done ? (
          <div className="bg-accent/10 border border-accent/20 text-foreground rounded p-3 font-body text-sm text-center">
            Mot de passe mis à jour. Redirection vers la connexion...
          </div>
        ) : checkingLink ? (
          <p className="font-body text-sm text-muted-foreground text-center">
            Vérification du lien de réinitialisation en cours...
          </p>
        ) : !isRecovery ? (
          <div className="space-y-4 text-center">
            <p className="font-body text-sm text-muted-foreground">
              Ce lien a expiré ou a déjà été utilisé. Demandez un nouveau lien depuis la page de connexion.
            </p>
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="font-body text-sm font-semibold text-accent hover:underline"
            >
              Retour à la connexion
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nouveau mot de passe"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} pl-10 pr-10`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirmer le mot de passe"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className={`${inputClass} pl-10`}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-accent-foreground py-3 rounded font-body font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-50"
            >
              {loading ? "Mise à jour..." : "Valider le nouveau mot de passe"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;

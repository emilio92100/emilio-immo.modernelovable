import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Fenêtre du site.
 *  Ordinateur : fenêtre au centre.
 *  Téléphone : panneau qui monte du bas (trois quarts de l’écran, ou presque tout l’écran avec `haute`),
 *  le bouton d’envoi (`footer`) reste toujours visible en bas, on fait défiler seulement le contenu. */
export const ModalShell = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  wide,
  haute,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  /** Barre du bas, toujours visible (boutons d’envoi) */
  footer?: ReactNode;
  wide?: boolean;
  /** Sur téléphone, le panneau monte presque jusqu’en haut (parcours en plusieurs étapes) */
  haute?: boolean;
}) => (
  <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-[90] bg-[rgba(19,36,61,0.55)] backdrop-blur-[2px] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
      <Dialog.Content
        aria-describedby={undefined}
        className={cn(
          "fixed z-[91] flex flex-col overflow-hidden bg-white font-jakarta focus:outline-none",
          /* Téléphone : le panneau du bas */
          "inset-x-0 bottom-0 rounded-t-[28px] shadow-[0_-30px_60px_-30px_rgba(5,14,30,0.6)]",
          haute ? "h-[calc(100svh-28px)]" : "max-h-[86svh]",
          "max-sm:data-[state=open]:animate-[feuille-monte_.34s_cubic-bezier(.22,.8,.24,1)_both] max-sm:data-[state=closed]:animate-[feuille-descend_.22s_ease-in_both]",
          /* Ordinateur : la fenêtre au centre */
          "sm:inset-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:h-auto sm:max-h-[calc(100vh-32px)] sm:w-[calc(100%-32px)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[26px] sm:shadow-[0_60px_120px_-40px_rgba(0,0,0,0.6)]",
          wide ? "sm:max-w-[860px]" : "sm:max-w-[640px]",
          "sm:data-[state=open]:animate-in sm:data-[state=open]:fade-in-0 sm:data-[state=open]:zoom-in-95 sm:data-[state=closed]:animate-out sm:data-[state=closed]:fade-out-0 sm:data-[state=closed]:zoom-out-95",
        )}
      >
        <Dialog.Title className="sr-only">{title}</Dialog.Title>
        {description && <Dialog.Description className="sr-only">{description}</Dialog.Description>}
        <span aria-hidden className="mx-auto mt-2.5 block h-1 w-10 flex-none rounded-full bg-[#D5DEEA] sm:hidden" />
        <Dialog.Close
          aria-label="Fermer"
          className="absolute right-3.5 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-brand-surf text-brand-ink transition hover:bg-brand-sky sm:right-6 sm:top-6 sm:h-11 sm:w-11"
        >
          <X className="h-[18px] w-[18px]" strokeWidth={2.4} />
        </Dialog.Close>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-[18px] pb-4 pt-3 sm:px-8 sm:pb-6 sm:pt-8">{children}</div>
        {footer && (
          <div className="flex-none border-t border-brand-line2 bg-white px-[18px] pb-[max(14px,env(safe-area-inset-bottom))] pt-3 sm:px-8 sm:pb-6 sm:pt-4">{footer}</div>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

/** Avatars empilés : Alexandre + l'équipe. */
export const TeamStack = ({ photo, size = 44 }: { photo: string; size?: number }) => (
  <span className="flex flex-none">
    <span className="block overflow-hidden rounded-full bg-brand-tint shadow-[0_0_0_3px_#fff]" style={{ width: size, height: size }}>
      <img src={photo} alt="" className="block w-full object-cover object-top" style={{ height: size * 1.45 }} />
    </span>
    <span
      aria-hidden
      className="grid place-items-center rounded-full bg-brand text-white shadow-[0_0_0_3px_#fff]"
      style={{ width: size, height: size, marginLeft: -12, fontSize: Math.round(size * 0.3), fontWeight: 800 }}
    >
      +5
    </span>
  </span>
);

/** Le bouton d’envoi : petit rond qui tourne et « Envoi en cours… » pendant l’envoi. */
export const BoutonEnvoi = ({ onClick, disabled, sending, children, icon, className }: { onClick: () => void; disabled?: boolean; sending?: boolean; children: ReactNode; icon?: ReactNode; className?: string }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled || sending}
    aria-busy={sending}
    className={cn(
      "relative inline-flex h-[54px] min-w-0 items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-2xl bg-brand-orange px-6 text-[15.5px] font-extrabold text-brand-ink transition hover:brightness-105 disabled:cursor-not-allowed",
      disabled && !sending && "opacity-45",
      className,
    )}
  >
    {sending && <span aria-hidden className="absolute inset-0 animate-[envoi-vague_1.2s_linear_infinite] bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.45)_50%,transparent_70%)] bg-[length:200%_100%]" />}
    {sending ? (
      <>
        <span aria-hidden className="relative h-[18px] w-[18px] animate-spin rounded-full border-[2.5px] border-brand-ink/25 border-t-brand-ink" />
        <span className="relative">Envoi en cours…</span>
      </>
    ) : (
      <>
        <span className="truncate">{children}</span>
        {icon}
      </>
    )}
  </button>
);

/** La coche qui se dessine, avec de petits éclats autour : la demande est bien partie. */
export const CocheEnvoyee = ({ size = 84 }: { size?: number }) => (
  <span className="relative grid place-items-center" style={{ width: size, height: size }} aria-hidden>
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
      <span
        key={a}
        className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
        style={{
          background: i % 2 ? "#E68B23" : "#22497D",
          animation: `eclat .7s cubic-bezier(.22,.8,.24,1) ${0.35 + (i % 3) * 0.04}s both`,
          ["--dx" as string]: `${Math.cos((a * Math.PI) / 180) * size * 0.72}px`,
          ["--dy" as string]: `${Math.sin((a * Math.PI) / 180) * size * 0.72}px`,
        }}
      />
    ))}
    <span className="absolute inset-0 rounded-full bg-[#E9F5EF]" style={{ animation: "coche-fond .45s cubic-bezier(.34,1.56,.64,1) both" }} />
    <svg viewBox="0 0 52 52" className="relative" style={{ width: size * 0.62, height: size * 0.62 }}>
      <circle cx="26" cy="26" r="23" fill="none" stroke="#2E9A66" strokeWidth="3.5" pathLength={1} className="coche-trait" style={{ animationDelay: ".1s" }} />
      <path d="M15 27 l7.5 7.5 L37 19.5" fill="none" stroke="#2E9A66" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="coche-trait" style={{ animationDelay: ".42s" }} />
    </svg>
  </span>
);

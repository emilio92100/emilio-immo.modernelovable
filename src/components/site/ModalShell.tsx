import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Fenêtre centrée sur ordinateur, plein écran sur téléphone. */
export const ModalShell = ({
  open,
  onClose,
  title,
  description,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  wide?: boolean;
}) => (
  <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-[90] bg-[rgba(19,36,61,0.62)] backdrop-blur-[2px] data-[state=open]:animate-in data-[state=open]:fade-in-0" />
      <Dialog.Content
        aria-describedby={description ? undefined : undefined}
        className={cn(
          "fixed inset-0 z-[91] flex flex-col overflow-y-auto bg-white p-[18px] focus:outline-none",
          "sm:inset-auto sm:left-1/2 sm:top-1/2 sm:max-h-[calc(100vh-32px)] sm:w-[calc(100%-32px)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[26px] sm:p-8 sm:shadow-[0_60px_120px_-40px_rgba(0,0,0,0.6)]",
          wide ? "sm:max-w-[860px]" : "sm:max-w-[640px]",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        )}
      >
        <Dialog.Title className="sr-only">{title}</Dialog.Title>
        {description && <Dialog.Description className="sr-only">{description}</Dialog.Description>}
        <Dialog.Close
          aria-label="Fermer"
          className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-brand-pale text-brand-ink transition hover:bg-brand-tint sm:right-6 sm:top-6"
        >
          <X className="h-[18px] w-[18px]" strokeWidth={2.4} />
        </Dialog.Close>
        {children}
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

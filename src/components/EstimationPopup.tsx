/* Ancien point d'entrée de l'estimation, gardé pour toutes les pages qui l'utilisent
   (pages villes, guide, page Estimation…). Il ouvre désormais le nouveau parcours. */
import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { useSiteModals } from "@/components/site/SiteModals";

interface EstimationPopupProps {
  trigger: ReactNode;
  defaultCity?: string;
  defaultPostalCode?: string;
}

const EstimationPopup = ({ trigger, defaultCity, defaultPostalCode }: EstimationPopupProps) => {
  const { openEstimation } = useSiteModals();
  const open = () => openEstimation({ city: defaultCity, postalCode: defaultPostalCode });
  if (isValidElement(trigger)) {
    const el = trigger as ReactElement<{ onClick?: (e: unknown) => void }>;
    return cloneElement(el, {
      onClick: (e: unknown) => {
        el.props.onClick?.(e);
        open();
      },
    });
  }
  return (
    <button type="button" onClick={open}>
      {trigger}
    </button>
  );
};

export default EstimationPopup;

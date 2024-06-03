import { FC } from "react";
import { useCampervanLinks } from "@@/pages/Layout/Campervans/hooks";

interface CampervanLinkProps {
  className?: string;
  variant?: "desktop" | "mobile";
}

const CampervanLink: FC<CampervanLinkProps> = ({ className, variant = "desktop" }) => {
  const campervanChannel = useCampervanLinks();

  if (!campervanChannel) {
    return null;
  }

  const contentEL = (
    <a
      href={`https://${campervanChannel.key}.com/campervan-hire`}
      id="campervanClick"
      aria-label="Campervans"
      rel="noopener noreferrer"
      target="_blank"
      className={className}
    >
      Campervans
    </a>
  );

  return variant === "desktop" ? <div>{contentEL}</div> : <li className="list-none m-0">{contentEL}</li>;
};

export default CampervanLink;

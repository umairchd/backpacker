import { FC } from "react";
import { useCarRentalLinks } from "@@/pages/Layout/CarRental/carRentalHooks";
import Link from "next/link";

type CarRentalLinkProps = {
  className?: string;
  variant?: "desktop" | "mobile";
};

const CarRentalLink: FC<CarRentalLinkProps> = ({ className, variant = "desktop" }) => {
  const carRentalDetails = useCarRentalLinks();

  if (!carRentalDetails) {
    return null;
  }

  const contentEL = (
    <Link
      href={carRentalDetails.href}
      id="carRentalClick"
      aria-label="Car Rental"
      rel="noopener noreferrer"
      target="_blank"
      className={className}
    >
      Car Rental
    </Link>
  );

  return variant === "desktop" ? <div>{contentEL}</div> : <li className="list-none m-0">{contentEL}</li>;
};

export default CarRentalLink;

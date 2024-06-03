import FooterDefault from "@@/themes/footer/FooterDefault";
import FooterFlightCentre from "@@/themes/footer/FooterFlightCentre";
import { FC } from "react";

type FooterComponentProps = {
  theme: string;
};

const BottomArea: FC<FooterComponentProps> = ({ theme }) => {
  switch (theme) {
    case "flightcentrev2":
    case "flightcentrev2b":
      return <FooterFlightCentre />;
    default:
      return <FooterDefault />;
  }
};

export default BottomArea;

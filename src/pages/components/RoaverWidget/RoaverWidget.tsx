import Script from "next/script";
import { FC, useEffect } from "react";
import { useCarRentalLinks } from "@@/pages/Layout/CarRental/carRentalHooks";
import "./styles/roaverWidgetStyle.scss";

type RoaverWidgetProps = {
  dataType: "search" | "book";
};

// Ensure to create a corresponding style in styles/roaverWidgetStyle.scss
// to override the default colors coming from roaver script
const roaverNewWidgetUniqueId = "roaver-widget-inject-Qr7p2f9E5s6t";

const RoaverWidget: FC<RoaverWidgetProps> = ({ dataType = "search" }) => {
  const carRentalDetails = useCarRentalLinks();

  useEffect(() => {
    let inputElement;
    let time;
    const selectRoaverCarProgrammatically = () => {
      if (!inputElement) {
        inputElement = document.querySelector('[data-tab="cars"]');
        time = setTimeout(() => {
          selectRoaverCarProgrammatically();
        }, 200);
      } else {
        inputElement.click();
      }
    };

    // Call the function initially
    selectRoaverCarProgrammatically();

    // Clean up the timeout when the component unmounts or condition becomes true
    return () => clearTimeout(time);
  }, []);

  return (
    <>
      <Script
        async
        src="https://app.roaver.com.au/assets/scripts/build/widget.js"
        data-key={carRentalDetails?.dataKey ?? "backpacker-deals"}
        data-type={dataType}
        data-locale="en"
        data-inject={roaverNewWidgetUniqueId}
      />

      <div id={roaverNewWidgetUniqueId} />
    </>
  );
};

export default RoaverWidget;

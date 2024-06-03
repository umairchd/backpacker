import Script from "next/script";
import { FC } from "react";
import classes from "../SearchWidget.module.scss";
import { WidgetRoaverProps } from "../utils";

const SearchWidget: FC<WidgetRoaverProps> = ({ src }) => {
  return (
    <div className={classes["search-widget"]}>
      <div className={classes["campervan-widget"]}>
        <Script
          async
          src={`https://portal.roaver.com.au/js/client/${src}.js`}
          data-roaver-key="tlo"
          data-roaver-path-search="/"
          data-roaver-path-book="/booking-flow"
          data-roaver-locale="en"
        />

        <div id="roaver-inject" />
      </div>
    </div>
  );
};

export default SearchWidget;

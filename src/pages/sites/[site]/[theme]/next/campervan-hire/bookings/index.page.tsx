import { FC } from "react";
import classes from "../CampervanHire.module.scss";
import WidgetRoaver from "../components/SearchWidget";

export { getServerSideProps } from "../index.page-server";

const CampervanHireBooking: FC = () => {
  return (
    <div className={classes["campervan-hire-section"]}>
      <div className="container pb-8">
        <div className={classes["section"]}>
          <div className={classes["search-widget-booking"]}>
            <div className={classes["campervan-widget"]}>
              <WidgetRoaver src="client-booking-flow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampervanHireBooking;

import { FC } from "react";
import RoaverWidget from "@@/pages/components/RoaverWidget/RoaverWidget";
import classes from "../../campervan-hire/CampervanHire.module.scss";
export { getServerSideProps } from "../index.page-server";

const CarRentalBooking: FC = () => {
  return (
    <div className={classes["campervan-hire-section"]}>
      <div className="container pb-8">
        <div className={classes["section"]}>
          <div className={classes["search-widget-booking"]}>
            <div className={classes["campervan-widget"]}>
              <RoaverWidget dataType="book" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarRentalBooking;

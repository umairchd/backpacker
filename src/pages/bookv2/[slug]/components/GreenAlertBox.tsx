import React from "react";

import classes from "./GreenAlertBox.module.scss";
import Tooltip from "@@/pages/components/Tooltip";
import { FaCircleInfo, FaHeart } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";

const GreenAlertBox = () => {
  const renderFreeCancellationTooltip = (props) => (
    <Tooltip
      id="button-tooltip"
      {...props}
      className={classes["info-tooltip"]}
    >
      <h4>
        <FaCircleInfo /> Free Cancellation
      </h4>
      <p>
        We offer cancellations without a service fee. Please check the individual cancellation policy of your tour or
        activity.
      </p>
      <p>For more details please check our FAQ.</p>
    </Tooltip>
  );

  const renderSafePaymentsTooltip = (props) => (
    <Tooltip
      id="button-tooltip"
      {...props}
      className={classes["info-tooltip"]}
    >
      <h4>
        <FaCircleInfo /> Safe Payments
      </h4>
      <p>
        100% Safe payments: We do not store your credit card details, all your payments are processed via a highly
        secured 3rd party payment gateway. We are a Norton Security Site, all your information is processed over SSL.
      </p>
    </Tooltip>
  );

  return (
    <a
      href="/why-book-with-us"
      target="_blank"
      rel="noreferrer"
    >
      <div
        className={`${classes["green-box"]} relative p-4 mb-4 rounded-md border text-AlertGT bg-AlertBg border-AlertBorder`}
      >
        <div>
          <FaHeart />
          {renderFreeCancellationTooltip({ position: "top" })}
          <div>
            <h3>Free cancellation available*</h3>
          </div>
        </div>
        <div>
          <FaRegCheckCircle />
          {renderFreeCancellationTooltip({ position: "top" })}
          <div>
            <h3>100% Safe Payments*</h3>
          </div>
        </div>
      </div>
    </a>
  );
};

export default GreenAlertBox;

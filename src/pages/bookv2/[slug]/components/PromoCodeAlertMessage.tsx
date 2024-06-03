import classes from "./PromoCodeAlertMessage.module.scss";
import { FC } from "react";

interface PromoCodeAlertMessageProps {
  promocode: string;
  handleAlertClose: () => void;
  statusMessage: string;
  status: boolean;
}

const PromoCodeAlertMessage: FC<PromoCodeAlertMessageProps> = ({
  promocode,
  handleAlertClose,
  statusMessage,
  status,
}) => {
  if (status === null) {
    return null;
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={`${classes["promocode-alert"]} relative p-4 mb-4 rounded-md border ${
        status
          ? "text-AlertGT bg-AlertBg border-AlertBorder"
          : `text-AlertET bg-AlertEBg border-AlertEBorder ${classes["promocode-alert-error"]}`
      }`}
      onClick={handleAlertClose}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleAlertClose();
        }
      }}
      onTouchStart={(e) => {
        e.preventDefault();
        handleAlertClose();
      }}
    >
      <b>{promocode}</b> {statusMessage}
    </div>
  );
};

export default PromoCodeAlertMessage;

import React, { FC } from "react";

import { usePhoneNumber } from "@@/pages/hooks/usePhoneNumber";

import classes from "./PageFooter.module.scss";
import Button from "@@/pages/components/Button";
import { FaMobileScreen } from "react-icons/fa6";

interface PageFooterProps {
  isButtonDisabled: boolean;
  onSubmit: () => void;
  buttonText: string;
}

const PageFooter: FC<PageFooterProps> = ({
  isButtonDisabled,
  onSubmit,
  buttonText,
}) => {
  const phoneNumber = usePhoneNumber();

  return (
    <>
      <div className={classes["bottom-part"]}>
        <Button
          type="button"
          variant="primary"
          className={classes["payment-step-button"]}
          disabled={isButtonDisabled}
          onClick={onSubmit}
        >
          {buttonText}
        </Button>
        <div>
          <div>Need help with booking?</div>
          <div>
            <FaMobileScreen />
            <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
          </div>
        </div>
      </div>
      <span className={classes["policy-terms"]}>
        By clicking on {buttonText}, you agree to all our and suppliers{" "}
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
          privacy policy
        </a>{" "}
        and{" "}
        <a
          href="/terms-and-conditions"
          target="_blank"
          rel="noopener noreferrer"
        >
          terms & conditions
        </a>
        .
      </span>
    </>
  );
};

export default PageFooter;

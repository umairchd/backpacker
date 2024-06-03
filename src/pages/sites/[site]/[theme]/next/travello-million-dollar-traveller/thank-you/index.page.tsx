import { FC, useEffect, useState } from "react";

import { useMillionDollarTravellers } from "../hooks";
import { useGiveawaySignUpLocalstorage } from "@@/features/giveawaySignUpForm/hooks/useGiveawaySignUpLocalstorage";

import classes from "./ConfirmationPage.module.scss";
import ShareInfo from "@@/features/shareInfo/ShareInfo";
import GiveawaySection from "@@/pages/components/GiveawaySection/components/GiveawaySection";
import Button from "@@/pages/components/Button";
import { FaCheckCircle } from "react-icons/fa";

export { getServerSideProps } from "../index.page-server";

const ConfirmationPage: FC = () => {
  // this will fix hydration error
  const [isDirectConfirmPage, setIsDirectConfirmPage] =
    useState<boolean>(false);

  const { isSignUpCompetition } = useGiveawaySignUpLocalstorage();

  const { url, shouldShowMillionDollarLandingPage } =
    useMillionDollarTravellers();

  useEffect(() => {
    setIsDirectConfirmPage(true);
  }, []);

  if (
    !isDirectConfirmPage ||
    !isSignUpCompetition ||
    !shouldShowMillionDollarLandingPage
  ) {
    return null;
  }

  return (
    <GiveawaySection isThankYou={true} className={classes["container-content"]}>
      <div
        className={`white-card shadow-sm ${classes["confirmation-page-container"]}`}
      >
        <div className={classes["card-confirmation"]}>
          <div className="flex">
            <div className="text-center">
              <FaCheckCircle className={classes["icon-check-circle"]} />

              <h1 className="mb-0">You&apos;re in the draw - Good luck!</h1>

              <h2 className="mb-4">
                Want to increase your chances of winning $1 Million Dollars?
              </h2>
            </div>
          </div>

          <div className={`${classes["content"]} grid grid-cols-12 gap-6`}>
            <div className="col-span-12 lg:col-span-8">
              <div className="text-center">
                <p className="pb-2">
                  Score an extra 5 ENTRIES into our Million Dollar Traveller
                  draw every time you purchase any of our tours or activities*.
                </p>

                <p className="pb-2">
                  That&apos;s right, not only do we offer a best price
                  guarantee, free cancellations AND up to 10% cash back across
                  all of our experiences - but you also get an extra 5 ENTRIES
                  into the $1 Million draw every time you book!
                </p>

                <p className="pb-2">
                  So go on… start exploring and get booking!
                </p>
              </div>
            </div>
          </div>

          <div>
            <Button
              variant="primary"
              href="/"
              target="_blank"
              rel="noreferrer noopener"
              className={classes["button-explore"]}
            >
              Explore Deals
            </Button>
          </div>
          <div>
            <p className={classes["terms"]}>
              *Entries close July 31, 2023. Bookings can be made for any
              departure date in 2023. No minimum spend.
            </p>

            <ShareInfo
              className={classes["share-info"]}
              title="Share with your friends"
              url={url}
            />
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <span className={classes["terms"]}>
                See{" "}
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <strong>here</strong>
                </a>{" "}
                for competition details, including full terms and conditions.
              </span>
            </div>
          </div>
        </div>
      </div>
    </GiveawaySection>
  );
};

export default ConfirmationPage;

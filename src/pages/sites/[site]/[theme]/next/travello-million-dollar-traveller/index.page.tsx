import { FC } from "react";
import { useMillionDollarTravellers } from "./hooks";

import classes from "./TravelloMillionDollarTraveller.module.scss";
import ShareInfo from "@@/features/shareInfo/ShareInfo";
import GiveawaySection from "@@/pages/components/GiveawaySection/components/GiveawaySection";
import GiveawaySignUpForm from "@@/features/giveawaySignUpForm/GiveawaySignUpForm";
import Button from "@@/pages/components/Button";

export { getServerSideProps } from "./index.page-server";

const MillionDollarTravellersPage: FC = () => {
  const { iterable_key, url, shouldShowMillionDollarLandingPage } =
    useMillionDollarTravellers();

  const contentFirst = (
    <>
      <p className="text-center">
        With infinite memories to be made, millions of things to see and do and
        thousands of locations to choose from - where would $1 MILLION DOLLARS
        take you?
      </p>

      <h4>Enter your email below for your chance to win!</h4>
    </>
  );

  const contentSecond = (
    <>
      <h4 className="mt-2">Feeling extra lucky?</h4>

      <p className="text-center mb-1">
        Book any of our tours or experiences and score an extra 5 entries per
        booking!
      </p>
    </>
  );

  if (!iterable_key || !shouldShowMillionDollarLandingPage) {
    return null;
  }

  return (
    <GiveawaySection className={classes["container-content"]}>
      <div className={classes["title"]}>
        <h1>Are you Travello&apos;s Million Dollar Traveller?</h1>
      </div>

      <div className={`${classes["contents"]} grid grid-cols-12 gap-6`}>
        <div className="col-span-12 lg:col-span-8">{contentFirst}</div>
      </div>

      <GiveawaySignUpForm iterableKey={iterable_key} />

      <div className={`${classes["contents"]} grid grid-cols-12 gap-6`}>
        <div className="col-span-12 lg:col-span-8">{contentSecond}</div>
      </div>

      <div className={`${classes["button-explore"]} grid grid-cols-12 gap-6`}>
        <div className="col-span-6 md:col-span-4 lg:col-span-3">
          <Button
            variant="primary"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore Now
          </Button>
        </div>
      </div>

      <ShareInfo
        className={classes["share-info"]}
        title="Share with your friends"
        url={url}
      />
    </GiveawaySection>
  );
};

export default MillionDollarTravellersPage;

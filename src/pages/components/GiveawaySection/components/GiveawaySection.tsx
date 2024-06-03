import { FC } from "react";

import { bannerImage } from "../utils";
import { GiveawaySectionProps } from "../types";

import Head from "next/head";
import clsx from "clsx";
import dynamic from "next/dynamic";
import GiveawayBanner from "./GiveawayBanner";

const LocalProductSlider = dynamic(() => import("@@/pages/Home/LocalProductSlider"), { ssr: false });

const GiveawaySection: FC<GiveawaySectionProps> = ({ className, children, isThankYou = false }) => {
  const { main, thankYou, footer } = bannerImage ?? {};
  const date = new Date().getTime();

  return (
    <>
      <Head>
        <link
          rel="preload"
          as="image"
          href={main}
        />
        <meta
          property="og:image"
          content={`${main}?v=${date}`}
        />
        <meta
          property="twitter:image"
          content={`${main}?v=${date}`}
        />
      </Head>

      <section className={clsx([className])}>
        <div className="max-w-1320px px-3 sm:px-6 mx-auto">
          <GiveawayBanner
            src={isThankYou ? thankYou : main}
            alt="Banner - Million Dollar Traveller"
          />

          {children}

          <GiveawayBanner
            src={footer}
            alt="Footer - Million Dollar Traveller"
          />

          <div className="mb-3">
            <LocalProductSlider isMillionDollarPage={true} />
          </div>
        </div>
      </section>
    </>
  );
};

export default GiveawaySection;

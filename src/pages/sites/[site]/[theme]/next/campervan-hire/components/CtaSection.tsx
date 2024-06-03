import { FC } from "react";
import classes from "../CampervanHire.module.scss";
import clsx from "clsx";
import { countryDatas } from "../utils";
import Image from "next/image";
import OptimizedHeroImage from "@@/pages/components/HeroImage/OptimizedHeroImage";

const CtaSection: FC = () => {
  const ctaBackgroundImage = "https://assets.backpackerdeals.com/uploads/content/cta-background.jpg";

  return (
    <div className={classes["cta-section"]}>
      <div className={classes["banner-image-overlay"]}>
        <div className={classes["background-overlay"]} />
        <OptimizedHeroImage
          src={ctaBackgroundImage}
          alt="Need Help Planning Your Trip?"
        />
      </div>

      <div className={classes["cta-content"]}>
        <h2>Need Help Planning Your Trip?</h2>

        <p>
          Our team is available 7 days per week. Reach out to our friendly team for the expert advice you need to plan
          your perfect campervan adventure. Or, contact us anytime
          <a
            href="/contact-us"
            target="_blank"
            rel="noopener noreferrer"
          >
            HERE
          </a>
          .
        </p>

        <div className={classes["cta-buttons"]}>
          <a
            href="mailto:support@backpackerdeals.com"
            className={clsx("btn btn-secondary", classes["btn-email"])}
          >
            support@backpackerdeals.com
          </a>

          <a
            href="tel:1300358071"
            className={clsx("btn btn-secondary", classes["btn-phone"])}
          >
            1300 358 071
          </a>
        </div>

        <div className={classes["language-content"]}>
          <h3>We speak many languages</h3>

          <div className={classes["language-list"]}>
            {countryDatas.map((country) => (
              <div
                key={country.name}
                className={classes["language-item"]}
              >
                <Image
                  loader={({ src }) => src}
                  src={country.flag}
                  alt={country.name}
                  width={32}
                  height={32}
                  loading="eager"
                />
                <span>{country.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;

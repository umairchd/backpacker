import { FC } from "react";
import classes from "../CampervanHire.module.scss";
import { experienceImageList, experienceList } from "../utils";
import OptimizedHeroImage from "@@/pages/components/HeroImage/OptimizedHeroImage";

const ExperienceVoucher: FC = () => {
  return (
    <div className="container">
      <div className={classes["section"]}>
        <div className={classes["v-section"]}>
          <div className={classes["v-content-left"]}>
            <h2>Your $50 experience voucher</h2>

            <ul className={classes["v-list"]}>
              {experienceList.map((experience) => (
                <li
                  className="list-none m-0"
                  key={experience.id}
                  dangerouslySetInnerHTML={{ __html: experience.label }}
                />
              ))}
            </ul>

            <div className={classes["button-cta"]}>
              <a
                href="/australia/campervan-bucketlist-route"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Bucket List AUS Tour
              </a>
            </div>
          </div>

          <div className={classes["v-content-right"]}>
            <h2>Your $50 experience voucher</h2>

            <div className={classes["v-image-list"]}>
              {experienceImageList.map((experience) => (
                <div
                  key={experience.id}
                  className={classes["v-image-item"]}
                >
                  <OptimizedHeroImage
                    src={experience.image}
                    alt={experience.alt}
                  />
                </div>
              ))}
            </div>

            <p>
              Make your journey even MORE unforgettable with our exclusive $50 Experience Voucher to use on tours and
              experiences across Australia and New Zealand.*
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceVoucher;

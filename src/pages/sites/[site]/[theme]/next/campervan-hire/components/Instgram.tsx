import { FC } from "react";
import classes from "../CampervanHire.module.scss";
import backpackerdealsVerify from "../icons/icn-backpackerdeals-verify.svg";
import { instagramContents } from "../utils";
import OptimizedHeroImage from "@@/pages/components/HeroImage/OptimizedHeroImage";

const Instagram: FC = () => {
  const mainContent = instagramContents.find((item) => item.id === 1);

  const otherContents = instagramContents.filter((item) => item.id !== 1);

  return (
    <div className="container">
      <div className={classes["section"]}>
        <div className={classes["instagram-section"]}>
          <div className={classes["instagram-header"]}>
            <h2>Follow us on Instagram</h2>

            <div className={classes["instagram-header-content"]}>
              <p>Find us on instagram and follow for the latest offer and services</p>
              <a
                href="https://www.instagram.com/backpackerdeals/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <OptimizedHeroImage
                  src={backpackerdealsVerify.src}
                  alt="backpackerdeals verify"
                  width={205}
                  height={34}
                />
              </a>
            </div>
          </div>

          <div className={classes["instagram-contents"]}>
            <div className={classes["instagram-main"]}>
              <a
                href={mainContent.src}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={classes["instagram-icon"]} />
                <OptimizedHeroImage
                  src={mainContent.img}
                  alt={mainContent.alt}
                />
              </a>
            </div>

            <div className={classes["instagram-others"]}>
              {otherContents.map((item) => (
                <div
                  className={classes["instagram-other"]}
                  key={item.id}
                >
                  <a
                    href={item.src}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className={classes["instagram-icon"]} />
                    <OptimizedHeroImage
                      src={item.img}
                      alt={item.alt}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instagram;

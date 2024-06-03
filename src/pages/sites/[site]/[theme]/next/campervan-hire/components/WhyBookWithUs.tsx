import { FC } from "react";
import classes from "../CampervanHire.module.scss";
import { whyBookWithUsDatas } from "../utils";
import { useBreakpoints } from "@@/features/utils";
import { useCampervanLinks } from "@@/pages/Layout/Campervans/hooks";

const WhyBookWithUs: FC = () => {
  const linkToAboutUs = (
    <a href="/about-us" target="_blank" rel="noreferrer">
      More about us
    </a>
  );

  const { mdUp: isDesktop } = useBreakpoints();
  const campervanChannel = useCampervanLinks();

  return (
    <div className={classes["why-book-with-us-section"]}>
      <div className={classes["why-book-with-us-header"]}>
        <h2>Why Book With Us?</h2>

        {linkToAboutUs}
      </div>

      <div className={classes["why-book-with-us-content"]}>
        {whyBookWithUsDatas.map((data) => {
          const description = data.description.replace(
            "[channel]",
            campervanChannel.name
          );

          return (
            <div
              className={classes["why-book-with-us-item"]}
              key={data.id}
              style={{
                display: `${isDesktop ? "block" : data.display}`,
              }}
            >
              <img src={data.icon} alt={data.title} width={100} height={100} />
              <h3>{data.title}</h3>
              <p>{description}</p>
            </div>
          );
        })}
      </div>

      <div className={classes["why-book-with-us-mobile"]}>{linkToAboutUs}</div>
    </div>
  );
};

export default WhyBookWithUs;

import { HomePageQuery } from "@@/pages/queries.generated";

const LastMinuteBanner: React.FC<HomePageQuery> = function LastMinuteBanner({ channel: { siteConfig } }) {
  const {
    bannerIconImage,
    banner_background_color,
    banner_background_secondary_color,
    banner_heading,
    banner_text,
    banner_url,
    is_banner_active,
  } = siteConfig;

  if (!is_banner_active) {
    return null;
  }

  const background =
    banner_background_color && !banner_background_secondary_color
      ? banner_background_color
      : `linear-gradient(-135deg, ${banner_background_secondary_color} 0%, ${banner_background_color} 90%)`;

  return (
    <a
      href={banner_url}
      target="_blank"
      rel="noreferrer"
    >
      <div
        className="lmDealBanner"
        style={{ background }}
      >
        {bannerIconImage ? (
          <div
            className="lmDeal3DIcon shakeAnimation"
            style={{
              background: `url(${bannerIconImage.icon})  no-repeat center/cover;`,
            }}
          />
        ) : null}

        <div className="lmDealText">
          <h3>{banner_heading}</h3>
          <span
            dangerouslySetInnerHTML={{ __html: banner_text }}
            suppressHydrationWarning
          ></span>
        </div>
        <div className="lmDealArrow "></div>
      </div>
    </a>
  );
};

export default LastMinuteBanner;

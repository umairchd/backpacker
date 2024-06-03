import type { SiteConfig } from "@@/app/data/getChannelByHost";

function HeaderBanner({ siteConfig }: { siteConfig: SiteConfig }) {
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
    <div className="w-full text-center text-white h-auto">
      <a
        href={banner_url}
        target="_blank"
        rel="noreferrer"
      >
        <div style={{ background }}>
          {bannerIconImage ? (
            <div
              className="lmDeal3DIcon shakeAnimation"
              style={{
                background: `url(${bannerIconImage.icon})  no-repeat center/cover;`,
              }}
            />
          ) : null}

          <div className="flex items-center justify-center text-base py-2 max-767-h-70px max-767-flex-col max-767-text-13">
            <h2 className="my-0 mx-2 leading-30px md:leading-38px">{banner_heading}</h2>
            <span
              className="headerBanner"
              dangerouslySetInnerHTML={{ __html: banner_text }}
              suppressHydrationWarning
            ></span>
          </div>
        </div>
      </a>
    </div>
  );
}

export default HeaderBanner;

import { FC } from "react";
import classes from "../CampervanHire.module.scss";

import backpackerdealsLogo from "../icons/logo-backpackerdeals.svg";
import travelloLogo from "../icons/travello-logo.png";
import { navigationLinksMiddle, navigationLinksRight } from "../utils";
import MobileNav from "./MobileNav";
import { useBreakpoints } from "@@/features/utils";
import { useCampervanLinks } from "@@/pages/Layout/Campervans/hooks";

const Navigation: FC = () => {
  const { navXlUp: isDesktop } = useBreakpoints();

  const campervanChannel = useCampervanLinks();

  const logo =
    campervanChannel.channel === "travelloapp"
      ? travelloLogo
      : backpackerdealsLogo;

  return (
    <>
      <div className={classes["header-banner-section"]}>
        <h2>Best Price Guarantee & </h2>
        <div className={classes["header-banner-content"]}>
          <span className={classes["get-off-booking"]}>
            Get $50 off any Tour/Activity Booking.
          </span>
          <span className={classes["limited-time-offer"]}>
            Limited time offer
          </span>
        </div>
      </div>
      <nav className={classes["navigation-section"]}>
        <div className="container">
          <div className={classes["nav-content"]}>
            <div className={classes["logo"]}>
              <a href="/">
                <img
                  src={logo.src}
                  alt="Backpacker Deals"
                  width={190}
                  height={60}
                  loading="lazy"
                />
              </a>
            </div>

            {isDesktop ? (
              <>
                <div className={classes["nav-links"]}>
                  {navigationLinksMiddle.map((menu) => (
                    <a
                      key={menu.id}
                      href={menu.link}
                      className={classes["link-item"]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={menu.icon}
                        alt={menu.text}
                        width={20}
                        height={20}
                        loading="lazy"
                      />
                      <span>{menu.text}</span>
                    </a>
                  ))}
                </div>

                <div className={classes["nav-links-right"]}>
                  {navigationLinksRight.map((menu) => (
                    <a
                      key={menu.id}
                      href={menu.link}
                      className={classes["link-item"]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={menu.icon}
                        alt={menu.text}
                        width={20}
                        height={20}
                        loading="lazy"
                      />
                      <span>{menu.text}</span>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <div className={classes["nav-links"]}>
                <a
                  key={navigationLinksMiddle[0].id}
                  href={navigationLinksMiddle[0].link}
                  className={classes["link-item"]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={navigationLinksMiddle[0].icon}
                    alt={navigationLinksMiddle[0].text}
                    width={20}
                    height={20}
                    loading="lazy"
                  />
                  <span>{navigationLinksMiddle[0].text}</span>
                </a>

                <MobileNav />
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;

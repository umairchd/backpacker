"use client";

import { FIELDS } from "@@/app/components/ContactUs/types";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import { FC } from "react";

import DinerClubIcon from "@@/themes/images/icon-cc-diners-club-international.svg";
import ByataIcon from "@@/themes/images/byata.svg";
import AdventureIcon from "@@/themes/images/adventure.svg";
import { getSocialLinks } from "@@/app/components/ContactUs/utils";

const FooterFlightCentre: FC = () => {
  const { siteConfig, blogUrl } = useServerContext();
  const { footer_social_links } = siteConfig ?? {};

  const paymentIcons = [
    {
      src: "/images/footer/icon-cc-visa.svg",
      alt: "Visa",
    },
    {
      src: "/images/footer/icon-cc-mastercard.svg",
      alt: "Mastercard",
    },
    {
      src: "/images/footer/icon-cc-amex.svg",
      alt: "American Express",
    },
    {
      src: DinerClubIcon.src,
      alt: "Diners Club",
    },
    {
      src: "/images/footer/icon-cc-paypal.svg",
      alt: "Paypal",
    },
    {
      src: "/images/footer/icon-cc-applepay.svg",
      alt: "Apple Pay",
    },
    {
      src: "/images/footer/icn-gpay.svg",
      alt: "Google Pay",
    },
  ];

  const memberOf = [
    {
      src: ByataIcon.src,
      alt: "BYATA",
      url: "https://www.byata.org.nz/",
      width: 43,
      height: 24,
    },
    {
      src: AdventureIcon.src,
      alt: "adventure queensland",
      url: "https://www.adventurequeensland.com.au/",
      width: 89,
      height: 24,
    },
  ];

  const socials = getSocialLinks(footer_social_links);

  return (
    <footer className="lg:mt-0 mt-6 bg-white pb-28 md:pb-0">
      <div className="max-w-1320px px-3 sm:px-6 mx-auto">
        <div className="sm:pt-14 pt-6 pb-4 border-b border-gray-100 grid grid-cols-12 gap-6">
          <div className="col-span-6 border-r border-inputBorder">
            <div className="h-60px mb-4">
              <img
                src="https://storage.googleapis.com/travello-inapp-webviews/img/partner-logos/logo-flightcentre-travelgroup-black.svg"
                alt="Flightcentre Powered By Travello"
                className="img-responsive"
                width={200}
                height={31}
              />
            </div>

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6">
                <ul>
                  <li className="list-none m-0">
                    <a
                      className="font-semibold text-sm"
                      href="https://www.flightcentre.com.au/about-us"
                      target="_blank"
                      rel="noreferrer"
                    >
                      About Flight Centre
                    </a>
                  </li>
                  <li className="list-none m-0">
                    <a
                      className="font-semibold text-sm"
                      href="https://help.flightcentre.com.au/s/article/contact-us-au"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li className="list-none m-0">
                    <a
                      className="font-semibold text-sm"
                      href="https://www.fctgcareers.com/brands/flight-centre/jobs"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-span-6">
                <ul>
                  <li className="list-none m-0">
                    <a
                      className="font-semibold text-sm"
                      href="https://help.flightcentre.com.au/s/article/terms-of-use-au"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Terms of Use
                    </a>
                  </li>
                  <li className="list-none m-0">
                    <a
                      className="font-semibold text-sm"
                      href="https://help.flightcentre.com.au/s/article/booking-terms-conditions-au"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li className="list-none m-0">
                    <a
                      className="font-semibold text-sm"
                      href="https://help.flightcentre.com.au/s/article/privacy-policy-au"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li className="list-none m-0">
                    <a
                      className="font-semibold text-sm"
                      href="https://www.flightcentre.com.au/sitemap"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Sitemap
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-span-6 md:ps-5">
            <div className="h-60px mb-4">
              <a
                className="font-semibold text-sm"
                href="/"
                rel="noreferrer"
              >
                <img
                  alt="Powered By Travelo"
                  src="/images/logo-powered-by-travello.svg"
                  className="img-responsive"
                  width={140}
                  height={48}
                />
              </a>
            </div>

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6">
                <ul>
                  <li className="list-none m-0">
                    <a
                      className="font-semibold text-sm"
                      href="/about-us"
                    >
                      About Travello
                    </a>
                  </li>
                  <li className="list-none m-0">
                    <a
                      className="font-semibold text-sm"
                      href="/why-book-with-us"
                    >
                      Why book with us?
                    </a>
                  </li>
                  <li className="list-none m-0">
                    <a
                      className="font-semibold text-sm"
                      href="/contact-us"
                    >
                      Help Center
                    </a>
                  </li>
                  <li className="list-none m-0">
                    <a
                      className="font-semibold text-sm"
                      href={`/contact-us?${FIELDS.ENQUIRY_TYPE}=enquiry_refund_or_cancellation`}
                    >
                      Refunds
                    </a>
                  </li>
                  <li className="list-none m-0">
                    <a
                      className="font-semibold text-sm"
                      href="/faq"
                    >
                      FAQ
                    </a>
                  </li>
                  <li className="list-none m-0">
                    <a
                      className="font-semibold text-sm"
                      target="_blank"
                      href={blogUrl}
                      rel="noreferrer"
                    >
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-span-6">
                <ul>
                  <li className="list-none m-0">
                    <a
                      className="font-semibold text-sm"
                      href="/terms-and-conditions"
                    >
                      Terms &amp; Condition
                    </a>
                  </li>
                  <li className="list-none m-0">
                    <a
                      className="font-semibold text-sm"
                      href="/privacy-policy"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li className="list-none m-0">
                    <a
                      className="font-semibold text-sm"
                      href="/refund-policy"
                    >
                      Refund Policy
                    </a>
                  </li>
                  <li className="list-none m-0">
                    <a
                      className="font-semibold text-sm"
                      href="/members-terms-of-use"
                    >
                      Terms of Use
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <h3>Social Media</h3>
            <div className="sm:flex-nowrap flex flex-wrap items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.url}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary text-2xl"
                  aria-label={social.label}
                >
                  {social.icon && <social.icon />}
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-5">
            <h3>Accepted Payments</h3>
            <ul className="sm:flex-nowrap flex flex-wrap gap-3">
              {paymentIcons.map((payment) => (
                <li
                  className="list-none m-0"
                  key={payment.alt}
                >
                  <img
                    src={payment.src}
                    alt={payment.alt}
                    width={34}
                    height={24}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 md:col-span-4">
            <h3>Members of</h3>
            <ul className="sm:flex-nowrap flex flex-wrap gap-4 p-0 m-0 md:justify-center lg:justify-start">
              {memberOf.map((member) => (
                <li
                  className="list-none m-0"
                  key={member.alt}
                >
                  <a
                    className="font-semibold text-sm"
                    href={member.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={member.src}
                      alt={member.alt}
                      width={member.width}
                      height={member.height}
                    />
                  </a>
                </li>
              ))}
              <li className="list-none m-0">
                <img
                  src="/images/footer/queensland.png"
                  alt="qtic"
                  width={72}
                  height={24}
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="py-4">
          <div className="m-0 text-xs">
            © Flight Centre Travel Group Limited trading as Flight Centre ABN 25 003 377 188
            <br />
            We use cookies to improve your experience on our website. By continuing to use our website, you are agreeing
            to our use of cookies. You can learn more in our&nbsp;
            <a
              className="font-semibold text-sm"
              href="/privacy-policy"
            >
              Privacy Policy
            </a>
            .
            <br />
            &copy; 2014-{new Date().getFullYear()} Travello Pty Ltd. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterFlightCentre;

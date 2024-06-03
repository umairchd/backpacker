"use client";

import SignUpForm from "@@/features/signUpForm/SignUpForm";
import { FIELDS } from "@@/app/components/ContactUs/types";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import { FC } from "react";

import DinerClubIcon from "@@/themes/images/icon-cc-diners-club-international.svg";
import ByataIcon from "@@/themes/images/byata.svg";
import AdventureIcon from "@@/themes/images/adventure.svg";
import { useChannelUtil } from "@@/pages/utils/useChannelUtil";
import { useCampervanHooks } from "@@/pages/sites/[site]/[theme]/next/campervan-hire/hooks";
import { getSocialLinks } from "@@/app/components/ContactUs/utils";
import Image from "next/image";

const FooterDefault: FC = () => {
  const { siteConfig, blogUrl, paymentProviders, key } = useServerContext();
  const { contact_mail, contact_phones, iterable_key, footer_social_links } = siteConfig ?? {};

  const { isBackpackerDealsChannel, isGap360Channel } = useChannelUtil(key);

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

  const { isCampervanHire } = useCampervanHooks();
  const termsAndConditionsLink = isCampervanHire
    ? "https://campervan.backpackerdeals.com/terms-and-conditions/"
    : "/terms-and-conditions";

  const cookiesContent = isBackpackerDealsChannel()
    ? "We use cookies to improve your experience on our website. By continuing to use our website, you are agreeing to our use of cookies (not applicable to users within regions governed by GDPR). You can learn more in our"
    : "We use cookies to improve your experience on our website. By continuing to use our website, you are agreeing to our use of cookies. You can learn more in our";

  const refundPolicyLink = isCampervanHire
    ? " https://campervan.backpackerdeals.com/terms-and-conditions/"
    : "/refund-policy";

  const socials = getSocialLinks(footer_social_links);

  return (
    <footer className="lg:mt-0 mt-6 bg-lightGray box-shadow-footer pb-28 md:pb-0">
      {iterable_key && <SignUpForm />}
      <div className="max-w-1320px px-3 sm:px-6 mx-auto">
        <div className="sm:pt-14  grid-cols-2 sm:pb-8 grid lg:grid-cols-4 gap-6 pt-6 pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-xs font-bold mb-4">Company</h3>
            <ul className="">
              <li className="list-none m-0">
                <a
                  className="hover:underline hover:text-primary inline-block text-11px font-normal leading-6 text-black transition-all duration-300 ease-in-out cursor-pointer"
                  href="/about-us"
                >
                  About Us
                </a>
              </li>
              <li className="list-none m-0">
                <a
                  href={termsAndConditionsLink}
                  className="hover:underline hover:text-primary inline-block text-11px font-normal leading-6 text-black transition-all duration-300 ease-in-out cursor-pointer"
                  {...(isCampervanHire
                    ? {
                        target: "_blank",
                        rel: "noreferrer",
                      }
                    : {})}
                >
                  Terms &amp; Conditions
                </a>
              </li>
              <li className="list-none m-0">
                <a
                  className="hover:underline hover:text-primary inline-block text-11px font-normal leading-6 text-black transition-all duration-300 ease-in-out cursor-pointer"
                  target="_blank"
                  href={blogUrl}
                  rel="noreferrer"
                >
                  Blog
                </a>
              </li>
              <li className="list-none m-0">
                <a
                  className="hover:underline hover:text-primary inline-block text-11px font-normal leading-6 text-black transition-all duration-300 ease-in-out cursor-pointer"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </a>
              </li>
              <li className="list-none m-0">
                <a
                  className="hover:underline hover:text-primary inline-block text-11px font-normal leading-6 text-black transition-all duration-300 ease-in-out cursor-pointer"
                  href={refundPolicyLink}
                  {...(isCampervanHire
                    ? {
                        target: "_blank",
                        rel: "noreferrer",
                      }
                    : {})}
                >
                  Refund Policy
                </a>
              </li>
              <li className="list-none m-0">
                <a
                  className="hover:underline hover:text-primary inline-block text-11px font-normal leading-6 text-black transition-all duration-300 ease-in-out cursor-pointer"
                  href="/members-terms-of-use"
                >
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold mb-4">Support</h3>
            <ul className="">
              <li className="list-none m-0">
                <a
                  className="hover:underline hover:text-primary inline-block text-11px font-normal leading-6 text-black transition-all duration-300 ease-in-out cursor-pointer"
                  href="/why-book-with-us "
                >
                  Why book with us?
                </a>
              </li>

              <li className="list-none m-0">
                <a
                  className="hover:underline hover:text-primary inline-block text-11px font-normal leading-6 text-black transition-all duration-300 ease-in-out cursor-pointer"
                  href="/faq"
                >
                  FAQ
                </a>
              </li>
              <li className="list-none m-0">
                <a
                  className="hover:underline hover:text-primary inline-block text-11px font-normal leading-6 text-black transition-all duration-300 ease-in-out cursor-pointer"
                  href="/contact-us"
                >
                  Help Center
                </a>
              </li>
              <li className="list-none m-0">
                <a
                  className="hover:underline hover:text-primary inline-block text-11px font-normal leading-6 text-black transition-all duration-300 ease-in-out cursor-pointer"
                  href={`/contact-us?${FIELDS.ENQUIRY_TYPE}=enquiry_refund_or_cancellation`}
                >
                  Refunds
                </a>
              </li>
              <li className="list-none m-0">
                <a
                  className="hover:underline hover:text-primary inline-block text-11px font-normal leading-6 text-black transition-all duration-300 ease-in-out cursor-pointer"
                  target="_blank"
                  href="/api/feed/rss"
                >
                  RSS Feed
                </a>
              </li>
              <li className="list-none m-0">
                <a
                  className="hover:underline hover:text-primary inline-block text-11px font-normal leading-6 text-black transition-all duration-300 ease-in-out cursor-pointer"
                  href="/sitemaps/v2"
                >
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold mb-4">Work with us</h3>
            <ul className="">
              <li className="list-none m-0">
                <a
                  className="hover:underline hover:text-primary inline-block text-11px font-normal leading-6 text-black transition-all duration-300 ease-in-out cursor-pointer"
                  href={`/contact-us?${FIELDS.ENQUIRY_TYPE}=enquiry_suggest_a_business`}
                >
                  Suggest a Business
                </a>
              </li>

              {isBackpackerDealsChannel() && (
                <li className="list-none m-0">
                  <a
                    className="hover:underline hover:text-primary inline-block text-11px font-normal leading-6 text-black transition-all duration-300 ease-in-out cursor-pointer"
                    href="https://promotions.backpackerdeals.com/affiliate-program-backpacker-deals/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    As an Affiliate Partner
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold mb-4">Contact us</h3>
            <div>
              <span
                className="block p-0 m-0 text-11px font-normal text-left"
                dangerouslySetInnerHTML={{
                  __html: contact_phones
                    .replace(/<p>/g, '<p style="margin-bottom: 8px;">')
                    .replace(/<br \/>/g, '<p/> <p style="margin-bottom: 8px;">'),
                }}
                suppressHydrationWarning
              ></span>
            </div>
            <ul className="">
              <li className="list-none m-0">
                <a
                  className="hover:underline hover:text-primary inline-block text-11px font-normal leading-6 text-black transition-all duration-300 ease-in-out cursor-pointer break-all"
                  href={`mailto:${contact_mail}`}
                >
                  ✉️ {contact_mail}
                </a>
              </li>
              <li className="list-none m-0">
                <a
                  className="hover:underline hover:text-primary inline-block text-11px font-normal leading-6 text-black transition-all duration-300 ease-in-out cursor-pointer"
                  href="/contact-us"
                >
                  Contact form
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="lg:grid-cols-3 md:grid-cols-2 grid grid-cols-1 gap-6 py-6 border-b border-gray-100">
          <div>
            <h3 className="text-xs font-bold mb-4">Social Media</h3>
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
          <div>
            <h3 className="text-xs font-bold mb-4">Accepted Payments</h3>
            <ul className="sm:flex-nowrap flex flex-wrap gap-3">
              {paymentIcons.map((payment) => (
                <li
                  className="list-none m-0"
                  key={payment.alt}
                >
                  <Image
                    loader={({ src }) => src}
                    src={payment.src}
                    alt={payment.alt}
                    width={34}
                    height={24}
                    loading="eager"
                  />
                </li>
              ))}

              {paymentProviders?.includes("afterpay") && (
                <li className="list-none m-0">
                  <Image
                    loader={({ src }) => src}
                    src="/images/footer/icn-afterpay.svg"
                    alt="afterpay"
                    width={51}
                    height={24}
                    loading="eager"
                  />
                </li>
              )}
            </ul>
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-xs font-bold mb-4 md:text-center lg:text-left">Members of</h3>
            <ul className="sm:flex-nowrap flex flex-wrap gap-4 p-0 m-0 md:justify-center lg:justify-start">
              {memberOf.map((member) => (
                <li
                  className="list-none m-0"
                  key={member.alt}
                >
                  <a
                    className="cursor-pointer"
                    href={member.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      loader={({ src }) => src}
                      src={member.src}
                      alt={member.alt}
                      width={member.width}
                      height={member.height}
                      loading="eager"
                    />
                  </a>
                </li>
              ))}
              <li className="list-none m-0">
                <Image
                  loader={({ src }) => src}
                  src="/images/footer/queensland.png"
                  alt="qtic"
                  width={72}
                  height={24}
                  loading="eager"
                />
              </li>
            </ul>
          </div>
        </div>
        {isGap360Channel() && (
          <div className="row copyrights">
            <p
              className="m-0"
              style={{
                fontSize: "12px",
              }}
            >
              The activities, tours and experiences listed on{" "}
              <a
                href="https://gap360.travelloapp.com/"
                target="_blank"
                rel="noreferrer"
              >
                gap360.travelloapp.com
              </a>{" "}
              are operated through third-party companies, booked through Travello. Gap 360 Ltd is not responsible for
              these bookings. Please be aware that all bookings and arrangements purchased are made solely with
              Travello. Gap 360 is only a promoter of these tours, activities and experiences and is not responsible for
              any losses or liability. All queries related to bookings, refunds and cancellations should be directed to
              Travello.
            </p>
          </div>
        )}
        <div className="pt-4 pb-36">
          <p className="text-10px font-normal flex-shrink-0 m-0 w-full max-w-full text-center text-grayT">
            {cookiesContent}{" "}
            <a
              className="text-primary font-normal cursor-pointer"
              href="/privacy-policy"
            >
              Privacy Policy
            </a>
            .
            <br />
            &copy; 2014-{new Date().getFullYear()} Travello Pty Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterDefault;

"use client";

import React, { FC } from "react";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import { FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";
import { getSocialLinks } from "./utils";

const OurContacts: FC = () => {
  const {
    siteConfig: {
      contact_address,
      contact_physical_address,
      contact_phones,
      contact_mail,
      footer_social_links,
      contact_facebook_url,
      contact_company_id,
    },
  } = useServerContext();

  const socials = getSocialLinks(footer_social_links);

  return (
    <div className="shadow-box rounded-xl py-5 px-10 bg-white">
      <h2 className="text-2xl font-bold mb-4 heading">Our contacts</h2>
      <div className="">
        <div className="flex gap-6px items-start mb-4">
          <FaLocationDot className="mt-2px w-5 h-5 text-primary" />
          <div
            className="w-full our_contact "
            dangerouslySetInnerHTML={{ __html: contact_address }}
            suppressHydrationWarning
          />
        </div>

        {contact_physical_address && (
          <div className="flex gap-6px items-start mb-4">
            <FaLocationDot className="mt-2px w-5 h-5 text-primary" />
            <div
              className="w-full our_contact "
              dangerouslySetInnerHTML={{
                __html: contact_physical_address,
              }}
              suppressHydrationWarning
            />
          </div>
        )}
        <div className="flex gap-6px items-start mb-4">
          <FaPhone className="mt-2px w-5 h-5 text-primary" />
          <div
            className="w-full our_contact "
            dangerouslySetInnerHTML={{ __html: contact_phones }}
            suppressHydrationWarning
          />
        </div>
        <div className="flex gap-6px items-start mb-4">
          <FaEnvelope className="mt-2px w-5 h-5 text-primary" />
          <div className="text-base text-grayT font-normal ">
            <a href={`mailto:${contact_mail}`}>{contact_mail}</a>
          </div>
        </div>
        {contact_company_id && (
          <div className="flex gap-6px items-start mb-4">
            <img
              src="/images/icons/abn.png"
              alt="ABN"
              className="w-5 h-5 mt-2px"
            />
            <div className="text-base text-grayT font-normal">{contact_company_id}</div>
          </div>
        )}
        <div className="my-4 border-b border-gray-200" />
        <h2 className="text-sm font-bold mb-2">Social Media</h2>
        <ul className="sm:flex-nowrap flex flex-wrap items-center gap-5 mb-3">
          <div className="sm:flex-nowrap flex flex-wrap items-center gap-5 mb-2">
            {socials.map((social) => (
              <li
                key={social.url}
                className="list-none m-0"
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary text-2xl"
                >
                  {social.icon && <social.icon />}
                </a>
              </li>
            ))}
          </div>
        </ul>
        <div
          dangerouslySetInnerHTML={{
            __html: `
                <iframe
                src="https://www.facebook.com/plugins/page.php?href=${contact_facebook_url}&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="100%"
                height="350px"
                style="border:none; overflow:hidden"
                scrolling="no"
                frameborder="0"
                allowfullscreen="true"
                allow="autoplay;
                clipboard-write;
                encrypted-media;
                picture-in-picture;
                web-share"
                loading="lazy"
                />
            `,
          }}
          suppressHydrationWarning
        />
      </div>
    </div>
  );
};

export default OurContacts;

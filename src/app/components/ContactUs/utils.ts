import { FaFacebookF, FaInstagram, FaSquareXTwitter, FaPinterest, FaTiktok } from "react-icons/fa6";

import { ContactUsFormData, FIELDS } from "./types";

export const getSocialLinks = (socialLinks: string) => {
  const socialMediaIcons = {
    facebook: FaFacebookF,
    twitter: FaSquareXTwitter,
    pinterest: FaPinterest,
    instagram: FaInstagram,
    tiktok: FaTiktok,
  } as const;

  const links = socialLinks.match(/href="(.*?)" aria-label="(.*?)"/g).map((link) => {
    const [, url, label] = link.match(/href="(.*?)" aria-label="(.*?)"/);
    const icon = socialMediaIcons[label.toLowerCase()] || null;
    return { label, url, icon };
  });

  return links;
};

export const getConvertedDate = (date) => {
  return [
    date.getDate().toString().padStart(2, "0"),
    (date.getMonth() + 1).toString().padStart(2, "0"),
    date.getFullYear(),
  ].join("/");
};

export const defaultValues: ContactUsFormData = {
  [FIELDS.EMAIL]: "",
  [FIELDS.FIRST_NAME]: "",
  [FIELDS.LAST_NAME]: "",
  [FIELDS.COUNTRY_CODE]: "+61",
  [FIELDS.CONTACT_NUMBER]: "",
  [FIELDS.ENQUIRY_TYPE]: "",
  [FIELDS.PRODUCT_NAME]: "",
  [FIELDS.DESCRIPTION]: "",
  [FIELDS.TOUR_DATE]: undefined,
  [FIELDS.INVOICE_NUMBER]: "",
  [FIELDS.CANCELLED_BY]: "",
  [FIELDS.REFUND_OPTION]: "",
};

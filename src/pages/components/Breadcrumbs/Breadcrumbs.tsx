import { FC } from "react";
import { Breadcrumbs as BreadcrumbsMaterial, Link } from "@mui/material";

import Head from "next/head";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import { FiChevronRight } from "react-icons/fi";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

interface CustomBreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: "listingPage" | "productPage";
}

const Breadcrumbs: FC<CustomBreadcrumbsProps> = ({ items, variant = "listingPage" }) => {
  const { host } = useServerContext();

  return (
    <>
      <Head>
        {items.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: items.map((i, ind) => ({
                  "@type": "ListItem",
                  position: ind,
                  name: i.label,
                  item: `https://${host}${i.href}`,
                })),
              }),
            }}
          />
        )}
      </Head>

      <BreadcrumbsMaterial
        arial-label="breadcrumb"
        separator={<FiChevronRight className="text-gray-400" />}
      >
        <Link
          href="/"
          className="breadCrumb"
        >
          Home
        </Link>
        {items.map((i) => (
          <Link
            key={i.label}
            href={i.href}
            className="breadCrumb"
          >
            {i.label}
          </Link>
        ))}
      </BreadcrumbsMaterial>
    </>
  );
};

export default Breadcrumbs;

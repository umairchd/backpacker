"use client";

import { FC, PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { useLayoutConfig } from "@@/app/lib/useLayoutConfig";
import { GenericPageProps } from "../../types";
import defaultOgImage from "@@/themes/images/feature-menu-empty.jpg";

const GenericPage: FC<PropsWithChildren<GenericPageProps>> = ({ title, menu, children, host }) => {
  const layoutConfig = useLayoutConfig();
  const showMenu = !layoutConfig.noLayout && menu;
  const pathname = usePathname();

  const showMenuStyle = showMenu ? "col-span-12 md:col-span-8" : "col-span-12";
  const openGraphImage = `https://${host + defaultOgImage.src}`;

  return (
    <>
      <head>
        <link
          rel="preload"
          as="image"
          href={openGraphImage}
        />
        <meta
          property="og:image"
          content={openGraphImage}
        />
        <meta
          property="twitter:image"
          content={openGraphImage}
        />
      </head>

      <section className="py-6">
        <div className="max-w-1320px px-3 sm:px-6 mx-auto">
          <h1 className="text-3xl font-bold text-center p-6 mb-4">{title}</h1>
          <div className="grid grid-cols-12 gap-6">
            {showMenu ? (
              <div className="col-span-12 md:col-span-4">
                <div className="rounded-md bg-aboutT overflow-hidden">
                  {menu.map((m) => (
                    <a
                      key={m.id}
                      {...{
                        href: m.uri.url,
                        target: m.uri.__typename === "BPD_ExternalUri" ? "_blank" : undefined,
                      }}
                      className={`block text-base font-light text-white hover:bg-lightBlue px-15px py-10px ${
                        pathname.includes(m.uri.url) && "bg-lightBlue"
                      }`}
                    >
                      {m.name}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}

            <div className={showMenuStyle}>
              <div className="genericPage">{children}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GenericPage;

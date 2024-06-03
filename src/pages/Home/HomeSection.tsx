import React, { PropsWithChildren } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const HomeSection: React.FC<
  PropsWithChildren<{
    sectionHeader: string;
    className?: string;
    seeMoreNode?: React.ReactNode;
    seeMoreHref?: string;
    isDesktop?: boolean;
    isMillionDollarPage?: boolean;
  }>
> = function HomeSection({
  sectionHeader,
  className,
  seeMoreHref,
  seeMoreNode,
  children,
  isDesktop,
  isMillionDollarPage = false,
}) {
  return (
    <section className={`py-6 ${className}`}>
      <div className="max-w-1320px px-3 sm:px-6 mx-auto">
        {isDesktop ? (
          <h2 className="text-xl leading-30px pb-2 md:text-3xl md:leading-10 lg:text-4xl font-bold text-center lg:leading-46px md:pt-4 md:pb-6">
            {sectionHeader}
          </h2>
        ) : (
          sectionHeader && (
            <h2 className="text-xl leading-30px pb-2 md:text-3xl md:leading-10 lg:text-4xl font-bold text-center lg:leading-46px md:pt-4 md:pb-6">
              {sectionHeader}
            </h2>
          )
        )}
        {children}
        {seeMoreHref || seeMoreNode ? (
          <div className="mb-4 pt-5">
            {seeMoreNode ? (
              seeMoreNode
            ) : (
              <a
                href={seeMoreHref}
                className="flex items-center gap-1 py-2 px-6 w-fit mx-auto border-2 border-gray-300 outline-none text-lg font-semibold text-search rounded-3xl hover:bg-grayT hover:text-white"
                {...(isMillionDollarPage
                  ? {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : null)}
              >
                See more
                <MdKeyboardArrowRight className="w-6 h-6 shrink-0" />
              </a>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default HomeSection;

import { useQuickSearchBreakpoints } from "@@/features/utils";
import { quickSearchLinks } from "@@/pages/Home/Searchbar/quickSearchLinks";
import clsx from "clsx";
import Link from "next/link";

export const QuickSearch = () => {
  const { qsSecondAndThirdMiddleRow, quickSearchThirdRowOnMobile } = useQuickSearchBreakpoints();
  const isMobileView = qsSecondAndThirdMiddleRow || quickSearchThirdRowOnMobile;

  return (
    <div className="mb-3">
      <h2
        className={clsx(
          "text-base mb-3 font-semibold",
          isMobileView && "text-white mt-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]",
          !isMobileView && "drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,0.8)]",
        )}
      >
        Popular searches
      </h2>
      <div className="flex flex-wrap md:justify-start md:gap-4 lg:flex items-center gap-2 pt-1">
        {quickSearchLinks.map((quickSearchLink) => (
          <Link
            id={quickSearchLink.trackingId}
            key={quickSearchLink.name}
            href={quickSearchLink.linkHref}
            className="bg-white hover:bg-primary text-black hover:text-white rounded-full border border-neutral-300 hover:border-white py-1 px-3"
          >
            {quickSearchLink.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

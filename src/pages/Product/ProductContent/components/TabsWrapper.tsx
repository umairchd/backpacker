import { FC } from "react";
import { Tab } from "@headlessui/react";
import classNames from "classnames";

type navItems = {
  label: string;
  href: string;
};

interface TabsWrapperProps {
  tabsItem: {
    navItems: navItems[];
    isBanner: boolean;
  };
}

const TabsWrapper: FC<TabsWrapperProps> = (props) => {
  const { tabsItem: ti } = props;

  const wrapperBannerStyle = `hidden 1140.98px:block fixed inset-x-0 z-30 mb-5 bg-white
  ${ti.isBanner ? "top-7.2rem hidden 1148.98px:fixed 1148.98px:top-[10.35rem]" : "top-4.7rem 1148.98px:top-[7.6rem]"}`;

  return (
    <div className={wrapperBannerStyle}>
      <div className="pt-6px mx-auto w-full max-w-1272px">
        <Tab.Group defaultIndex={0}>
          <Tab.List className="flex flex-wrap list-none">
            {ti.navItems.map((i, ind) => (
              <Tab
                as="a"
                href={`#${i.href}`}
                key={`${i.label}-${ind}`}
                id={i.label.replace(/\s+/g, "") + "TabClick"}
                className={({ selected }) =>
                  classNames(
                    "block p-4 text-sm font-normal  leading-5 text-center no-underline border-b-4 whitespace-nowrap cursor-pointer",
                    "outline-none normal-case bg-transparent bg-none rounded-none hover:text-primary",
                    selected ? "border-primary border-solid" : "border-white",
                  )
                }
              >
                {i.label}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
      </div>
    </div>
  );
};

export default TabsWrapper;

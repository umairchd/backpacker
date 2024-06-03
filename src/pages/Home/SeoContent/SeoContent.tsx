import React, { FC } from "react";
import tabs from "./utils";
import { Item, TabItem } from "./types";
import { useYHAWhiteLabel } from "../hooks";
import { Tab } from "@headlessui/react";

const SeoContent: FC = () => {
  const isYhaChannel = useYHAWhiteLabel();

  return (
    <div className="flex flex-col w-full h-265px">
      <Tab.Group defaultIndex={tabs.findIndex((tab) => tab.id === tabs[0].id)}>
        <div className="flex flex-nowrap gap-y-4 gap-x-12 border-b border-tabBorder">
          <Tab.List>
            {tabs.map((tab: TabItem) => {
              if (tab.hrefs.length === 0) {
                return null;
              }

              if (isYhaChannel) {
                tab.hrefs = tab.hrefs.filter((i: Item) => i.id !== 2);
              }
              return (
                <Tab
                  key={tab.id}
                  as="div"
                  className="focus:outline-none"
                >
                  {({ selected }) => (
                    <h2
                      className={`text-base font-semibold capitalize border-b-3px leading-38px py-2 -mb-1px ${
                        selected ? "border-primary" : "border-transparent"
                      }`}
                    >
                      {tab.title}
                    </h2>
                  )}
                </Tab>
              );
            })}
          </Tab.List>
        </div>
        {tabs.map((tab) => (
          <Tab.Panel key={tab.id}>
            <div className="overflow-auto hide-scrollbar">
              <div className="py-4 flex flex-wrap flex-col h-265px w-max gap-y-4 gap-x-8p md:gap-x-15p lg:gap-x-8p xl:gap-x-24p">
                {tab.hrefs.map((i) => (
                  <a
                    key={i.id}
                    href={i.href}
                    className="py-2 w-auto text-black text-sm capitalize cursor-pointer hover:underline hover:text-primary"
                  >
                    {i.title}
                  </a>
                ))}
              </div>
            </div>
          </Tab.Panel>
        ))}
      </Tab.Group>
    </div>
  );
};

export default SeoContent;

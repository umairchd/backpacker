import type { Channel } from "@@/app/data/getChannelByHost";
import { StaticPageFragment } from "../sites/[site]/[theme]/static/[...slug]/queries.generated";

export interface NavProps {
  isObscured: boolean;
  channel: Channel;
  mainContainerClass?: string;
}

export type WhyUsPageProps = Pick<StaticPageFragment, "title">;
export interface HtmlPageProps {
  content: string;
}
export type GenericPageProps = Pick<StaticPageFragment, "title" | "menu"> & { host: string };
export type multiDayMenu = {
  title: string;
  link: string;
  id: string;
};

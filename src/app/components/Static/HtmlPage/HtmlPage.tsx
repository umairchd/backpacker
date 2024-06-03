import { FC } from "react";
import clsx from "clsx";
import parse from "html-react-parser";
import classes from "./HtmlPage.module.scss";
import { HtmlPageProps } from "../../types";

const HtmlPage: FC<HtmlPageProps> = ({ content }) => {
  return (
    <div
      className={clsx(
        classes.htmlPageContent,
        "container px-3 sm:px-6 mx-auto pt-0 pb-4 bg-white"
      )}
    >
      <div className="">
        <div className="px-3">{parse(content)}</div>
      </div>
    </div>
  );
};

export default HtmlPage;

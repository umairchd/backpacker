import { FC, Fragment } from "react";
import { useSelector } from "react-redux";
import { getSearchText } from "../model";

import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

const ItemLink: FC<
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > & { text: string; highlightClassName?: string }
> = ({ href, text, highlightClassName = "highlight", ...otherProps }) => {
  const searchText = useSelector(getSearchText);
  // autosuggest highlight only highlights start of a word
  const matches = match(text, searchText);
  const parts = parse(text, matches);

  return (
    <a
      {...otherProps}
      href={href}
      className="hover:bg-primary hover:text-white inline-block w-full px-5 py-2 font-light border-b border-gray-200"
    >
      {parts.map((part: any) => (
        <Fragment key={part.text}>{part.text}</Fragment>
      ))}
    </a>
  );
};

export default ItemLink;

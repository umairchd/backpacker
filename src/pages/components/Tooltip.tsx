import classNames from "classnames";
import { FC, HTMLProps, ReactNode } from "react";

type TooltipProps = {
  position: "top" | "bottom" | "left" | "right";
  content: ReactNode | string;
};

const Tooltip: FC<HTMLProps<HTMLDivElement> & TooltipProps> = ({
  position,
  content,
  children,
  className = "inline-block",
}) => (
  <div
    id="tooltip"
    className="group relative z-20 cursor-pointer"
  >
    <div className={className}>{children}</div>
    <span
      className={classNames(
        "absolute hidden group-hover:inline-block bg-neutral-900 text-white text-xs p-2 whitespace-nowrap rounded z-50",
        position === "top" ? "left-1/2 -translate-x-1/2 bottom-toolTip" : "",
        position === "bottom" ? "left-1/2 -translate-x-1/2 top-toolTip" : "",
        position === "left" ? "top-1/2 -translate-y-1/2 right-toolTip" : "",
        position === "right" ? "top-1/2 -translate-y-1/2 left-toolTip" : "",
      )}
    >
      {content}
    </span>
    <span
      className={classNames(
        "absolute hidden group-hover:inline-block border-6px",
        position === "top"
          ? "left-1/2 -translate-x-1/2 bottom-full border-l-transparent border-r-transparent border-b-0 border-t-neutral-900"
          : "",
        position === "bottom"
          ? "left-1/2 -translate-x-1/2 top-full border-l-transparent border-r-transparent border-t-0 border-b-neutral-900"
          : "",
        position === "left"
          ? "top-1/2 -translate-y-1/2 right-full border-t-transparent border-b-transparent border-r-0 border-l-neutral-900"
          : "",
        position === "right"
          ? "top-1/2 -translate-y-1/2 left-full border-t-transparent border-b-transparent border-l-0 border-r-neutral-900"
          : "",
      )}
    ></span>
  </div>
);

export default Tooltip;

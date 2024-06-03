import { FC, PropsWithChildren } from "react";

const CoverCard: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <div className={`${className} `}>
    <div className="h-full w-full absolute inset-0 transition-all duration-500 ease-in rounded-lg z-1 bg-black/40" />
    {children}
  </div>
);

export default CoverCard;

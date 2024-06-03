import { FC, PropsWithChildren } from "react";

const GradientCard: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <div className={`${className}`}>
    <div className="bg-country_card h-full w-full absolute left-0 bottom-0 rounded-lg z-1 transition-all duration-500 ease-in" />
    {children}
  </div>
);

export default GradientCard;

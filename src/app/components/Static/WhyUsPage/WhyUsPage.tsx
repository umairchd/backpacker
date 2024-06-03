import { FC, PropsWithChildren } from "react";
import { WhyUsPageProps } from "../../types";
import classes from "./WhyUsPage.module.scss";
import clsx from "clsx";

const WhyUsPage: FC<PropsWithChildren<WhyUsPageProps>> = ({ title, children }) => {
  return (
    <section className={clsx("py-6", classes["template-root-why-us"])}>
      <div className="max-w-1320px py-6 px-3 sm:px-6 mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-black text-center">{title}</h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
};

export default WhyUsPage;

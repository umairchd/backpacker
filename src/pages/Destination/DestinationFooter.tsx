import React, { FC } from "react";
import { DestinationFooterProps } from "./types";

const DestinationFooter: FC<DestinationFooterProps> = ({ header, teaser }) => (
  <section>
    {header && <h2 className="mb-3 text-2xl font-medium">{header}</h2>}
    {!!teaser && (
      <div
        className="custom_editor list_style"
        dangerouslySetInnerHTML={{ __html: teaser }}
      />
    )}
  </section>
);

export default DestinationFooter;

import React, { PropsWithChildren } from "react";
import CustomGlider from "@@/pages/components/CustomGlider/CustomGlider";
import { nanoid } from "nanoid";

function ImageSlider({ children }: PropsWithChildren) {
  return (
    <CustomGlider variant="banner" autoPlay autoPlaySpeed={5000}>
      {React.Children.map(children, (child) => (
        <div key={nanoid()}>{child}</div>
      ))}
    </CustomGlider>
  );
}

export default ImageSlider;

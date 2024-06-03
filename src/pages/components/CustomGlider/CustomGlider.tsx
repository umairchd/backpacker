"use client";

import React, { PropsWithChildren } from "react";
import Slider from "react-slick";

import { GliderProps } from "@@/pages/lib/useGlider";
import {
  banner,
  brisbane,
  deal,
  gallery,
  travelStory,
  ourCustomers,
  searchBarSlider,
} from "@@/pages/utils/slickSlider";

interface CustomGliderProps extends GliderProps {
  variant?: "deal" | "banner" | "travel-story" | "gallery" | "brisbane" | "our-customers" | "search-bar";
}

const CustomGlider: React.FC<PropsWithChildren<CustomGliderProps>> = function CustomGlider({
  variant = "deal",
  children,
}) {
  let settings;
  switch (variant) {
    case "deal":
      settings = deal;
      break;
    case "travel-story":
      settings = travelStory;
      break;
    case "banner":
      settings = banner;
      break;
    case "brisbane":
      settings = brisbane;
      break;
    case "our-customers":
      settings = ourCustomers;
      break;
    case "search-bar":
      settings = searchBarSlider;
      break;
    default:
      settings = gallery;
      break;
  }

  return <Slider {...settings}>{children}</Slider>;
};

export default CustomGlider;

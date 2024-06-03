import BlogCard from "@@/app/components/Region/BlogCard";
import CategoryCard from "@@/app/components/Region/CategoryCard";
import GalleryImage from "@@/app/components/Region/GalleryImage";
import GallerySlider from "@@/app/components/Region/GallerySlider";
import GallerySliderImage from "@@/app/components/Region/GallerySliderImage";
import ImageSlider from "@@/app/components/Region/ImageSlider";
import ImageSliderImage from "@@/app/components/Region/ImageSliderImage";
import PlaceImage from "@@/app/components/Region/PlaceImage";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import dynamic from "next/dynamic";

const ProductsFromIdsSlider = dynamic(
  () => import("@@/app/components/Region/ProductsFromIdsSlider"),
  { ssr: false }
);

const components: MDXRemoteProps["components"] = {
  CategoryCard,
  GallerySlider,
  GalleryImage,
  GallerySliderImage,
  ImageSlider,
  ImageSliderImage,
  PlaceImage,
  ProductsSlider: ProductsFromIdsSlider as any,
  TravelStoryCard: BlogCard,
};

export default components;

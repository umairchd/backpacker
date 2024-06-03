"use client";
import dynamic from "next/dynamic";

const ReactMasonry = dynamic(() => import("react-masonry-css"));

export default function Masonry({ children }: { children: React.ReactNode }) {
  const breakpointColumnsObj = {
    default: 3,
    992: 2,
    500: 1,
  };

  return (
    <ReactMasonry
      breakpointCols={breakpointColumnsObj}
      className="flex -ml-30px w-auto mt-8"
      columnClassName="w-1/3 pl-30px"
    >
      {children}
    </ReactMasonry>
  );
}

import React, { FC } from "react";

type SkeletonProps = {
  height?: number | string;
  width?: number | string;
  style?: React.CSSProperties;
  className?: string;
};

const Skeleton: FC<SkeletonProps> = ({ height = 20, width, style = {}, className }) => {
  const skeletonStyle = {
    height: height || "100%",
    width: width || "100%",
    ...style,
  };

  return (
    <div className="animate-pulse flex flex-col space-y-6 w-fit">
      <div className="py-2">
        <div
          className={`bg-gray-300 rounded ${className} w-full`}
          style={skeletonStyle}
        />
      </div>
    </div>
  );
};

export default Skeleton;

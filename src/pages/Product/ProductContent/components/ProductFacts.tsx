import { FC, HTMLProps } from "react";
import { ProductFactsProps } from "../types";
import { IconButton, Tooltip } from "@mui/material";
import { FaInfoCircle } from "react-icons/fa";

const ProductFacts: FC<HTMLProps<HTMLDivElement> & ProductFactsProps> = ({ icons, className }) => {
  return (
    <div className={`relative flex-col min-w-0 rounded-lg ${className}`}>
      <div
        className="flex-auto p-0 leading-6  bg-white md:px-0 md:bg-transparent rounded-lg
          "
      >
        <div className="flex gap-3 mb-0 leading-6 px-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          {icons.map((i: any, ind: any) => (
            <div
              key={`${i.name}-${ind}`}
              className="flex relative flex-col flex-1 items-center py-2 px-4 md:px-0 my-1 mx-0 leading-6 bg-white rounded-lg bg-opacity-0 no-underline min-w-100px [box-shadow:rgba(0,_0,_0,_0.125)_0px_2px_6.4px_1px] md:shadow-none"
            >
              <img
                src={i.src}
                alt={i.name}
                className="w-7 h-7 max-w-full mb-3 align-middle"
                loading="lazy"
              />
              <span className="text-xs font-bold normal text-center">{i.name}</span>
              <span className="inline-block text-sm font-normal leading-5 text-center">
                {i.value}
                {i.hints && (
                  <Tooltip
                    title={i.hints}
                    content={i.hints}
                  >
                    <IconButton>
                      <FaInfoCircle className="w-3 h-3 text-gray-500" />
                    </IconButton>
                  </Tooltip>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFacts;

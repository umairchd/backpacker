import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export const deal = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: false,
  appendDots: (dots: any) => (
    <div
      style={{ position: "relative", bottom: "0" }}
      id="custom-slider"
    >
      <ul className="custom-slider flex items-center justify-center gap-1 mt-2 mb-8">{dots}</ul>
    </div>
  ),
  customPaging: (i: any) => (
    <span className="pagination hover:bg-primary hover:text-white flex items-center justify-center w-10 h-10 text-base font-medium rounded-md cursor-pointer">
      {i + 1}
    </span>
  ),
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: false,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
      },
    },
  ],
};

export const travelStory = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: false,
  appendDots: (dots: any) => (
    <div
      className=""
      style={{ position: "relative", bottom: "0" }}
      id="custom-slider"
    >
      <ul className="mt-2 mb-8 flex items-center justify-center gap-2 Custom-slider">{dots}</ul>
    </div>
  ),
  customPaging: (i: any) => (
    <span className="pagination text-base font-medium w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white rounded-md">
      {i + 1}
    </span>
  ),
  slidesPerRow: 2,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        slidesPerRow: 3,
        dots: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        slidesPerRow: 1,
        dots: false,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        slidesPerRow: 1,
        dots: false,
      },
    },
  ],
};

export const banner = {
  dots: false,
  infinite: false,
  autoplay: true,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

export const gallery = {
  dots: false,
  infinite: false,
  autoplay: true,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: (
    <SampleNextArrow
      size={18}
      child="sm:!w-38px !w-8 shadow-box lg:!bg-white sm:!h-38px !h-8 !top-1/2 lg:!-translate-y-1/2 !-translate-y-1/2 lg:!-right-10px !right-0"
    />
  ),
  prevArrow: (
    <SamplePrevArrow
      size={18}
      child="sm:!w-38px !w-8 shadow-box lg:!bg-white sm:!h-38px !h-8 !top-1/2 lg:!-translate-y-1/2 !-translate-y-1/2 lg:!-left-10px !left-0"
    />
  ),
};

export const brisbane = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  arrows: false,
  dotsClass: "flex items-center justify-center gap-1 absolute right-0 lg:-top-14 -top-5 brisbane-slider",
  appendDots: (dots) => <ul>{dots}</ul>,
  customPaging: () => <div className="shrink-0 cursor-pointer h-10px rounded-full bg-gray-200 overflow-hidden" />,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const ourCustomers = {
  dots: false,
  variableWidth: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: (
    <SampleNextArrow
      size={18}
      child="sm:!w-38px !w-8 shadow-box lg:!bg-white sm:!h-38px !h-8 !top-1/2 lg:!-translate-y-1/2 !-translate-y-1/2 lg:!-right-10px !right-0"
    />
  ),
  prevArrow: (
    <SamplePrevArrow
      size={18}
      child="sm:!w-38px !w-8 shadow-box lg:!bg-white sm:!h-38px !h-8 !top-1/2 lg:!-translate-y-1/2 !-translate-y-1/2 lg:!-left-10px !left-0"
    />
  ),
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const searchBarSlider = {
  dots: true,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: false,
  dotsClass: "flex items-center justify-start gap-1 brisbane-slider",
  appendDots: (dots) => <ul>{dots}</ul>,
  customPaging: () => <div className="shrink-0 cursor-pointer h-10px rounded-full bg-gray-200 overflow-hidden" />,
};

export function SampleNextArrow(props) {
  const { className, child, onClick, size } = props;
  return (
    <div
      className={`${className}  shadow-arrow cursor-pointer hover:opacity-80  !bg-white rounded-full !flex !items-center !justify-center before:bg-transparent ${child}`}
      onClick={onClick}
    >
      <FiChevronsRight
        className="text-arrow"
        size={size || 26}
      />
    </div>
  );
}
export function SamplePrevArrow(props) {
  const { child, className, onClick, size } = props;
  return (
    <div
      className={`${className} ${child} shadow-arrow z-10 cursor-pointer hover:opacity-80 !bg-white rounded-full !flex !items-center !justify-center before:bg-transparent`}
      onClick={onClick}
    >
      <FiChevronsLeft
        className="text-arrow"
        size={size || 26}
      />
    </div>
  );
}

export const detailSlider = {
  dots: false,
  infinite: false,
  autoplay: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: (
    <NextArrow
      size={28}
      child="sm:!w-38px !w-8 lg:!bg-white sm:!h-38px !h-8 !top-1/2 lg:!-translate-y-1/2 !-translate-y-1/2 lg:!-right-10px !right-0"
    />
  ),
  prevArrow: (
    <PrevArrow
      size={28}
      child="sm:!w-38px !w-8 lg:!bg-white sm:!h-38px !h-8 !top-1/2 lg:!-translate-y-1/2 !-translate-y-1/2 lg:!-left-10px !left-0"
    />
  ),
};

export function NextArrow(props) {
  const { className, child, onClick, size } = props;
  return (
    <div
      className={`${className} cursor-pointer !flex !items-center !justify-center before:bg-transparent ${child}`}
      onClick={onClick}
    >
      <IoIosArrowForward
        className="text-white"
        size={size || 26}
      />
    </div>
  );
}

export function PrevArrow(props) {
  const { child, className, onClick, size } = props;
  return (
    <div
      className={`${className} ${child} z-10 cursor-pointer !flex !items-center !justify-center before:bg-transparent`}
      onClick={onClick}
    >
      <IoIosArrowBack
        className="text-white"
        size={size || 26}
      />
    </div>
  );
}

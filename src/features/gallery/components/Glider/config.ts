import type Glider from "glider-js";

const BASE_CONFIG: Glider.Options = {
  skipTrack: true,
  slidesToShow: "auto",
  slidesToScroll: "auto",
  draggable: true,
  itemWidth: 300,
  exactWidth: true,
  scrollLock: true,
};

const config: { [key: string]: Glider.Options } = {
  banner: {
    skipTrack: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    scrollLock: true,
  },
  "banner-custom": {
    skipTrack: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    scrollLock: true,
    exactWidth: false,
  },
  deal: {
    ...BASE_CONFIG,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 2,
          exactWidth: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          scrollLockDelay: 120,
          exactWidth: false,
        },
      },
    ],
  },
  "travel-story": {
    ...BASE_CONFIG,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          scrollLock: true,
          itemWidth: undefined,
          exactWidth: false,
        },
      },
    ],
  },
  gallery: {
    rewind: true,
    skipTrack: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    exactWidth: false,
    scrollLock: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          exactWidth: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          scrollLockDelay: 120,
          exactWidth: false,
        },
      },
    ],
  },
};

export default config;

import type { HomePageQuery } from "../queries.generated";
import { useBreakpoints } from "@@/features/utils";

interface TagLinesProps {
  image: string;
  label: string;
}

interface WhyBookWithUsProps {
  channel: HomePageQuery["channel"];
  isFlightCentre: boolean;
}

const TagLines: React.FC<TagLinesProps> = ({ image, label }) => {
  return (
    <div className="w-115px md:w-130px shrink-0">
      <div className="">
        <div className="text-sm text-center mx-auto mb-2 w-20 md:w-auto">
          <span className="w-60px h-60px min-w-60px rounded-full flex items-center justify-center mx-auto mb-2 bg-primary-transparent">
            <span
              style={{
                WebkitMaskImage: `url(${image})`,
                maskImage: `url(${image})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center center",
                maskPosition: "center center",
              }}
              className="w-8 h-8 bg-primary-darker"
            >
              <img
                src={image}
                alt={label}
                width={32}
                height={32}
                className="invisible"
              />
            </span>
          </span>
          {label}
        </div>
      </div>
    </div>
  );
};

const WhyBookWithUs: React.FC<WhyBookWithUsProps> = function WhyBookWithUs({
  channel: { siteConfig },
  isFlightCentre,
}) {
  const { lgUp: isDesktop } = useBreakpoints();

  const { promo_title_1, promo_title_2, promo_title_3, promo_title_4, promo_title_5 } = siteConfig;

  const tagLines = [
    {
      image: "/imagesv3/why-icon-1-blue.svg",
      label: promo_title_1,
    },
    {
      image: "/imagesv3/why-icon-2-blue.svg",
      label: promo_title_2,
    },
    {
      image: "/imagesv3/why-icon-3-blue.svg",
      label: promo_title_3,
    },
    {
      image: "/imagesv3/why-icon-4-blue.svg",
      label: promo_title_4,
    },
    {
      image: "/imagesv3/why-icon-5-blue.svg",
      label: promo_title_5,
    },
  ];

  if (isFlightCentre) {
    return null;
  }

  return isDesktop ? (
    <ul className="flex flex-nowrap gap-6 overflow-x-auto sm:justify-center hide-scrollbar mt-4 lg:pb-6">
      {tagLines.map((t) => {
        return (
          <TagLines
            key={t.image}
            image={t.image}
            label={t.label}
          />
        );
      })}
    </ul>
  ) : (
    <div className=" ">
      <div className="flex flex-nowrap gap-6 overflow-x-auto sm:justify-center hide-scrollbar mt-4 lg:pb-6">
        {tagLines.map((t) => {
          return (
            <TagLines
              key={t.image}
              image={t.image}
              label={t.label}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WhyBookWithUs;

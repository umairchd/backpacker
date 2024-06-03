import { FC } from "react";
import GradientCard from "../GradientCard/GradientCard";
import { CountryCardFragment, CountryCardV2Fragment } from "@@/pages/components/queries/queries.generated";
import Image from "next/image";

const CountryCard: FC<Pick<CountryCardFragment, "uri" | "name" | "image" | "productCount">> = ({
  uri: { url },
  image,
  name,
  productCount,
}) => (
  <li className="list-none m-0">
    <a
      href={url}
      className="block"
    >
      <GradientCard className="h-100px font-sm px-2 py-2 pb-1 grid content-end rounded-lg bg-primary/10 relative text-white overflow-hidden origin-center transition-all duration-300 ease-in bg-no-repeat bg-cover hover:shadow-label group">
        <picture className="absolute inset-0 z-0">
          <Image
            loader={({ src }) => src}
            src={image?.megaMenuCard ?? "/imagesv3/mega-menu-empty-bg.jpg"}
            alt={name}
            width={190}
            height={100}
            className="object-cover w-full h-full"
            priority
          />
        </picture>
        <div className="text-center z-2 group-hover:mb-2 transition-all duration-300 group-hover:text-primary ease-in-out">
          <span className=" sm:text-sm sm:font-normal text-xs font-light">{name}</span>
          {productCount > 0 && (
            <p className="text-white/70 sm:text-xs text-10px font-light">{productCount} Activities</p>
          )}
        </div>
      </GradientCard>
    </a>
  </li>
);

export const CountryMegaMenuCardV2: FC<CountryCardV2Fragment> = ({ country: { uri, image, name }, productCount }) => (
  <CountryCard {...{ uri, image, name, productCount }} />
);

export default CountryCard;

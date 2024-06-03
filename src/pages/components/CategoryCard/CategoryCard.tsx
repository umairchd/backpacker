import {
  CategoryCardFragment,
  CountryCardFragment,
  CategoryCardV2Fragment,
} from "@@/pages/components/queries/queries.generated";
import GradientCard from "../GradientCard/GradientCard";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CategoryCard: React.FC<Pick<CategoryCardFragment | CountryCardFragment, "uri" | "image" | "name">> = ({
  uri,
  image,
  name,
}) => (
  <a
    href={uri.url}
    className="block"
  >
    <GradientCard className="h-280px font-2xl grid content-end rounded-lg bg-primary/10 relative text-white overflow-hidden origin-center transition-all duration-200 ease-in bg-no-repeat bg-cover hover:shadow-label group uppercase p-6">
      <picture className="absolute inset-0">
        <LazyLoadImage
          src={image?.top768}
          alt={name}
          width="100%"
          height="100%"
          className="w-full h-full object-cover"
          effect="opacity"
        />
      </picture>
      <div className="text-center z-2 group-hover:mb-3 transition-all duration-400 ease-linear">
        <h3 className="text-2xl font-semibold text-left">{name}</h3>
      </div>
    </GradientCard>
  </a>
);

export const CategoryCardV2: React.FC<CategoryCardV2Fragment> = ({ category: { uri, image, name } }) => (
  <CategoryCard {...{ uri, image, name }} />
);

export default CategoryCard;

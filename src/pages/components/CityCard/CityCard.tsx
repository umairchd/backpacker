import { FC } from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import { CityCardV2Fragment } from "@@/pages/components/queries/queries.generated";

export type SimpleCityCardProps = Pick<CityCardV2Fragment["city"], "uri" | "name" | "uniqueName" | "image">;

const CityCardV2: FC<CityCardV2Fragment> = ({ city: { uri, image, name } }) => (
  <CategoryCard {...{ uri, image, name }} />
);

export default CityCardV2;

import { nanoid } from "nanoid";
import CategoryCard from "../components/CategoryCard/CategoryCard";
import HomeSection from "./HomeSection";
import { CategoryCardFragment } from "../components/queries/queries.generated";

const CategoriesGrid: React.FC<{
  categories: Omit<CategoryCardFragment, "__typename">[];
  sectionHeader: string;
  className?: string;
}> = function CategoriesGrid({ categories, sectionHeader, className }) {
  return (
    <HomeSection
      {...{
        sectionHeader,
        className: `${className} grid-layout py-4`,
        seeMoreHref: "/search",
      }}
    >
      <ul className="grid grid-cols-4 gap-6 mb-8">
        {categories.map((c) => {
          return (
            <li className="list-none m-0" key={nanoid()}>
              <CategoryCard {...c} />
            </li>
          );
        })}
      </ul>
    </HomeSection>
  );
};

export default CategoriesGrid;

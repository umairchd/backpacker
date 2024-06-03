import { FC, useState, useEffect, startTransition } from "react";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";

import FilterFormContent from "./FilterFormContent";
import SelectSingle from "./SelectSingle";
import { defaultFormValues, FIELDS, FilterFormProps, SelectOption, sortByOptions } from "../model/types";
import { getConvertedFieldValues, updateQueryParams } from "../utils";
import Skeleton from "@@/pages/components/Skeleton";
import { MAX_CATEGORY_SHOW } from "@@/pages/Destination/types";

const SkeletonMobile = () => (
  <div className="block md:hidden -my-2">
    <Skeleton
      width={85}
      height={40}
    />
  </div>
);

const SkeletonDesktop = () => (
  <div className="hidden md:block">
    <Skeleton
      width={160}
      height={50}
    />
  </div>
);

const FilterForm: FC<FilterFormProps> = ({
  cityUniqueName,
  categoryUniqueName,
  categories,
  destinations,
  productCount,
  displaySkeletonCards,
  hideFilterForm,
}) => {
  const { getValues, setValue } = useFormContext();
  const values = getValues();
  const { query, asPath: pathname } = useRouter();
  const valueCategories = values[FIELDS.CATEGORIES];
  const [categoryActive, setCategoryActive] = useState<string>("all");
  const [isTopLevel, setIsTopLevel] = useState<boolean>(false);

  useEffect(() => {
    const valuesFromQuery = {};

    if (!query[FIELDS.DESTINATION]) {
      const newValue = cityUniqueName ? [cityUniqueName] : destinations.map((o) => o.uniqueName);

      handleOnChange(FIELDS.DESTINATION, newValue, true);
    }

    if (!query[FIELDS.CATEGORIES]) {
      const newValue = categoryUniqueName ? [categoryUniqueName] : categories.map((o) => o.uniqueName);

      const activeCategory = Array.isArray(newValue) && newValue.length === 1 ? newValue[0] : "all";

      setCategoryActive(activeCategory);
      handleOnChange(FIELDS.CATEGORIES, newValue, true);
    }

    Object.keys(query)
      .filter((k) => Object.values(FIELDS).some((fieldName) => fieldName === k))
      .forEach((k) => {
        const converted = getConvertedFieldValues(k, query[k]);

        if (converted) {
          valuesFromQuery[k] = converted[0];
        }
      });

    Object.keys(valuesFromQuery).forEach((k) => {
      setValue(k, valuesFromQuery[k]);
      setCategoryActive(valuesFromQuery[k][0]);
    });
  }, []);

  const handleOnChange = (field: string, value: string | any[] | SelectOption, preventQueryStringUpdate = false) => {
    const convertedValues = getConvertedFieldValues(field, value);

    if (convertedValues) {
      setValue(field, convertedValues[0]);
      setValue(FIELDS.PAGE, 1);

      if (preventQueryStringUpdate) {
        return;
      }

      if (
        (field === FIELDS.DESTINATION && value.length === destinations.length) ||
        (field === FIELDS.CATEGORIES && value.length === categories.length)
      ) {
        updateQueryParams(field, []);
      } else {
        updateQueryParams(field, convertedValues[1]);
      }
    }
  };

  useEffect(() => {
    const pathArray = pathname.split("/");
    if (pathArray.length === 2) {
      setIsTopLevel(true);
    } else {
      setIsTopLevel(false);
    }
  }, [pathname]);

  if (hideFilterForm) {
    return null;
  }

  const skeletonLoading = Array.from({ length: MAX_CATEGORY_SHOW }, (_, i) => i + 1);

  const diver = "flex items-center justify-between border-t border-diver mt-8 pt-4";

  return (
    <div className="sm:px-6 container px-3 mx-auto">
      {displaySkeletonCards ? (
        <>
          <div className="flex flex-wrap items-center gap-2">
            {skeletonLoading.map((i) => (
              <div key={i}>
                <SkeletonDesktop />
                <SkeletonMobile />
              </div>
            ))}
          </div>
          <div className={diver} />
        </>
      ) : (
        <>
          {isTopLevel ? null : (
            <FilterFormContent
              valueCategories={valueCategories}
              categoryOptions={categories}
              categoryActive={categoryActive}
            />
          )}

          <div className={diver}>
            <p className="text-black text-base font-light flex items-center gap-2">
              Showing <span className="font-semibold">{productCount} products</span>
            </p>
            <SelectSingle
              label="Sort by"
              id="sort-by-select"
              testId="sort-by-select"
              value={values[FIELDS.ORDER]}
              defaultValue={defaultFormValues[FIELDS.ORDER]}
              options={sortByOptions}
              onChange={(value) => startTransition(() => handleOnChange(FIELDS.ORDER, value))}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default FilterForm;

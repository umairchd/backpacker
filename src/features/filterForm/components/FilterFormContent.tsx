import React, { FC, memo, useEffect, useMemo, useState } from "react";
import { FilterFormContentProps } from "../model/types";
import { useRouter } from "next/router";

import { useBreakpoints } from "@@/features/utils";
import { MAX_CATEGORY_SHOW, MAX_CATEGORY_SHOW_MOBILE } from "@@/pages/Destination/types";

const FilterFormContent: FC<FilterFormContentProps> = memo(({ categoryOptions, categoryActive }) => {
  const router = useRouter();

  const currentPath = useMemo(() => {
    const baseUrl = router.asPath;
    const lengthBaseUrl = baseUrl?.split("/").length;

    if (lengthBaseUrl > 3) {
      return baseUrl.split("/").slice(0, 3).join("/");
    }

    return baseUrl;
  }, [router]);

  const { mdUp } = useBreakpoints();

  const sortedCategories = categoryOptions;

  sortedCategories.sort((a, b) => {
    if (a.uniqueName === categoryActive) return -1;
    if (b.uniqueName === categoryActive) return 1;

    return 0;
  });

  const initialCategoryOptions = sortedCategories.slice(0, !mdUp ? MAX_CATEGORY_SHOW_MOBILE : MAX_CATEGORY_SHOW);

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [categoriesToShow, setCategoriesToShow] = useState(initialCategoryOptions);

  useEffect(() => {
    if (showAllCategories) {
      setCategoriesToShow(categoryOptions);
    } else {
      setCategoriesToShow(initialCategoryOptions);
    }
  }, [showAllCategories, categoryOptions]);

  const allCategory = categoriesToShow.find((category) => category.value === "all");

  if (!allCategory) {
    categoriesToShow.unshift({ value: "all", label: "All" });
  }

  categoriesToShow.sort((a, b) => {
    if (a.value === categoryActive) return -1;
    if (b.value === categoryActive) return 1;
    return 0;
  });

  return (
    <div className="flex flex-wrap items-center gap-2">
      {categoriesToShow.length > 0 && (
        <>
          {categoriesToShow.map((categoryOption) => {
            return (
              <div key={categoryOption.value}>
                <input
                  type="checkbox"
                  id={categoryOption.value}
                  name={categoryOption.value}
                  value={categoryOption.value}
                  checked={categoryActive === categoryOption.value}
                  onChange={() => {
                    if (categoryOption.value === "all") {
                      window.open(currentPath, "_self");
                    } else {
                      window.open(currentPath + `/${categoryOption.uniqueName}`, "_blank");
                    }
                  }}
                  hidden
                />

                <label
                  htmlFor={categoryOption.value}
                  className={`py-10px px-22px border rounded-lg cursor-pointer text-base block hover:bg-primary hover:text-white hover:border-primary ${
                    categoryActive === categoryOption.value
                      ? "bg-primary text-white border-primary"
                      : "bg-white border-black"
                  }`}
                >
                  {categoryOption.label}
                </label>
              </div>
            );
          })}

          {categoryOptions.length >= MAX_CATEGORY_SHOW && (
            <div
              className="text-primary text-base font-medium cursor-pointer"
              onClick={() => setShowAllCategories(!showAllCategories)}
            >
              {showAllCategories ? "Show Less" : "Show More"}
            </div>
          )}
        </>
      )}
    </div>
  );
});

FilterFormContent.displayName = "FilterFormContent";

export default FilterFormContent;

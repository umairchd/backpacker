import { Bpd_IntRange, ProductSortOrder } from "@@/pages/Destination/queries/destination-page-queries.generated";

export type SelectCheckboxValue = SelectOption | SelectOption[] | null;

export interface SelectOption {
  [key: string]: any;
}

export interface SortOrderOption {
  value: ProductSortOrder;
  label: string;
}

export interface FilterFormValues {
  [FIELDS.ORDER]: SortOrderOption;
  [FIELDS.DESTINATION]: number[];
  [FIELDS.CATEGORIES]: number[];
  [FIELDS.PAGE]: number;
}

export type FormValuePayload = {
  [key in FIELDS]: SortOrderOption | Bpd_IntRange | string;
};

export const sortByOptions: SortOrderOption[] = [
  { label: "Popular", value: ProductSortOrder.Popular },
  { label: "Price - Low to High", value: ProductSortOrder.PriceLowToHigh },
  { label: "Price - High to Low", value: ProductSortOrder.PriceHighToLow },
];

export const defaultProductCount = 12;

export enum FIELDS {
  ORDER = "order",
  DESTINATION = "destination",
  CATEGORIES = "categories",
  PAGE = "page",
}

export const defaultFormValues = {
  [FIELDS.ORDER]: sortByOptions[0],
  [FIELDS.DESTINATION]: [],
  [FIELDS.CATEGORIES]: [],
  [FIELDS.PAGE]: 1,
};

export interface CustomDropdownProps {
  label?: string;
  labelValue?: string;
  children: any;
}

export interface FilterFormProps {
  cityUniqueName?: string;
  categoryUniqueName?: string;
  categories: SelectOption[];
  destinations: SelectOption[];
  valuesLoading?: { [key: string]: boolean };
  productCount: number;
  displaySkeletonCards: boolean;
  hideFilterForm: boolean;
}

export interface FilterFormContentProps {
  valueCategories: SelectCheckboxValue;
  values?: FilterFormValues | { [key: string]: any };
  categoryOptions: SelectOption[];
  onChange?: (field: FIELDS, value: any) => void;
  categoryActive: string;
  setCategoryActive?: (value: string) => void;
}

export interface SelectProps {
  value: string[];
  typeOptionOnClick?: "filter" | "navigation";
  defaultValue?: SelectCheckboxValue;
  label?: string;
  placeholder?: string;
  labelAllOption?: string;
  options: SelectOption[];
  valueLoading?: boolean;
  isMulti?: boolean;
  onApply?: (arg0: SelectCheckboxValue) => void;
  onBoxShadowClose?: () => void;
}

export interface SelectSingleProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[] | SortOrderOption[];
  value?: SelectOption | SortOrderOption | null;
  defaultValue?: SelectOption | SortOrderOption | null;
  id: string;
  testId?: string;
  onChange: (val: SelectOption) => void;
}

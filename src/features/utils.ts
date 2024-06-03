import { useMedia } from "react-use";

export const BREAKPOINTS = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1140,
  xxl: 1400,
  navXl: 1149,
  lgSearch: 992,
} as const;

export const useBreakpoints = () => {
  const lgSearchUp = useMedia(`(min-width: ${BREAKPOINTS.lgSearch}px)`, false);
  const navXlUp = useMedia(`(min-width: ${BREAKPOINTS.navXl}px)`, false);
  const xxlUp = useMedia(`(min-width: ${BREAKPOINTS.xxl}px)`, false);
  const xlUp = useMedia(`(min-width: ${BREAKPOINTS.xl}px)`, false);
  const lgUp = useMedia(`(min-width: ${BREAKPOINTS.lg}px)`, false);
  const mdUp = useMedia(`(min-width: ${BREAKPOINTS.md}px)`, false);
  const smUp = useMedia(`(min-width: ${BREAKPOINTS.sm}px)`, true);

  return {
    lgSearchUp,
    navXlUp,
    xxlUp,
    xlUp,
    lgUp,
    mdUp,
    smUp,
  };
};

const getMinMaxMediaQuery = (min: number, max: number) =>
  useMedia(`(min-width: ${min}px) and (max-width: ${max}px)`, false);

export const useQuickSearchBreakpoints = () => {
  const qsSecondRow = getMinMaxMediaQuery(BREAKPOINTS.md, 1086);
  const qsSecondAndThirdMiddleRow = getMinMaxMediaQuery(430, 767);
  const qsThirdRowOnMobile = useMedia(`(max-width: 429px)`, false);

  return {
    quickSearchSecondRow: qsSecondRow,
    qsSecondAndThirdMiddleRow,
    quickSearchThirdRowOnMobile: qsThirdRowOnMobile,
  };
};

export const isNumeric = (n: unknown) => {
  return !isNaN(parseFloat(n as any)) && isFinite(n as any);
};

"use client";

import { useSearchBarAnimationEffectState } from "@@/features/search/components/hooks/SearchBarAnimationEffectStateProvider";
import { useBreakpoints } from "@@/features/utils";
import clsx from "clsx";

function Main({
  children,
  mainContainerClass,
  isBannerActive,
}: {
  mainContainerClass?: string;
  children: React.ReactNode;
  isBannerActive?: boolean;
}) {
  const [isObscured] = useSearchBarAnimationEffectState();
  const { mdUp: isDesktop } = useBreakpoints();
  const isBanner = isBannerActive ?? false;

  const navOffset = isBanner ? "pt-13" : "pt-9.5";
  const navOffsetPages = isBanner ? "pt-13" : "pt-9.5";

  const getStyles = () => {
    return isObscured ? navOffsetPages : navOffset;
  };

  const styleNav = getStyles();

  return (
    <main
      className={clsx("transition-all duration-200 ease-in-out", isDesktop ? navOffset : styleNav, mainContainerClass)}
    >
      {children}
    </main>
  );
}

export default Main;

"use client";

import { FC, PropsWithChildren } from "react";
import { createStateContext } from "react-use";

const [
  useSearchBarAnimationEffectState,
  _SearchBarAnimationEffectStateProvider,
] = createStateContext(false);

export { useSearchBarAnimationEffectState };

const SearchBarAnimationEffectStateProvider =
  _SearchBarAnimationEffectStateProvider as FC<
    PropsWithChildren<{
      initialValue?: boolean;
    }>
  >;

export default SearchBarAnimationEffectStateProvider;

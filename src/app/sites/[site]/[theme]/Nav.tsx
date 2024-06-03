"use client";

import { useSearchBarAnimationEffectState } from "@@/features/search/components/hooks/SearchBarAnimationEffectStateProvider";
import type { Channel } from "@@/app/data/getChannelByHost";
import NavComponent from "@@/app/components/Nav";

function Nav({ channel, mainContainerClass }: { channel: Channel; mainContainerClass?: string }) {
  const [isObscured] = useSearchBarAnimationEffectState();

  return (
    <NavComponent
      {...{
        isObscured,
        channel,
        mainContainerClass,
      }}
    />
  );
}

export default Nav;

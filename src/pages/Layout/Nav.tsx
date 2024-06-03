import { FC } from "react";
import { useSearchBarAnimationEffectState } from "@/src/features/search/components/hooks/SearchBarAnimationEffectStateProvider";
import { useServerContext } from "../lib/ServerContextProvider";

import NavComponent from "@@/app/components/Nav";

const Nav: FC = () => {
  const [isObscured] = useSearchBarAnimationEffectState();
  const { channel, mainContainerClass } = useServerContext();

  return (
    <NavComponent
      {...{
        isObscured,
        channel,
        mainContainerClass,
      }}
    />
  );
};

export default Nav;

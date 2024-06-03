"use client";

import SearchBarAnimationEffectStateProvider from "@@/features/search/components/hooks/SearchBarAnimationEffectStateProvider";
import type { Channel } from "@@/app/data/getChannelByHost";
import Main from "./Main";
import Nav from "./Nav";
import FullscreenSearch from "./FullscreenSearch";
import { useLayoutConfig } from "@@/app/lib/useLayoutConfig";

const Layout = ({
  children,
  channel,
  bottomEl,
}: {
  children: React.ReactNode;
  channel: Channel;
  bottomEl?: React.ReactNode;
}) => {
  const layoutConfig = useLayoutConfig();

  const {
    siteConfig: { is_banner_active },
  } = channel;

  if (layoutConfig.noLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <SearchBarAnimationEffectStateProvider initialValue={true}>
        <Nav
          {...{
            channel,
          }}
        />
        <Main isBannerActive={is_banner_active}>{children}</Main>
      </SearchBarAnimationEffectStateProvider>
      {bottomEl}
      <FullscreenSearch />
    </>
  );
};

export default Layout;

"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const FullscreenSearchComponent = dynamic(
  () => import("@@/features/search/components/FullscreenSearch/FullscreenSearch"),
);

function FullScreenSearch() {
  const router = useRouter();

  return <FullscreenSearchComponent router={router} />;
}

export default FullScreenSearch;

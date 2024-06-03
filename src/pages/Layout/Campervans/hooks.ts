import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import { useMemo } from "react";

export const useCampervanLinks = () => {
  const { channel } = useServerContext();
  const { key } = channel ?? {};

  const campervanChannel = useMemo(() => {
    switch (key) {
      case "backpackerdeals":
        return {
          key: "backpackerdeals",
          channel: "backpackerdeals",
          search: "",
          name: "Backpacker Deals",
        };
      case "travello":
      case "sydneyexpert":
        return {
          key: "travello",
          channel: "travelloapp",
          search: "search",
          name: "Travello",
        };
      default:
        return null;
    }
  }, [key]);

  return campervanChannel;
};

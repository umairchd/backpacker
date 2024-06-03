import { useSearchParams } from "next/navigation";

export const useLayoutConfig = () => {
  const searchParams = useSearchParams();
  return {
    noLayout: searchParams.get("raw") === "1",
  };
};

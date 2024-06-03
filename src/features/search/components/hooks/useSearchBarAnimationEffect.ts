import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDebounce, useIntersection } from "react-use";
import { getIsOpen } from "../../model";
import { useSearchBarAnimationEffectState } from "./SearchBarAnimationEffectStateProvider";

const useSearchBarAnimationEffect = () => {
  const intersectionRef = useRef(null);
  const isOpen = useSelector(getIsOpen);

  const [isObscured, setIsObscured] = useSearchBarAnimationEffectState();

  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  const [cancel] = useDebounce(
    () => {
      setIsObscured(
        (intersection && intersection.intersectionRatio < 1) || isOpen
      );
    },
    32,
    [intersection, isOpen]
  );

  useEffect(() => {
    const body = document.querySelector("body");

    if (isObscured) {
      body.classList.add("scroll-search-offset");
      // search bar obscured
    } else {
      body.classList.remove("scroll-search-offset");
      // search bar in view
    }

    return function cleanup() {
      cancel();
    };
  }, [cancel, isObscured]);

  return {
    intersectionRef,
    isObscured,
  };
};

export default useSearchBarAnimationEffect;

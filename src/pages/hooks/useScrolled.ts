/* eslint-disable etc/no-deprecated */
import { useEffect, useState } from "react";

export const useScrolled = () => {
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset;
      const scrollHeight = document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const distanceFromBottom = scrollHeight - clientHeight - currentScrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 0) {
        if (!scrolled && distanceFromBottom >= 1000) setScrolled(true);
      } else {
        if (scrolled || distanceFromBottom < 1000 || currentScrollY === 0) setScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled, lastScrollY]);

  return scrolled;
};

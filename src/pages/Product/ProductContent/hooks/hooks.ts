import { useState, useEffect, useCallback, useRef, useMemo } from "react";

export const useTabsWrapperVisibility = () => {
  const [tabsWrapperShown, setTabsWrapperShown] = useState(false);

  const tabsRef = useRef(null);

  const handleDocumentScroll = useCallback(() => {
    if (tabsRef.current) {
      const bookingSectionTop = tabsRef.current.getBoundingClientRect().top;

      if (bookingSectionTop <= 600) {
        setTabsWrapperShown(true);
      } else if (bookingSectionTop >= -600) {
        setTabsWrapperShown(false);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleDocumentScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleDocumentScroll);
  }, [handleDocumentScroll]);

  return { tabsWrapperShown, tabsRef };
};

export const useBottomPriceVisibility = () => {
  const [bottomPriceShown, setBottomPriceShown] = useState(true);

  const handleDocumentScroll = useCallback(() => {
    const bookingSection = document.getElementById("booking-section");
    if (bookingSection) {
      const bookingSectionTop = bookingSection.getBoundingClientRect().top;
      const bookingSectionBottom =
        bookingSection.getBoundingClientRect().bottom;

      if (bookingSectionTop <= 800 && bookingSectionBottom >= 700) {
        setBottomPriceShown(false);
      } else {
        setBottomPriceShown(true);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleDocumentScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleDocumentScroll);
  }, []);

  return bottomPriceShown;
};

export const useReadMore = (content: string, count = 40) => {
  const contentSplit = useMemo(() => {
    const words = content?.split(" ");
    const truncatedContent = words?.slice(0, count)?.join(" ");
    const shouldShowReadMore = words?.length > count;

    return {
      truncatedContent: truncatedContent + (shouldShowReadMore ? "..." : ""),
      fullContent: content,
      shouldShowReadMore,
    };
  }, [content, count]);

  const [readMore, setReadMore] = useState(false);
  const [contentToBeDisplayed, setContentToBeDisplayed] = useState("");

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  // https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
  useEffect(() => {
    const contentState = readMore
      ? contentSplit.fullContent
      : contentSplit.truncatedContent;
    setContentToBeDisplayed(contentState);
  }, [readMore]);

  return {
    content: contentToBeDisplayed,
    showReadMore: contentSplit.shouldShowReadMore,
    readMore,
    toggleReadMore,
  };
};

export const useCountdownVisibility = () => {
  const [countDownVisible, setCountDownVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCountDownVisible(true);
    }, 50);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return countDownVisible;
};

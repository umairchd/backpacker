import Glider from "glider-js";
import {
  Ref,
  useRef,
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  ReactNode,
  useId,
} from "react";

export interface BreakPoint {
  breakpoint: number;
  settings: {
    slidesToShow?: number | "auto";
    slidesToScroll?: number | "auto";
    itemWidth?: number;
    duration?: number;
  };
}

export interface GliderProps {
  hasArrows?: boolean;
  hasDots?: boolean;
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  className?: string;
  scrollToSlide?: number;
  scrollToPage?: number;
  children: ReactNode;

  /**
   * The number of slides to show in container
   * If this value is set to auto, it will be
   * automatically calculated based upon the number
   * of items able to fit within the container viewport.
   * This requires setting the itemWidth option.
   *
   * @default 1
   */
  slidesToShow?: number | "auto";
  /**
   * The number of slides to scroll when arrow navigation
   * is used. If this value is set to auto, it will match
   * the value of slidesToScroll.
   *
   * @default 1
   */
  slidesToScroll?: number | "auto";
  /** This value is ignored unless slidesToShow is set to auto, in which it is then required. */
  itemWidth?: number;
  /**
   * This prevents resizing items to fit when slidesToShow is set to auto.
   * NOTE: This will yield fractional slides if your container is not sized appropriately
   */
  exactWidth?: boolean;
  /**
   * If true, Glider.js will lock to the nearest slide on resizing of the window
   */
  resizeLock?: boolean;
  /**
   * If true, Glider.js will scroll to the beginning/end when its respective endpoint is reached
   */
  rewind?: boolean;
  /**
   * An aggravator used to control animation speed. Higher is slower!
   *
   * @default 0.5
   */
  duration?: number;
  /** An string containing the dot container selector */
  dots?: Glider.Selector | null;
  /** An object containing the prev/next arrows selectors */
  arrows?: {
    prev: Glider.Selector | null;
    next: Glider.Selector | null;
  };

  /**
   * If true, the list can be scrolled by click and dragging with the mouse
   *
   * @default false
   */
  draggable?: boolean;
  /**
   * How much to aggravate the velocity of the mouse dragging
   *
   * @default 3.3
   */
  dragVelocity?: number;

  /**
   * Whether or not to release the scroll events from the container
   *
   *  @default false
   */
  scrollPropagate?: boolean;
  /**
   * Whether or not Glider.js events should bubble (useful for binding events to all carousels)
   *
   * @default true
   */
  propagateEvent?: boolean;

  /**
   * If true, Glider.js will scroll to the nearest slide after any scroll interactions.
   *
   * @default false
   */
  scrollLock?: boolean;

  /**
   * Whether or not Glider.js should skip wrapping its children with a 'glider-track' <div>.
   * NOTE: If true, Glider.js will assume that the 'glider-track' element has been added manually. All slides must be children of the track element.
   *
   * @default false
   */
  skipTrack?: boolean;
  /**
   * how long to wait after scroll event before locking,
   * if too low, it might interrupt normal scrolling
   *
   * @default 250
   */
  scrollLockDelay?: number;

  /**
   * An object containing custom settings per provided breakpoint.
   * Glider.js breakpoints are mobile-first
   * be conscious of your ordering,
   */
  responsive?: BreakPoint[];

  /** use any custom easing function, compatible with most easing plugins */
  easing?(x: number, t: number, b: number, c: number, d: number): number;

  /** Called after Glider.js is first initialized */
  onLoad?(event: CustomEvent): void;
  /** Called whenever a Glider.js paging animation is complete */
  onAnimated?(event: CustomEvent): void;
  /** Called whenever a Glider.js animation is complete */
  onRemove?(event: CustomEvent): void;
  /** Called whenever a slide a shown. Passed an object containing the slide index */
  onSlideVisible?(event: CustomEvent): void;
  /** Called whenever Glider.js refreshes it's elements or settings */
  onRefresh?(event: CustomEvent): void;
  /** Called whenever an item is added to Glider.js */
  onAdd?(event: CustomEvent): void;
  /** Called whenever a Glider.js is destroyed */
  onDestroy?(event: CustomEvent): void;
  /** Called whenever a slide a hidden. Passed an object containing the slide index */
  onSlideHidden?(event: CustomEvent): void;
}

type GliderOptions = Pick<
  GliderProps,
  | "arrows"
  | "dots"
  | "slidesToShow"
  | "slidesToScroll"
  | "itemWidth"
  | "exactWidth"
  | "scrollLock"
  | "scrollLockDelay"
  | "resizeLock"
  | "responsive"
  | "rewind"
  | "scrollPropagate"
  | "draggable"
  | "dragVelocity"
  | "duration"
  | "skipTrack"
>;

export interface GliderMethods {
  destroy(): void;
  updateControls(): void;
  refresh(rebuildPaging?: boolean): void;
  setOption(options: GliderOptions, global?: boolean): void;
  scrollTo(pixelOffset: number): void;
  scrollItem(slideIndex: string | number, isActuallyDotIndex?: boolean): void;
}

function gliderAutoPlay<T extends HTMLElement>(
  slider: Glider<T>,
  miliseconds: number
) {
  const slidesCount = slider.slides.length;
  (slider as any).slideTimeout = null;
  let nextIndex = 1;

  function slide() {
    if ((slider as any).slideTimeout)
      window.clearTimeout((slider as any).slideTimeout);

    (slider as any).slideTimeout = setTimeout(function () {
      if (nextIndex >= slidesCount) {
        nextIndex = 0;
      }
      slider.scrollItem(nextIndex, false);
      nextIndex += 1;
    }, miliseconds);
  }

  slider.ele.addEventListener("glider-animated", function () {
    slide();
  });

  slide();

  return (slider as any).slideTimeout;
}

const useGlider = (props: GliderProps, ref?: Ref<GliderMethods>) => {
  const {
    arrows,
    dots,
    hasArrows,
    hasDots,
    scrollToSlide,
    scrollToPage,
    onSlideVisible,
    onLoad,
    onAnimated,
    onRemove,
    onRefresh,
    onAdd,
    onDestroy,
    onSlideHidden,
    autoPlay,
    autoPlaySpeed = 3000,
    ...restProps
  } = props;

  const innerRef = useRef<HTMLDivElement>(null);
  const gliderRef = useRef<GliderMethods>();
  const autoId = useId(); // strips all : so it can be used, with querySelectorAll
  const autoIdNoColon = autoId.replace(/:/g, "");
  const nextBtnId = `glider-next-${autoIdNoColon}`;
  const prevBtnId = `glider-prev-${autoIdNoColon}`;
  const dotsId = `dots-${autoIdNoColon}`;

  const [isReady, setIsReady] = useState(typeof autoId !== "undefined");

  useEffect(() => {
    setIsReady(true);
  }, [autoId]);

  const makeGliderOptions: () => Glider.Options = useCallback(
    () => ({
      ...restProps,
      arrows:
        (hasArrows && {
          next: (arrows && arrows.next) || `#${nextBtnId}`,
          prev: (arrows && arrows.prev) || `#${prevBtnId}`,
        }) ||
        undefined,
      dots: (hasDots && dots) || `#${dotsId}` || undefined,
    }),
    [restProps, hasArrows, arrows, nextBtnId, prevBtnId, hasDots, dots, dotsId]
  );

  // initialize the glider // was useLayoutEffect
  useEffect(() => {
    const { current } = innerRef;

    if (current && isReady) {
      if (!gliderRef.current) {
        const glider = new Glider(
          current,
          makeGliderOptions()
        ) as GliderMethods;

        gliderRef.current = glider;

        if (onLoad) {
          onLoad.call(
            glider,
            new CustomEvent("glider-loaded", {
              detail: { target: innerRef.current },
            })
          );
        }

        if (scrollToSlide) {
          glider.scrollItem(scrollToSlide - 1);
        } else if (scrollToPage) {
          glider.scrollItem(scrollToPage - 1, true);
        }
      }
    }
  }, [makeGliderOptions, scrollToPage, scrollToSlide, isReady, onLoad]);

  // remove event listeners when props change
  useEffect(() => {
    const { current } = innerRef;

    return () => {
      const removeEventListener = (
        event: string,
        fn: ((e: CustomEvent) => void) | undefined
      ) => {
        if (typeof fn === "function" && current) {
          current.removeEventListener(event, fn);
        }
      };

      removeEventListener("glider-slide-visible", onSlideVisible);
      removeEventListener("glider-animated", onAnimated);
      removeEventListener("glider-remove", onRemove);
      removeEventListener("glider-refresh", onRefresh);
      removeEventListener("glider-add", onAdd);
      removeEventListener("glider-destroy", onDestroy);
      removeEventListener("glider-slide-hidden", onSlideHidden);
    };
  }, [
    onAdd,
    onAnimated,
    onDestroy,
    onRefresh,
    onRemove,
    onSlideHidden,
    onSlideVisible,
  ]);

  // when the props update, update the glider
  useEffect(() => {
    if (gliderRef.current && isReady) {
      gliderRef.current.setOption(makeGliderOptions(), true);

      // start autoplay
      if (autoPlay) {
        const timer = gliderAutoPlay(gliderRef.current as any, autoPlaySpeed);

        return function cleanup() {
          window.clearTimeout(timer);
        };
      }
      gliderRef.current.refresh(true);
    }
  }, [makeGliderOptions, isReady, autoPlay, autoPlaySpeed]);

  // expose the glider instance to the user so they can call the methods too
  useImperativeHandle(ref, () => gliderRef.current);

  return {
    showArrows: props.hasArrows && !arrows,
    prevBtnId,
    nextBtnId,
    showDots: hasDots && !dots,
    dotsId,
    gliderId: autoId,
    gliderRef: innerRef,
    gliderChildren: restProps.children,
  };
};

export default useGlider;

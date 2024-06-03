import React, { FC, useEffect, useRef, useState } from "react";
import LottiePlayer from "lottie-web/build/player/lottie_light.min.js";
import useAnimationLoading from "./hooks";

interface AnimationLoadingProps {
  children?: React.ReactNode;
  calendar?: boolean;
}

const AnimationLoading: FC<AnimationLoadingProps> = ({ children, calendar = false }) => {
  const animation = useAnimationLoading();

  //Load the library and the animation json asynchronously (dynamically)
  const ref = useRef<HTMLDivElement>(null);
  const [lottie, setLottie] = useState<typeof LottiePlayer | null>(null);

  useEffect(() => {
    const loadLottie = async () => {
      try {
        const Lottie = await import("lottie-web/build/player/lottie_light.min.js");
        setLottie(Lottie.default);
      } catch (error) {
        console.error("Failed to load Lottie:", error);
      }
    };
    loadLottie().catch((error: unknown) => console.error(error));
  }, []);

  useEffect(() => {
    if (lottie && ref.current) {
      const animationLoading = lottie.loadAnimation({
        container: ref.current,
        animationData: animation,
        loop: true,
        autoplay: true,
      });

      return () => {
        animationLoading.destroy();
      };
    }
  }, [lottie, ref, animation]);

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <div
        ref={ref}
        className={
          calendar ? "h-120px w-120px" : "md:w-450px md:h-450px sm:w-300px sm:h-300px w-200px h-200px animation-load"
        }
      />

      {children}
    </div>
  );
};

export default AnimationLoading;

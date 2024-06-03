import { useEffect, useState } from "react";
import Balloon from "./lotties/loading-balloon.json";
import Beach from "./lotties/loading-beach.json";
import Camera from "./lotties/loading-camera.json";
import Plane from "./lotties/loading-plane.json";
import Scuba from "./lotties/loading-scuba.json";

const useAnimationLoading = () => {
  const [animation, setAnimation] = useState(null);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [AnimationLists] = useState([Balloon, Beach, Camera, Plane, Scuba]);

  const interval = (new Date().getMilliseconds() % 5) + 1;
  const randomAnimation = AnimationLists.slice(interval).concat(
    AnimationLists.slice(0, interval)
  );

  useEffect(() => {
    setAnimation(randomAnimation[animationIndex]);
  }, [animationIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationIndex((prev) => (prev + 1) % randomAnimation.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return animation;
};

export default useAnimationLoading;

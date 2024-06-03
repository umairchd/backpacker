import { Image } from "@@/types.generated";
import { useCallback, useEffect, useState } from "react";

function useImageIterator<T extends Image>(images?: T[]) {
  const [activeImage, setActiveImage] = useState<T | null>(null);

  useEffect(() => {
    setActiveImage(images?.[0] ?? null); // Set active image if images is changed
  }, [images]);

  const getNextImage = useCallback(() => {
    // Create iterator inside the function
    const iterator = (images ?? []).values();
    const nextImage = iterator.next();
    if (!nextImage.done) {
      setActiveImage(nextImage.value);
    }
  }, [images]);

  useEffect(() => {
    // Try to get the next image if activeImage is null
    if (!activeImage && images) {
      getNextImage();
    }
  }, [activeImage, images, getNextImage]);

  return {
    image: activeImage,
    getNextImage,
  };
}

export default useImageIterator;

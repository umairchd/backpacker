import { useState, useEffect } from "react";
import { ReviewData } from "./types";

const useFetchPhotoReviews = (productId: string) => {
  const [photoReviews, setPhotoReviews] = useState([]);
  const [stats, setStats] = useState<ReviewData>();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchReviewsWithPhotos = async () => {
      try {
        const options = {
          method: "GET",
          headers: { accept: "application/json" },
        };

        const response = await fetch(
          `https://api.reviews.io/reviews?store=backpackerdealscom&sku=${productId}&with=images`,
          options,
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const json = await response.json();

        let newPhotosReviews = [];
        json.reviews.forEach((review: { photos: string[] }) => {
          newPhotosReviews.push({
            ...review,
            photos: review.photos
              .map((photo: string | URL) => {
                let src = "";
                try {
                  const url = new URL(photo);
                  src = url.searchParams.get("src");
                } catch (error) {
                  console.error("Invalid URL:", photo);
                }

                return decodeURIComponent(src);
              })
              .filter((photo: string) => photo !== null),
            compressed_photos: review.photos.filter((photo: string) => photo !== null),
          });
        });

        setPhotoReviews(newPhotosReviews);
        setStats(json);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviewsWithPhotos().catch((error: unknown) => {
      console.error(error);
    });
  }, [productId]);

  useEffect(() => {
    if (photoReviews) {
      const photoArray = [];

      photoReviews.forEach((review) => {
        photoArray.push(...review.photos);
      });

      setPhotos(photoArray);
    }
  }, [photoReviews]);

  return { photoReviews, stats, photos };
};

export default useFetchPhotoReviews;

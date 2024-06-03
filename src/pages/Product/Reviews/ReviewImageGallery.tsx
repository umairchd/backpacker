import React, { useState, useEffect, Fragment } from "react";
import Box from "@mui/material/Box";
import StarRating from "@@/pages/components/StarRating/StarRating";
import { Review } from "./types";
import useFetchPhotoReviews from "./hooks";
import { FaRegWindowClose } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Dialog, Transition } from "@headlessui/react";
import OptimizedHeroImage from "@@/pages/components/HeroImage/OptimizedHeroImage";

const ReviewImageGallery = ({ productId, src, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedReview, setSelectedReview] = useState<Review>();

  const { photoReviews, photos } = useFetchPhotoReviews(productId);

  useEffect(() => {
    const loadedImageIndex = photos.indexOf(src);
    setSelectedImage(loadedImageIndex);
  }, [photos, src]);

  const handleNextImage = () => {
    if (selectedImage + 1 < photos.length) {
      setSelectedImage(selectedImage + 1);
    }
  };

  const handlePrevImage = () => {
    if (selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  // Match Image to Review
  useEffect(() => {
    photoReviews.some((photoReview) => {
      if (photoReview.photos.includes(photos[selectedImage])) {
        setSelectedReview(photoReview);
      }
    });
  }, [selectedImage, photos, photoReviews]);

  return (
    <Transition
      appear
      show={true}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-50"
        open={true}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 bg-black/50">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full transform overflow-hidden transition-all text-white">
                <div className="w-full 900px:max-w-900px px-6 mx-auto">
                  <div className="grid grid-cols-12 gap-4 mb-4">
                    <div className="col-span-10">
                      <p className="text-center mb-4">
                        <strong>Customer Shared Photos ({photos.length})</strong>
                      </p>
                    </div>
                    <div className="col-span-2">
                      <FaRegWindowClose
                        className="text-xl cursor-pointer"
                        onClick={onClose}
                      />
                    </div>
                    <div className="col-span-1 flex items-center">
                      <FaChevronLeft
                        onClick={handlePrevImage}
                        className="text-3xl cursor-pointer"
                      />
                    </div>
                    <div className="col-span-10 900px:col-span-6">
                      {photos[selectedImage] && photos && (
                        <OptimizedHeroImage
                          className="rounded-xl w-full h-[200px] md:h-[400px] object-cover"
                          alt="selectedReview"
                          src={photos[selectedImage]}
                        />
                      )}
                    </div>
                    <div className="col-span-1 flex items-center">
                      <FaChevronRight
                        onClick={handleNextImage}
                        className="text-3xl cursor-pointer"
                      />
                    </div>
                    <div className="caption col-span-12 900px:col-span-4">
                      <strong>{selectedReview?.author?.name ?? ""} </strong>
                      <StarRating
                        initialValue={selectedReview?.rating || 0}
                        readonly
                      />
                      <p className="mb-4">{new Date(selectedReview?.date_created).toLocaleDateString()}</p>
                      <p
                        style={{ fontStyle: "italic" }}
                        className="scrollbar mb-4 pr-2 h-auto md:h-[320px] overflow-auto"
                      >
                        {selectedReview?.comments}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-1 grid-cols-6 md:grid-cols-12 cursor-pointer mb-2">
                    {photos.map((photo, ind) => {
                      const selectedThumbnail = ind === selectedImage;
                      return (
                        photo && (
                          <Box
                            key={photo}
                            onClick={() => setSelectedImage(ind)}
                          >
                            <OptimizedHeroImage
                              className="clickable-image !w-[50px] !h-[50px] md:!h-[60px] md:!w-[60px] rounded-xl"
                              alt="Review Thumbnail"
                              src={photo}
                              style={{
                                borderRadius: "10px",
                                opacity: selectedThumbnail ? "1" : "0.5",
                                border: selectedThumbnail ? "2px solid white" : "none",
                              }}
                            />
                          </Box>
                        )
                      );
                    })}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ReviewImageGallery;

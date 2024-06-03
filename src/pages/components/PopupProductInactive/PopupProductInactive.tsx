import { FC, useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";
import { FiX } from "react-icons/fi";

interface PopupProductInActiveProps {
  show: boolean;
  destinationLink: string;
  destinationLocation: string;
  bannerMainCategory: string;
  categoryUrl: string;
  categoryName: string;
  altImage: string;
}

const PopupProductInActive: FC<PopupProductInActiveProps> = ({
  show,
  destinationLink,
  destinationLocation,
  bannerMainCategory,
  categoryUrl,
  categoryName,
  altImage,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const closePopup = () => setShowPopup(false);

  useEffect(() => {
    setShowPopup(show);
  }, [show]);

  return (
    <Transition
      appear
      show={showPopup}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-40"
        onClose={closePopup}
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
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <h3 className="text-3xl font-medium text-primary mb-2">Sorry, this tour is sold out.</h3>
                <h4 className="text-xl font-medium text-black mb-3">But we have similar tours in</h4>
                <Link
                  href={destinationLink}
                  className="text-xl font-semibold text-primary flex items-center gap-6px w-fit"
                >
                  <IoLocationSharp />
                  {destinationLocation}
                </Link>
                <div className="flex items-center flex-col md:flex-row gap-6 mt-4">
                  <img
                    className="md:w-52 w-full rounded-md"
                    src={bannerMainCategory}
                    alt={altImage}
                    loading="lazy"
                  />
                  <div className="flex flex-col">
                    <h5 className="text-xl font-medium mb-4">{categoryName}</h5>
                    <a
                      href={`${categoryUrl}`}
                      className="px-4 py-6px bg-primary rounded-full text-base font-medium text-white text-center"
                    >
                      View Tours
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closePopup}
                  className="h-10 w-10 rounded-md hover:bg-gray-100 flex items-center justify-center outline-none absolute top-6 right-6"
                >
                  <FiX className="w-7 h-7 text-primary" />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PopupProductInActive;

import React, { FC, Fragment } from "react";
import Link from "next/link";

import classes from "./BookingFailedModal.module.scss";
import Button from "@@/pages/components/Button";
import { Dialog, Transition } from "@headlessui/react";
import { FaRegFaceSurprise } from "react-icons/fa6";

interface BookingFailedModalProps {
  isOpen: boolean;
  tourOptionsHref?: string;
  toProductDetailPage: () => void;
}

const BookingFailedModal: FC<BookingFailedModalProps> = ({ isOpen, tourOptionsHref, toProductDetailPage }) => {
  return (
    <>
      <Transition
        appear
        show={isOpen}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => {}}
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
                <Dialog.Panel
                  className={`${classes["booking-failed-modal"]} w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <div className="flex justify-between">
                    <h3 className="text-center">We’re sorry! We were unable to process your booking.</h3>
                    <FaRegFaceSurprise />
                  </div>
                  <div className="max-w-1320px px-3 sm:px-6 mx-auto text-center">
                    <p>
                      The availability for your selection may have changed.
                      <br />
                      <br />
                      We suggest you double check the availability of your selection or look for other tour options.
                    </p>
                    <div className="inlineflex relative align-middle flex-col lg:flex-row">
                      <Button
                        variant="primary"
                        onClick={() => toProductDetailPage()}
                      >
                        Check availability
                      </Button>
                      {tourOptionsHref ? (
                        <Link href={tourOptionsHref}>
                          <Button variant="outline-primary">Select other tour options</Button>
                        </Link>
                      ) : null}
                    </div>
                    <span>Need help?</span>
                    <a
                      href="/contact-us"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat with us
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default BookingFailedModal;

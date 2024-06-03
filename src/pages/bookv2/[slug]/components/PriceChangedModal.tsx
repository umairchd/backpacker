import React, { FC, Fragment } from "react";

import classes from "./PriceChangedModal.module.scss";
import Button from "@@/pages/components/Button";
import { Dialog, Transition } from "@headlessui/react";

interface PriceChangedModalProps {
  isOpen: boolean;
  newPrice: string;
  onContinueClick: (isContinue: boolean) => void;
}

const PriceChangedModal: FC<PriceChangedModalProps> = ({
  isOpen,
  newPrice,
  onContinueClick,
}) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => onContinueClick(false)}
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
                  className={`${classes["price-changed-modal"]} w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <h3 className="text-center">
                    Hello! We just detected the price has been changed from the
                    tour operator.
                  </h3>
                  <div className="text-center">
                    <p>New Price</p>
                    <p>{newPrice}</p>
                    <Button
                      variant="primary"
                      onClick={() => onContinueClick(true)}
                    >
                      Continue My Booking
                    </Button>
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

export default PriceChangedModal;

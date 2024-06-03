import React, { FC, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";

interface LaybuyModalProps {
  currencySymbol: string;
  amount: number;
}

const LaybuyModal: FC<LaybuyModalProps> = ({ currencySymbol, amount }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="text-xs leading-22px cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        or 6 weekly interest free payment from{" "}
        <b>
          {currencySymbol}
          {(amount / 6).toFixed(2)}
        </b>{" "}
        with
        <img
          src="/imagesv3/laybuy-logo.png"
          alt="laybuy"
          width="66.22px"
          height="15px"
          className="mx-auto"
        />
      </div>
      <Transition
        appear
        show={isOpen}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="mb-2 ml-auto h-10 w-10 rounded-md hover:bg-gray-100 flex items-center justify-center outline-none"
                  >
                    <FiX className="text-primary w-7 h-7" />
                  </button>
                  <img
                    src="/imagesv3/laybuy-popup.png"
                    alt="laybuy"
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default LaybuyModal;

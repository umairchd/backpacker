import React, { FC, useState, Fragment } from "react";

import Button from "../Button";
import { Dialog, Transition } from "@headlessui/react";

interface TermsAndConditionsModalProps {
  text: string;
}

const TermsAndConditionsModal: FC<TermsAndConditionsModalProps> = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="link"
        className="text-left mt-5 p-0 w-max"
        onClick={() => setIsOpen(true)}
      >
        Read full supplier&apos;s terms & conditions
      </Button>
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
                <Dialog.Panel
                  className={`terms white-modal w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Terms and conditions
                  </Dialog.Title>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: text,
                    }}
                  />
                  <div className="mt-4">
                    <Button
                      type="button"
                      variant="primary"
                      className="rounded"
                      onClick={() => setIsOpen(false)}
                    >
                      Ok
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

export default TermsAndConditionsModal;

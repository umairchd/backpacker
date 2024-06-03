import { Dialog as HDialog, Transition } from "@headlessui/react";
import { Fragment, useState, FC, useEffect, HTMLProps } from "react";

type DialogProps = {
  title?: string;
  show?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
};

const Dialog: FC<HTMLProps<HTMLDivElement> & DialogProps> = ({ title, show, onOpen, onClose, children }) => {
  const [isOpen, setIsOpen] = useState(show);

  const closeModal = () => {
    setIsOpen(false);
    onClose?.();
  };

  useEffect(() => {
    if (show) {
      setIsOpen(true);
      onOpen?.();
    }
  }, [show]);

  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}
    >
      <HDialog
        as="div"
        className="relative z-50"
        onClose={() => closeModal()}
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
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 w-screen">
            <div className="flex items-center justify-center min-h-full p-2 text-center">
              <HDialog.Panel
                className="w-full max-h-screen md:max-h-80vh max-w-960px
                    text-left align-middle bg-white rounded-lg shadow-xl"
              >
                <div className="grid grid-flow-row gap-4 items-center py-0 px-6 w-full h-20 leading-6 text-black grid-cols-1fr-auto relative">
                  <div className="text-black">
                    <h2 className="p-0 m-0 font-sans text-lg font-bold leading-7 xl:text-3xl sm:text-3xl sm:leading-9">
                      {title}
                    </h2>
                  </div>
                  <div
                    role="button"
                    onClick={() => closeModal()}
                    className="items-center text-3xl cursor-pointer hover:text-orange-600 rounded-[48px] leading-[48px] absolute right-4 top-2 z-10"
                  >
                    &times;
                  </div>
                </div>
                <div className="p-4">{children}</div>
              </HDialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </HDialog>
    </Transition>
  );
};

export default Dialog;

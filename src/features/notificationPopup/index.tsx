import React, { FC, Fragment } from "react";
import Button from "@@/pages/components/Button";
import { Dialog, Transition } from "@headlessui/react";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

interface NotificationPopupProps {
  show: boolean;
  title: string;
  type: "success" | "failure";
  size: "sm" | "lg" | "xl";
  centered: boolean;
  text: string;
  buttonText: string;
  buttonAction: () => void | null;
  closeModal: () => void;
}

const NotificationsPopup: FC<NotificationPopupProps> = ({
  show,
  type = "success",
  size = "sm",
  centered = true,
  title,
  text,
  buttonText = "Ok",
  buttonAction = null,
  closeModal,
}) => (
  <Transition
    appear
    show={show}
    as={Fragment}
  >
    <Dialog
      as="div"
      className="relative z-50"
      onClose={closeModal}
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
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {type === "success" && (
                  <div>
                    <FaCircleCheck className="w-10 h-10 m-auto block fill-fillSuccess" />
                  </div>
                )}
                {type === "failure" && (
                  <div>
                    <FaCircleXmark className="w-10 h-10 m-auto block fill-fillDanger" />
                  </div>
                )}
                {title}
              </Dialog.Title>
              <div className="mt-2">{text}</div>

              <div className="mt-4">
                <Button
                  type="submit"
                  variant="primary"
                  onClick={buttonAction}
                >
                  {buttonText}
                </Button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);

export default NotificationsPopup;

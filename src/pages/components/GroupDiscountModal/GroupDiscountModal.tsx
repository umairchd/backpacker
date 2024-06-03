import React, { FC, Fragment } from "react";
import { FiX } from "react-icons/fi";
import { Dialog, Transition } from "@headlessui/react";

import { usePhoneNumber } from "@@/pages/hooks/usePhoneNumber";

import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import Link from "next/link";
import { IoMailOutline } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";

const GroupDiscountModal: FC<{ name: string; onClose: () => void }> = ({ name, onClose }) => {
  const { siteConfig } = useServerContext();
  const phoneNumber = usePhoneNumber();

  return (
    <Transition
      appear
      show={true}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-40"
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
                <FaUserGroup className="w-10 h-10 text-primary mx-auto" />
                <h4 className="text-2xl font-medium text-center">Group Discounts</h4>
                <p className="text-center mt-3">Got a group? Get a discount 🤑</p>
                <p className="text-center">
                  Get in touch with our team via phone or email and we will get your crew an awesome deal. You&apos;re
                  welcome!
                </p>
                <Link
                  className="bg-primary hover:bg-primary/80 text-base text-white font-medium w-full py-2 flex items-center justify-center gap-6px rounded-lg mt-6"
                  href={`mailto:${siteConfig.contact_mail}?subject=Group Discount Enquiry for ${name}`}
                  id="GroupDiscountEmail"
                >
                  <IoMailOutline className="w-5 h-5" />
                  Email Us
                </Link>
                <Link
                  className="shadow-box py-2 px-4 flex items-center justify-center gap-6px no-underline rounded-lg mt-3 hover:text-primary"
                  href={`tel:${phoneNumber}`}
                  id="GroupDiscountCallUsClick"
                >
                  {`Call ${phoneNumber}`}
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="h-10 w-10 rounded-md hover:bg-gray-100 flex items-center justify-center absolute top-6 right-6"
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

export default GroupDiscountModal;

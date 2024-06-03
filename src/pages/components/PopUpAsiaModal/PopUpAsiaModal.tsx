import React, { FC, useEffect, useState, Fragment } from "react";

import { shouldShowAsiaPopup } from "./utils";
import { getCookie, setCookie } from "cookies-next";
import { useChannelUtil } from "@@/pages/utils/useChannelUtil";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";

import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";
import OptimizedHeroImage from "../HeroImage/OptimizedHeroImage";

const ASIA_POPUP_COOKIE_NAME = "asiaPopUp";

interface PopUpAsiaProps {
  parentRef: React.MutableRefObject<HTMLElement>;
}

const PopUpAsiaModal: FC<PopUpAsiaProps> = ({ parentRef }) => {
  const [showPopup, setShow] = useState(false);
  const { channel } = useServerContext();
  const { isMasterChannel } = useChannelUtil(channel.key);

  const closePopup = () => {
    setShow(false);
    setCookie(ASIA_POPUP_COOKIE_NAME, "minimized", {
      maxAge: 30 * 60 * 60 * 24,
    });
  };

  useEffect(() => {
    if (!getCookie(ASIA_POPUP_COOKIE_NAME) && isMasterChannel() && shouldShowAsiaPopup(window.location.pathname)) {
      setShow(true);
    }
  }, []);

  return (
    <Transition
      appear
      show={showPopup}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-50"
        open={showPopup}
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
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
                <div className="relative">
                  <button
                    type="button"
                    onClick={closePopup}
                    className="w-8 h-8 absolute top-2 right-2 hover:bg-gray-100 rounded-md flex items-center justify-center"
                  >
                    <FiX />
                  </button>
                </div>
                <div className="flex">
                  <div className="w-35%">
                    <OptimizedHeroImage
                      src="https://assets.backpackerdeals.com/uploads/content/asia-popups.jpg"
                      alt="International Travel Frenzy Sale on now!"
                      style={{
                        borderTopLeftRadius: "8px",
                        borderBottomLeftRadius: "8px",
                      }}
                      className="w-full h-full object-cover -mb-2"
                    />
                  </div>

                  <div className="w-65% flex flex-col justify-center p-6">
                    <h2 className="text-2xl leading-30px sm:text-3xl sm:leading-38px mb-2">
                      International Travel Frenzy Sale on Now!
                    </h2>
                    <p className="max-767-text-base text-xl font-medium mb-4">
                      Send us a chat below to claim your exclusive discount 🔥 ✨
                    </p>
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

export default PopUpAsiaModal;

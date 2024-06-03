import React, { FC, useEffect, useState, Fragment } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { postForm } from "./utils";

import { setCookie, getCookie } from "cookies-next";
import { shouldShowAsiaPopup } from "@@/pages/components/PopUpAsiaModal/utils";

import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";
import OptimizedHeroImage from "@@/pages/components/HeroImage/OptimizedHeroImage";

interface IFormInput {
  email: string;
}

interface PopUpProps {
  iterable_key: string;
  parentRef: React.MutableRefObject<HTMLElement>;
}

interface ButtonModalProps {
  isShown: () => void;
  handleDismiss: () => void;
  label: string;
}

interface ModalThankYouProps {
  isShown: boolean;
  handleDismiss: () => void;
  children: React.ReactNode;
}

interface ContentProps {
  title: string;
  shortDesc: string;
  buttonLabel: string;
  afterLabel?: string;
  background: string;
  classHeader: string;
  classMainButton: string;
  classSecondButton: string;
  classIcon: string;
  alt: string;
}

const ButtonModal: FC<ButtonModalProps> = ({ label, isShown, handleDismiss }) => {
  return (
    <div className="bg-black w-fit p-4 text-white">
      <span className="font-black text-lg">{label} </span>
      <button
        className="cursor-pointer underline"
        onClick={isShown}
        tabIndex={0}
      >
        VIEW
      </button>
      <button
        onClick={handleDismiss}
        className="pl-6 font-bold cursor-pointer"
        tabIndex={0}
      >
        X
      </button>
    </div>
  );
};

const ModalThankYou: FC<ModalThankYouProps> = ({ isShown, handleDismiss, children }) => {
  return (
    <Transition
      appear
      show={isShown}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-50"
        open={isShown}
        onClose={handleDismiss}
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
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                {children}
                <div className="px-16 absolute top-32">
                  <h4 className="text-3xl md:text-4xl font-bold mb-4 text-white text-shadow">
                    Thank you for joining our mailing list!
                  </h4>
                  <p className="text-sm md:text-lg text-white text-shadow">
                    Please check your inbox to verify your email and receive your discount!
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const SignUpPopUp: FC<PopUpProps> = ({ iterable_key /* parentRef */ }) => {
  const [show, setShow] = useState(Boolean);
  const [submitted, setSubmitted] = useState(false);
  const [hideButton, setHideButton] = useState(Boolean);
  const [pageContent, setPageContent] = useState(Boolean);
  const [content, setContent] = useState<ContentProps>({
    title: "Get $15 off your next adventure!",
    shortDesc: "Subscribe to our mailing list to be the first to know about our hottest travel deals.",
    buttonLabel: "$15OFF",
    afterLabel: "",
    background: "https://assets.backpackerdeals.com/uploads/content/popup-background.jpg",
    classHeader: "header-image",
    classIcon: "modal-header",
    classMainButton: "mainButton-capitalize",
    classSecondButton: "secondary-button",
    alt: "Sign up now",
  });

  const [shouldPopupEmail, setShouldPopupEmail] = useState(false);

  useEffect(() => {
    if (shouldShowAsiaPopup(window.location.pathname)) {
      setShouldPopupEmail(true);
    } else {
      setShouldPopupEmail(false);
    }
  }, []);

  const popUpForm = (path: string) => {
    const pathName = window.location.pathname.includes(path);

    if (pathName) {
      setPageContent(true);
      setHideButton(false);
      setContent({
        title: "Get $100 off for your next adventure*",
        shortDesc:
          "Experience more, spend less! Add your email below and score $100 to go towards your next tour or activity.",
        buttonLabel: "$100 OFF",
        afterLabel: "*Minimum spend of $1000 applies",
        background: "https://assets.backpackerdeals.com/uploads/content/popup-background-thailand.jpg",
        classHeader: "header-imageThailand",
        classIcon: "modalHeader-whiteIcon",
        classMainButton: "mainButton-capitalize",
        classSecondButton: "secondary-button",
        alt: "Sign up now - Thailand",
      });
      return true;
    } else {
      setHideButton(true);
      setPageContent(false);
      return false;
    }
  };

  useEffect(() => {
    const pathThailand = popUpForm("thailand");

    if (getCookie("signUpForm")) {
      setShow(false);
      if (getCookie("signUpForm") == "dismissed") {
        pathThailand ? setHideButton(true) : setHideButton(false);
      }
    } else {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    setCookie("signUpForm", "minimized", { maxAge: 30 * 60 * 60 * 24 });
  };

  const handleDismiss = () => {
    if (pageContent == true) {
      setHideButton(true);
    } else {
      setHideButton(false);
    }

    setShow(false);
    setCookie("signUpForm", "dismissed");
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const pathThailand = popUpForm("thailand");

    postForm(
      "https://api.iterable.com/api/users/update",
      {
        email: data.email,
        dataFields: {
          signupSource: pathThailand ? "popUpFormThailand" : "popUpForm",
          emailVerified: false,
        },
      },
      iterable_key,
    )
      .then((data) => {
        if (data.code == "Success") {
          setSubmitted(true);
          setCookie("signUpForm", "submitted");
        }
      })
      .catch((error: unknown) => {
        console.error(error);
      });
  };

  const { register, handleSubmit } = useForm<IFormInput>();

  return (
    <>
      {!shouldPopupEmail && (
        <>
          {pageContent
            ? !hideButton && (
                <ButtonModal
                  isShown={() => setShow(true)}
                  handleDismiss={handleDismiss}
                  label={content.buttonLabel}
                />
              )
            : hideButton && (
                <ButtonModal
                  isShown={() => setShow(true)}
                  handleDismiss={handleDismiss}
                  label={content.buttonLabel}
                />
              )}
          <Transition
            appear
            show={show}
            as={Fragment}
          >
            <Dialog
              as="div"
              className="relative z-49"
              open={show}
              onClose={handleClose}
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
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                      {!submitted ? (
                        <>
                          <div className="relative flex items-center justify-center">
                            <OptimizedHeroImage
                              src={content.background}
                              alt={content.alt}
                              className="w-full h-full"
                            />
                            <button
                              type="button"
                              onClick={handleClose}
                              className="absolute top-2 right-2 h-10 w-10 rounded-md flex items-center justify-center outline-none"
                            >
                              <FiX className="w-7 h-7 text-primary" />
                            </button>
                          </div>
                          <div className="px-16 absolute top-32">
                            <h1 className="text-40px font-bold mb-4 text-white text-shadow">{content.title}</h1>
                            <p className="text-white text-shadow">{content.shortDesc}</p>
                            <form onSubmit={handleSubmit(onSubmit)}>
                              <div>
                                <input
                                  {...register("email")}
                                  placeholder="Enter your email"
                                  className="my-2 shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 ring-theme outline-primary placeholder:font-light"
                                  type="email"
                                  required
                                />
                                <div className="flex justify-between mt-6">
                                  <button
                                    className="font-semibold rounded-md capitalize bg-primary text-white px-4 py-6px w-45%"
                                    type="submit"
                                  >
                                    Claim Now
                                  </button>
                                  <button
                                    className="font-semibold rounded-md capitalize bg-gray-200 text-black border border-white px-4 py-6px w-45%"
                                    onClick={handleClose}
                                    type="button"
                                  >
                                    Maybe Later
                                  </button>
                                </div>
                                {pageContent && (
                                  <div className="mt-16">
                                    <span className="text-sm font-medium">{content.afterLabel}</span>
                                  </div>
                                )}
                              </div>
                            </form>
                          </div>
                        </>
                      ) : (
                        <ModalThankYou
                          isShown={show}
                          handleDismiss={handleDismiss}
                        >
                          <div className="relative h-350px signUpPopUp">
                            <OptimizedHeroImage
                              src={content.background}
                              alt={content.alt}
                              className="w-full h-full"
                            />
                            <button
                              type="button"
                              onClick={handleClose}
                              className="absolute top-2 right-2 h-10 w-10 rounded-md flex items-center justify-center outline-none"
                            >
                              <FiX className="w-7 h-7 text-primary" />
                            </button>
                          </div>
                        </ModalThankYou>
                      )}
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      )}
    </>
  );
};

export default SignUpPopUp;

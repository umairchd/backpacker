import React, { Fragment, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "@@/pages/components/Button";
import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";

const ReviewForm = ({ productId }) => {
  const [show, setShow] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validationSchema = Yup.object().shape({
    rating: Yup.number().required("Please select a rating"),
    reviewComment: Yup.string().required("Please write a comment"),
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      rating: 5,
      reviewComment: "",
      name: "",
      email: "",
    },
  });

  const handleShow = () => setShow(true);
  const handleClose = () => {
    reset();
    setShow(false);
  };

  const onSubmit = async (data) => {
    try {
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sku: productId,
          name: data.name,
          email: data.email,
          rating: data.rating,
          review: data.reviewComment,
        }),
      };

      const response = await fetch("https://api.reviews.io/product/review/new?store=backpackerdealscom", options);
      const responseData = await response.json();

      if (responseData.success) {
        setShow(false);
      } else {
        setSubmitError(responseData.message);
      }
    } catch (err) {
      console.error(err);
      setSubmitError("Something went wrong, please try again later!");
    }
  };

  return (
    <div>
      {isSubmitSuccessful && !submitError ? (
        <>Thank you for submitting feedback! It&apos;s under review and will be shared soon.</>
      ) : (
        <div className="mt-5">
          <Button onClick={handleShow}>Write a Review</Button>
          <Transition
            appear
            show={show}
            as={Fragment}
          >
            <Dialog
              as="div"
              className="relative z-40"
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
                <div className="fixed inset-0 bg-black/50" />
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
                    <Dialog.Panel className="relative w-full max-w-3xl transform rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                      <h4 className="text-2xl font-medium p-6">Review this experience</h4>
                      <button
                        type="button"
                        onClick={handleClose}
                        className="h-10 w-10 rounded-md hover:bg-gray-100 flex items-center justify-center outline-none absolute top-6 right-6"
                      >
                        <FiX className="w-7 h-7 text-primary" />
                      </button>
                      <div className="border-t border-gray-200" />
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="p-6"
                      >
                        <div className="my-2 form-group">
                          <label
                            htmlFor="rating"
                            className="text-[#75757A] text-sm font-normal block mb-1"
                          >
                            What would you rate this experience?
                          </label>
                          <Controller
                            name="rating"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange } }) => (
                              <Rating
                                onClick={onChange}
                                initialValue={5}
                                SVGstyle={{ display: "inline", marginBottom: "1rem" }}
                              />
                            )}
                          />
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="reviewComment"
                            className="text-[#75757A] text-sm font-normal block mb-2"
                          >
                            Tell us your feedback about this experience?
                          </label>
                          <textarea
                            name="reviewComment"
                            {...register("reviewComment")}
                            rows={3}
                            placeholder="Enter Review here"
                            className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg flex items-center gap-2 overflow-hidden px-2 py-1 ring-theme outline-primary"
                            aria-invalid={errors.reviewComment ? "true" : "false"}
                          />
                          {errors.reviewComment?.type === "required" && (
                            <span className="text-red-500 text-xs">Please write a comment about your experience</span>
                          )}
                        </div>
                        <div className="my-4 form-group">
                          <label
                            htmlFor="name"
                            className="text-[#75757A] text-sm font-normal block mb-2"
                          >
                            Whats your name?
                          </label>
                          <input
                            {...register("name")}
                            type="name"
                            placeholder="Enter Name"
                            className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 ring-theme outline-primary placeholder:font-light"
                          />
                          {errors.name?.type === "required" && (
                            <span className="text-red-500 text-xs">Name is required</span>
                          )}
                        </div>
                        <div className="my-2 form-group">
                          <label
                            htmlFor="email"
                            className="text-[#75757A] text-sm font-normal block mb-2"
                          >
                            Whats your email?
                          </label>
                          <p
                            style={{ fontSize: "0.8rem" }}
                            className="mb-2"
                          >
                            We need your email address to verify that your review is genuine
                          </p>
                          <input
                            aria-describedby="emailText"
                            {...register("email")}
                            type="email"
                            placeholder="Enter Email"
                            className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 ring-theme outline-primary placeholder:font-light form-control"
                          />
                          {errors.email?.type === "required" && (
                            <span className="text-red-500 text-xs">Email is required</span>
                          )}
                        </div>
                        {submitError && (
                          <div className="relative p-4 mb-4 text-AlertBT rounded-md border border-AlertBBorder bg-AlertBBg">
                            {submitError}
                          </div>
                        )}
                        <div className="flex items-center gap-2 mt-6">
                          <button
                            onClick={handleClose}
                            type="button"
                            className="shadow-box placeholder:font-light rounded-xl sm:h-12 sm:text-base block w-full h-10 px-3 text-xs font-semibold leading-6 text-black transition-all duration-300 ease-in-out outline-none"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="shadow-box placeholder:font-light rounded-xl bg-primary sm:h-12 sm:text-base block w-full h-10 px-3 text-xs font-semibold leading-6 text-white transition-all duration-300 ease-in-out outline-none"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;

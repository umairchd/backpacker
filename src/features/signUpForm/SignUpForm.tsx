import { Fragment, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import OptimizedHeroImage from "@@/pages/components/HeroImage/OptimizedHeroImage";

import useTracking from "@@/pages/lib/useTracking";
import { useCampervanHooks } from "@@/pages/sites/[site]/[theme]/next/campervan-hire/hooks";
import Button from "@@/pages/components/Button";
import { useChannelUtil } from "@@/pages/utils/useChannelUtil";

import { TextField, Autocomplete, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IFormInput } from "./types";
import { useCountryList } from "./hooks";

const CountrySelect = styled(Autocomplete)(() => ({
  "& .MuiAutocomplete-inputRoot": {
    paddingTop: 5,
    "@media (max-width: 640px)": {
      paddingTop: 3,
    },
  },
  ".MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  ".MuiOutlinedInput-root": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ".MuiAutocomplete-endAdornment": {
    top: 10,

    "@media (max-width: 640px)": {
      top: 8,
    },
  },
}));

const SignUpForm = () => {
  const { isCampervanHire } = useCampervanHooks();
  const { countries, loading, open, setOpen } = useCountryList();
  const { channel, siteConfig } = useServerContext();
  const { name } = channel ?? {};
  const { isYhaChannel } = useChannelUtil(channel.key);
  const { iterable_key } = siteConfig ?? {};
  const { register, handleSubmit } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const { track } = useTracking();

  async function postForm(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-Key": iterable_key,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const formData = {
      email: data.email,
      dataFields: {
        firstName: data.firstName,
        locationCountry: data.locationCountry,
        signupSource: "footerForm",
        emailVerified: false,
      },
    };
    postForm("https://api.iterable.com/api/users/update", formData)
      .then((data) => data.code == "Success" && setSubmitted(true))
      .then(() => {
        document.cookie = "signUpForm=submitted;expires=Fri, 31 Dec 9999 23:59:59 GMT";
        track({
          event: "HomePageEmailFormSubmit",
        });
      })
      .catch((error: unknown) => {
        console.error(error);
      });
  };

  if (isCampervanHire || isYhaChannel()) {
    return null;
  }

  return (
    <div className="bg-center sm:py-10 py-6 bg-cover relative overflow-hidden flex justify-center text-white min-h-250px">
      <div className="sm:bg-black/40 bg-black/70 absolute inset-0 z-10 w-full h-full" />
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <OptimizedHeroImage
          className="w-full h-full object-cover"
          src="https://assets.backpackerdeals.com/uploads/content/footer-banner.jpg"
          alt="Sign up now"
        />
      </div>
      {!submitted ? (
        <div className="max-w-1320px px-3 sm:px-6 mx-auto w-full z-10 flex flex-col">
          <h2 className="sm:text-3xl text-xl font-medium text-center">
            Join {name} and get $15 off your next adventure!
          </h2>
          <p className="sm:text-sm sm:mb-10 mt-3 mb-3 text-10px font-light text-center">
            Join our mailing list to be the first to know about the hottest travel experience campaigns, deals and
            inspiration.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full mx-auto"
          >
            <div className="md:grid-cols-4 sm:grid-cols-2 sm:gap-4 grid grid-cols-1 gap-3">
              <div className="form-group">
                <input
                  {...register("firstName")}
                  required
                  className="shadow-box focus:ring-2 ring-primary placeholder:font-light rounded-xl sm:h-12 sm:text-base block w-full h-10 px-3 text-xs font-normal leading-6 text-black transition-all duration-300 ease-in-out bg-white outline-none"
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div className="form-group">
                <input
                  {...register("email")}
                  required
                  className="shadow-box focus:ring-2 ring-primary placeholder:font-light rounded-xl sm:h-12 sm:text-base block w-full h-10 px-3 text-xs font-normal leading-6 text-black transition-all duration-300 ease-in-out bg-white outline-none"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <CountrySelect
                  id="country-of-residence"
                  open={open}
                  onOpen={() => {
                    setOpen(true);
                  }}
                  onClose={() => {
                    setOpen(false);
                  }}
                  isOptionEqualToValue={(country: { country: string }, value: { country: string }) =>
                    country.country === value.country
                  }
                  getOptionLabel={(country: { country: string }) => country.country}
                  options={countries}
                  loading={loading}
                  style={{
                    border: 0,
                    padding: 0,
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="shadow-box placeholder:font-light rounded-xl sm:h-12 sm:text-base block w-full h-10 px-3 text-xs font-normal leading-6 text-black transition-all duration-300 ease-in-out bg-white outline-none"
                      required
                      placeholder="Country of Residence"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <Fragment>
                            {loading && (
                              <CircularProgress
                                color="inherit"
                                size={20}
                              />
                            )}
                            {params.InputProps.endAdornment}
                          </Fragment>
                        ),
                      }}
                    />
                  )}
                />
              </div>
              <div className="form-group">
                <Button
                  type="submit"
                  className="shadow-box placeholder:font-light rounded-xl bg-primary sm:h-12 sm:text-base block w-full h-10 px-3 text-xs font-semibold leading-6 text-white transition-all duration-300 ease-in-out outline-none"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </form>
          <p className="mt-4 text-center text-10px font-light">
            By subscribing you agree to our{" "}
            <a
              className="text-primary hover:underline hover:text-white"
              href="/terms-and-conditions"
            >
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a
              className="text-primary hover:underline hover:text-white"
              href="/privacy-policy"
            >
              Privacy Policy
            </a>
            .<br /> Minimum spend of AUD $150 applies.
          </p>
        </div>
      ) : (
        <div className="container relative z-10 flex flex-col justify-center px-5 space-y-2 text-center">
          <h4 className="text-primary text-4xl text-center">Thank you for joining {channel.name}!</h4>
          <p className="text-sm font-light text-center">
            Please check your inbox to verify your email and receive your discount code!
          </p>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;

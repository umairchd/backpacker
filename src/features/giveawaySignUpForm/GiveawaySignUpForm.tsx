import { FC, useEffect, useState } from "react";
import { FIELDS, GiveawaySingUpFormDatas, GiveawaySingUpFormProps } from "./types";
import { postIterableEventTrack } from "@@/pages/utils/iterableEventTrack";
import { URL_MILLION_DOLLAR_TRAVELLER, formDatas } from "./utils/utils";
import { useGiveawaySignUpLocalstorage } from "./hooks/useGiveawaySignUpLocalstorage";
import { useCountryDialCode } from "@@/pages/hooks/useCountryDialCode";
import { useGiveawayForm } from "./hooks/useGiveawayForm";
import CountryCodeSelect from "@@/pages/components/CountryCodeSelect/CountryCodeSelect";
import { defaultValueForm } from "@@/pages/utils/defaultValueForm";
import Button from "@@/pages/components/Button";

const GiveawaySignUpForm: FC<GiveawaySingUpFormProps> = ({ iterableKey }) => {
  const { countryDialCode, isoCountryCode } = useCountryDialCode(defaultValueForm[FIELDS.COUNTRY_CODE]);
  const { setSignUpCompetition } = useGiveawaySignUpLocalstorage();

  const defaultValues: GiveawaySingUpFormDatas = {
    ...defaultValueForm,
    [FIELDS.COUNTRY_CODE]: countryDialCode,
  };

  const [valueForm, setValueForm] = useState<GiveawaySingUpFormDatas>(defaultValues);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useGiveawayForm(defaultValues);

  const isSubmited = isSubmitSuccessful || isSubmitting;

  const onSubmit = handleSubmit(async (data: GiveawaySingUpFormDatas) => {
    const formData = formDatas(data, "competitionEntry");

    try {
      const postIterableEventTrackData = await postIterableEventTrack(formData, iterableKey);

      if (postIterableEventTrackData.code == "Success") {
        setSignUpCompetition(true);
        window.location.href = `${URL_MILLION_DOLLAR_TRAVELLER}/thank-you`;
      }
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    setValue(FIELDS.COUNTRY_CODE, countryDialCode);
    setValueForm({
      ...valueForm,
      [FIELDS.COUNTRY_CODE]: countryDialCode,
    });
  }, [setValue, countryDialCode]);

  useEffect(() => {
    setSignUpCompetition(false);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (valueForm[FIELDS.EMAIL] && !isSubmited) {
        const dataFields = formDatas(valueForm, "competitionUpdate");
        postIterableEventTrack(dataFields, iterableKey)
          .then((data) => {
            if (data.code === "Success") {
              if (valueForm[FIELDS.EMAIL]) {
                setSignUpCompetition(false);
              }
            }
          })
          .catch((error: unknown) => {
            console.error(error);
          });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isSubmited, iterableKey, setSignUpCompetition, valueForm]);

  return (
    <div className={`white-card shadow-sm`}>
      <h2 id="included">Enter the competition</h2>
      <div className="991px:px-20">
        <form className="">
          <div className="max-w-1320px px-3 sm:px-6 mx-auto">
            <div className="px-3">
              <div className="form-group">
                <label
                  htmlFor="email"
                  className="required"
                >
                  Email address
                </label>
                <input
                  type="email"
                  {...register(FIELDS.EMAIL)}
                  placeholder="jane@adventures.com"
                  onBlur={(e) => {
                    setValueForm({
                      ...valueForm,
                      [FIELDS.EMAIL]: e.target.value,
                    });
                  }}
                />
                {errors[FIELDS.EMAIL] && <span className="text-darkRed3">{errors[FIELDS.EMAIL]?.message}</span>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:justify-start">
              <div>
                <div className="form-group">
                  <label
                    htmlFor="firstName"
                    className="required"
                  >
                    First name
                  </label>
                  <input
                    {...register(FIELDS.FIRST_NAME)}
                    onBlur={(e) => {
                      setValueForm({
                        ...valueForm,
                        [FIELDS.FIRST_NAME]: e.target.value,
                      });
                    }}
                  />
                  {errors[FIELDS.FIRST_NAME] && (
                    <span className="text-red-500 text-xs">{errors[FIELDS.FIRST_NAME]?.message}</span>
                  )}
                </div>
              </div>
              <div>
                <div className="form-group">
                  <label
                    htmlFor="lastName"
                    className="required"
                  >
                    Last name
                  </label>
                  <input
                    {...register(FIELDS.LAST_NAME)}
                    onBlur={(e) => {
                      setValueForm({
                        ...valueForm,
                        [FIELDS.LAST_NAME]: e.target.value,
                      });
                    }}
                  />
                  {errors[FIELDS.LAST_NAME] && (
                    <span className="text-red-500 text-xs">{errors[FIELDS.LAST_NAME]?.message}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6 sm:justify-start">
              <div className="col-span-5 lg:col-span-3">
                <CountryCodeSelect
                  register={register}
                  fieldsDialCode={FIELDS.COUNTRY_CODE}
                  label="Country code"
                  dialCode={countryDialCode}
                  isoCode={isoCountryCode}
                  defaultFields={defaultValueForm[FIELDS.COUNTRY_CODE]}
                  onBlur={(e) => {
                    setValueForm({
                      ...valueForm,
                      [FIELDS.COUNTRY_CODE]: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="col-span-7 lg:col-span-9">
                <div className="form-group">
                  <label
                    htmlFor="contactNumber"
                    className="required"
                  >
                    Phone number
                  </label>
                  <input
                    {...register(FIELDS.CONTACT_NUMBER)}
                    onBlur={(e) => {
                      setValueForm({
                        ...valueForm,
                        [FIELDS.CONTACT_NUMBER]: e.target.value,
                      });
                    }}
                  />
                  {errors[FIELDS.CONTACT_NUMBER] && (
                    <span className="text-red-500 text-xs">{errors[FIELDS.CONTACT_NUMBER]?.message}</span>
                  )}
                </div>
              </div>
            </div>
            <div className={`mt-4 grid grid-cols-12 gap-6`}>
              <div className="col-span-12 lg:col-span-3">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmited}
                  className="h-auto py-4 px-6 text-xl max-992-py-08rem max-992-px-4 max-992-text-base"
                  onClick={onSubmit}
                >
                  {isSubmited ? <div className="spinner"></div> : "Submit"}
                </Button>
              </div>
            </div>
            <div className="px-3 mt-1 mb-4 text-13px max-768-my-2">
              <span>
                By submitting this form, you are joining our mailing list. By subscribing, you agree to our{" "}
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noreferrer"
                  className="underline font-medium"
                >
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noreferrer"
                  className="underline font-medium"
                >
                  Privacy Policy
                </a>
                . You can opt out at any time.
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GiveawaySignUpForm;

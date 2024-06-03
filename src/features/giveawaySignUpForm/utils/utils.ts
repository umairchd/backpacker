import { FIELDS, GiveawaySingUpFormDatas } from "../types";

export const formDatas = (
  dataField: GiveawaySingUpFormDatas,
  eventName: string
) => {
  return {
    user: {
      email: dataField[FIELDS.EMAIL],
      dataFields: {
        signupSource: eventName,
        emailVerified: false,
      },
    },
    event: {
      email: dataField[FIELDS.EMAIL],
      eventName: eventName,
      dataFields: {
        firstName: dataField[FIELDS.FIRST_NAME],
        lastName: dataField[FIELDS.LAST_NAME],
        countryCode: dataField[FIELDS.COUNTRY_CODE],
        contactNumber: dataField[FIELDS.CONTACT_NUMBER],
      },
    },
  };
};

export const URL_MILLION_DOLLAR_TRAVELLER =
  "/travello-million-dollar-traveller";

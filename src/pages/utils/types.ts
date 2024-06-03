export enum FIELDS {
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  EMAIL = "email",
  COUNTRY_CODE = "countryCode",
  CONTACT_NUMBER = "contactNumber",
  ENQUIRY_TYPE = "enquiryType",
  PRODUCT_NAME = "productName",
  DESCRIPTION = "description",
  TOUR_DATE = "tourDate",
  INVOICE_NUMBER = "invoiceNumber",
  CANCELLED_BY = "cancelledBy",
  REFUND_OPTION = "refundOption",
}

export interface DefaultValueForm {
  [FIELDS.FIRST_NAME]: string;
  [FIELDS.LAST_NAME]: string;
  [FIELDS.EMAIL]: string;
  [FIELDS.COUNTRY_CODE]: string;
  [FIELDS.CONTACT_NUMBER]: string;
  [FIELDS.ENQUIRY_TYPE]?: string;
  [FIELDS.PRODUCT_NAME]?: string;
  [FIELDS.DESCRIPTION]?: string;
  [FIELDS.TOUR_DATE]?: Date;
  [FIELDS.INVOICE_NUMBER]?: string;
  [FIELDS.CANCELLED_BY]?: string;
  [FIELDS.REFUND_OPTION]?: string;
}

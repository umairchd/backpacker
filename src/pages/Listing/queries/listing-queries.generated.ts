import * as Types from '../../../types.generated';

import { gql } from '@apollo/client';
import { DestinationHeaderFragmentDoc } from '../../Destination/queries/destination-page-queries.generated';
import { CountryCardFragmentDoc, CityCardFragmentDoc, CategoryCardFragmentDoc } from '../../components/queries/queries.generated';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** country code */
  CountryCode: any;
  /** An RFC-3339 compliant Full Date Scalar */
  Date: any;
  /** An RFC-3339 compliant DateTime Scalar */
  DateTime: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** gender */
  Gender: any;
  /** Long type */
  Long: any;
};

export type AddOn = {
  ageMax?: InputMaybe<Scalars['Int']>;
  ageMin?: InputMaybe<Scalars['Int']>;
  ageQualified?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  otherCharges?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<PriceAddOn>;
  specialNotes?: InputMaybe<Scalars['String']>;
  unitsAvailable?: InputMaybe<Scalars['Int']>;
  unitsLinkedToParent?: InputMaybe<Scalars['Boolean']>;
  unitsMax?: InputMaybe<Scalars['Int']>;
  unitsMin?: InputMaybe<Scalars['Int']>;
  unitsMultipleOf?: InputMaybe<Scalars['Int']>;
  uuid?: InputMaybe<Uuid>;
};

export type AddOnPayload = {
  ageMax?: Maybe<Scalars['Int']>;
  ageMin?: Maybe<Scalars['Int']>;
  ageQualified?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  otherCharges?: Maybe<Scalars['String']>;
  price?: Maybe<PriceAddOnPayload>;
  specialNotes?: Maybe<Scalars['String']>;
  unitsAvailable?: Maybe<Scalars['Int']>;
  unitsLinkedToParent?: Maybe<Scalars['Boolean']>;
  unitsMax?: Maybe<Scalars['Int']>;
  unitsMin?: Maybe<Scalars['Int']>;
  unitsMultipleOf?: Maybe<Scalars['Int']>;
  uuid?: Maybe<UuidPayload>;
};

export type AddOnSelection = {
  hint?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Int']>;
  uuid?: InputMaybe<Scalars['String']>;
};

export type AddOnSelectionPayload = {
  hint?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type AdvertisedDeparture = {
  amount: Scalars['String'];
  currency: Scalars['String'];
  departure: ProductAdminServiceDeparture;
  previousAmount: Scalars['String'];
  promotion: ProductAdminServicePromotion;
  room?: Maybe<Scalars['String']>;
  rooms?: Maybe<Array<Room>>;
};

export type Answer = {
  hint?: InputMaybe<Scalars['String']>;
  questionUuid?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type AnswerPayload = {
  hint?: Maybe<Scalars['String']>;
  questionUuid?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type Answers = {
  answers?: InputMaybe<Array<InputMaybe<Answer>>>;
};

export type AnswersPayload = {
  answers?: Maybe<Array<Maybe<AnswerPayload>>>;
};

export type AttributeKeyValuePair = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AutoQualityInput = {
  allowedError?: InputMaybe<Scalars['Float']>;
  maxFileOther?: InputMaybe<Scalars['Float']>;
  maxFileSize?: InputMaybe<Scalars['Int']>;
  maxQuality?: InputMaybe<Scalars['Int']>;
  method?: InputMaybe<ImgOptimazeType>;
  minQuality?: InputMaybe<Scalars['Int']>;
};

export type AvailabilityAndPricingSummaryPayload = {
  nextAvailableDate: NextAvailableDatePayload;
  priceFrom: PriceFromPayload;
  productId: Scalars['String'];
  resSystemType?: Maybe<ResSystemType>;
  variantSummaries?: Maybe<Array<AvailabilityAndPricingSummaryPayload>>;
  zoneOffset: Scalars['String'];
};

export enum AvailabilityCacheConfigType {
  DailyLong = 'DAILY_LONG',
  DailyShort = 'DAILY_SHORT',
  Weekly = 'WEEKLY'
}

export type AvailabilityCacheConfigurationInput = {
  cacheTtl: Scalars['Long'];
  productId: Scalars['String'];
  resSystemType: ResSystemType;
};

export type AvailabilityCacheConfigurationPayload = {
  cacheTtl: Scalars['Long'];
  id: Scalars['Int'];
  productId: Scalars['String'];
  resSystemType: ResSystemType;
};

export type AvailabilityDataFilter = {
  endDate: Scalars['DateTime'];
  ignoreCache?: Scalars['Boolean'];
  parentProductId?: InputMaybe<Scalars['String']>;
  perApiRequestDelay?: InputMaybe<Scalars['Long']>;
  productId: Scalars['String'];
  showHiddenFares?: Scalars['Boolean'];
  startDate: Scalars['DateTime'];
};

/** Availability models */
export type AvailabilityDataPayload = {
  resProviderExecutionTime?: Maybe<Scalars['Int']>;
  resSystemType: ResSystemType;
  slots?: Maybe<Array<AvailabilitySlot>>;
};

export type AvailabilityFare = {
  availableCount?: Maybe<Scalars['Int']>;
  bpdFareType?: Maybe<Scalars['String']>;
  isHidden: Scalars['Boolean'];
  levyLabel?: Maybe<Scalars['String']>;
  maxQuantity?: Maybe<Scalars['Int']>;
  minQuantity?: Maybe<Scalars['Int']>;
  price: FarePrice;
  resSystemBookingId: Scalars['String'];
  resSystemFareTypeId: Scalars['String'];
  seatUsed?: Maybe<Scalars['Int']>;
};

/**  Availability fare price filters  */
export type AvailabilityFarePriceFilter = {
  resSystemFareTypeId?: InputMaybe<Scalars['String']>;
};

export type AvailabilityFarePriceInput = {
  availabilitySlotKey?: InputMaybe<Scalars['String']>;
  commission?: InputMaybe<Scalars['Float']>;
  discountRulePrice?: InputMaybe<Scalars['Float']>;
  fareDiscountPrice?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['Int']>;
  maxQuantityOfFareType: Scalars['Int'];
  minQuantityOfFareType: Scalars['Int'];
  netPrice?: InputMaybe<Scalars['Float']>;
  productId?: InputMaybe<Scalars['String']>;
  recommendedRetailPrice?: InputMaybe<Scalars['Float']>;
  resSystemFareTypeId?: InputMaybe<Scalars['String']>;
  seatUsedOfFareType: Scalars['Int'];
  totalNumberOfSeatsAvailable?: InputMaybe<Scalars['Int']>;
  totalPrice?: InputMaybe<Scalars['Float']>;
  totalSaving?: InputMaybe<Scalars['Float']>;
};

export type AvailabilityFarePricePayload = {
  availabilitySlotKey?: Maybe<Scalars['String']>;
  commission?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  discountRulePrice?: Maybe<Scalars['Float']>;
  fareDiscountPrice?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Int']>;
  netPrice?: Maybe<Scalars['Float']>;
  productId?: Maybe<Scalars['String']>;
  recommendedRetailPrice?: Maybe<Scalars['Float']>;
  resSystemFareTypeId?: Maybe<Scalars['String']>;
  totalPrice?: Maybe<Scalars['Float']>;
  totalSaving?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type AvailabilityMoney = {
  adjustedMoney?: Maybe<Money>;
  money: Money;
};

export type AvailabilitySlot = {
  availabilitySlotKey?: Maybe<Scalars['String']>;
  availableCount?: Maybe<Scalars['Int']>;
  endTime?: Maybe<Scalars['DateTime']>;
  endTimeLocal?: Maybe<Scalars['String']>;
  fares: Array<AvailabilityFare>;
  hasAvailableSlots?: Maybe<Scalars['Boolean']>;
  isLastMinute?: Maybe<Scalars['Boolean']>;
  isOperating?: Maybe<Scalars['Boolean']>;
  maxQuantity?: Maybe<Scalars['Int']>;
  minQuantity?: Maybe<Scalars['Int']>;
  pickupDropOffs?: Maybe<Array<Maybe<PickupDropOffPayload>>>;
  startTime?: Maybe<Scalars['DateTime']>;
  startTimeLocal?: Maybe<Scalars['String']>;
  status?: Maybe<AvailabilitySlotStatusEnum>;
  totalCount?: Maybe<Scalars['Int']>;
};

export enum AvailabilitySlotStatusEnum {
  Available = 'AVAILABLE',
  SoldOut = 'SOLD_OUT',
  Unavailable = 'UNAVAILABLE'
}

export type AvailableDate = {
  /** @deprecated this property comes from old system and should no longer be source of truth */
  date: Scalars['DateTime'];
  /** @deprecated this property comes from old system and should no longer be source of truth */
  hasAvailableSlots: Scalars['Boolean'];
  /** @deprecated this property comes from old system and should no longer be source of truth */
  isOperating: Scalars['Boolean'];
  /** @deprecated this property comes from old system and should no longer be source of truth */
  maximumUnitOrder?: Maybe<Scalars['Int']>;
  /** @deprecated this property comes from old system and should no longer be source of truth */
  minimumUnitOrder?: Maybe<Scalars['Int']>;
  /** @deprecated this property comes from old system and should no longer be source of truth */
  slots: Array<Slot>;
};

export type Bpd_Afterpay = {
  enabled?: Maybe<Scalars['Boolean']>;
  merchant_id?: Maybe<Scalars['String']>;
  order_maximum?: Maybe<Scalars['Float']>;
  order_minimum?: Maybe<Scalars['Float']>;
  region?: Maybe<Scalars['String']>;
};

export type Bpd_Banner = {
  delayMs?: Maybe<Scalars['Int']>;
  heading?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  images: Array<Image>;
  link?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export enum Bpd_BannerType {
  Deal = 'DEAL',
  Home = 'HOME',
  Listing = 'LISTING'
}

export type Bpd_Blog = {
  posts: Array<Bpd_BlogPost>;
  url?: Maybe<Scalars['String']>;
};

export type Bpd_BlogPost = {
  categories: Array<Scalars['String']>;
  featuredImage?: Maybe<Image>;
  id: Scalars['ID'];
  link?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Bpd_BookingExtraFieldInput = {
  formKey: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type Bpd_BookingExtraFieldOutput = {
  formKey: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type Bpd_BookingFieldValues = {
  extraFields?: Maybe<Bpd_ExtraFieldValues>;
  pickupLocation?: Maybe<Scalars['String']>;
};

export type Bpd_BookingFields = {
  extraFields: Bpd_ExtraFields;
  pickupLocations: Array<Maybe<Bpd_PickupLocation>>;
};

export type Bpd_BookingRequestInput = {
  adultQuantity: Scalars['Int'];
  childQuantity?: InputMaybe<Scalars['Int']>;
  date?: InputMaybe<Scalars['String']>;
  familyQuantity?: InputMaybe<Scalars['Int']>;
  prices: Bpd_BookingRequestPricesInput;
};

export type Bpd_BookingRequestPricesInput = {
  adultPrice: Scalars['Float'];
  childPrice?: InputMaybe<Scalars['Float']>;
  familyPrice?: InputMaybe<Scalars['Float']>;
};

export type Bpd_Category = Bpd_CategoryLike & {
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Image>;
  name: Scalars['String'];
  productCount?: Maybe<Scalars['Int']>;
  uniqueName: Scalars['String'];
  uri: Bpd_Uri;
};

export type Bpd_CategoryLike = {
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Image>;
  name: Scalars['String'];
  productCount?: Maybe<Scalars['Int']>;
  uniqueName: Scalars['String'];
  uri: Bpd_Uri;
};

export type Bpd_Channel = {
  banners: Array<Bpd_Banner>;
  /** @deprecated use Query.productStatistics */
  categories: Array<Bpd_Category>;
  /** @deprecated use Query.productStatistics */
  countries: Array<Bpd_Country>;
  features: Array<Scalars['String']>;
  googlePayMerchantId: Scalars['String'];
  id: Scalars['ID'];
  key: Scalars['String'];
  name: Scalars['String'];
  paymentProviders: Array<Scalars['String']>;
  siteConfig: Bpd_SiteConfig;
  supportedCurrencies: Array<Bpd_Currency>;
  theme: Scalars['String'];
  url: Scalars['String'];
};


export type Bpd_ChannelBannersArgs = {
  type?: InputMaybe<Bpd_BannerType>;
};

export type Bpd_ChannelFilter = {
  hosts?: InputMaybe<Array<Scalars['String']>>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
};

export type Bpd_ChannelSimple = {
  name: Scalars['String'];
  url: Scalars['String'];
};

export type Bpd_City = Bpd_CategoryLike & {
  country: Bpd_Country;
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Image>;
  name: Scalars['String'];
  productCount?: Maybe<Scalars['Int']>;
  uniqueName: Scalars['String'];
  uri: Bpd_Uri;
};

export type Bpd_ClientInfo = {
  cityName?: Maybe<Scalars['String']>;
  clientIP?: Maybe<Scalars['String']>;
  coordinate?: Maybe<Coordinate>;
  countryName?: Maybe<Scalars['String']>;
  currencyCode?: Maybe<Scalars['String']>;
  host: Scalars['String'];
  isoCountryCode?: Maybe<Scalars['String']>;
  subdivisionName?: Maybe<Scalars['String']>;
  timeZone?: Maybe<Scalars['String']>;
};

export type Bpd_Contact = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type Bpd_ContactBookingDataInput = {
  contactName: Scalars['String'];
  contactNumber: Scalars['String'];
  couponCode?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  extraFields?: InputMaybe<Array<InputMaybe<Bpd_BookingExtraFieldInput>>>;
  participants: Array<Bpd_ContactBookingDataParticipantInput>;
  pickupID?: InputMaybe<Scalars['String']>;
  specialInstructionMessage?: InputMaybe<Scalars['String']>;
};

export type Bpd_ContactBookingDataOutput = {
  contactName?: Maybe<Scalars['String']>;
  contactNumber?: Maybe<Scalars['String']>;
  couponCode?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  extraFields?: Maybe<Array<Maybe<Bpd_BookingExtraFieldOutput>>>;
  participants?: Maybe<Array<Bpd_ContactBookingDataParticipantOutput>>;
  pickupID?: Maybe<Scalars['String']>;
  specialInstructionMessage?: Maybe<Scalars['String']>;
};

export type Bpd_ContactBookingDataParticipantInput = {
  extraFields?: InputMaybe<Array<InputMaybe<Bpd_BookingExtraFieldInput>>>;
  fareType: Bpd_FareTypeInput;
  name: Scalars['String'];
};

export type Bpd_ContactBookingDataParticipantOutput = {
  extraFields?: Maybe<Array<Maybe<Bpd_BookingExtraFieldOutput>>>;
  fareType: Scalars['String'];
  name: Scalars['String'];
};

export type Bpd_Country = Bpd_CategoryLike & {
  cities: Array<Bpd_City>;
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Image>;
  name: Scalars['String'];
  productCount?: Maybe<Scalars['Int']>;
  uniqueName: Scalars['String'];
  uri: Bpd_Uri;
};

export type Bpd_CreateBookingInput = {
  availabilitySlotId: Scalars['String'];
  bookingData: Bpd_ContactBookingDataInput;
  bookingRequest: Bpd_BookingRequestInput;
  countryCode: Scalars['String'];
  deviceData: Scalars['String'];
  nonce: Scalars['String'];
  orderID: Scalars['String'];
  productSlug: Scalars['String'];
  zipCode?: InputMaybe<Scalars['String']>;
};

export type Bpd_CreateWishlistInput = {
  date: Scalars['DateTime'];
  email: Scalars['String'];
  host: Scalars['String'];
  productId: Scalars['String'];
};

export type Bpd_CreateWishlistOutput = {
  message?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
};

export type Bpd_CreatedBookingOutput = {
  message: Scalars['String'];
  token?: Maybe<Scalars['String']>;
  voucherUrl?: Maybe<Scalars['String']>;
};

export type Bpd_Currency = {
  id: Scalars['ID'];
  isoSymbol: Scalars['String'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  uniRate: Scalars['Float'];
};

export enum Bpd_DealRibbon {
  Deal = 'DEAL',
  Featured = 'FEATURED',
  LastMinute = 'LAST_MINUTE',
  Top = 'TOP'
}

export type Bpd_DisplayPrice = {
  adultPrice?: Maybe<Bpd_Price>;
  childPrice?: Maybe<Bpd_Price>;
  familyPrice?: Maybe<Bpd_Price>;
};

export type Bpd_ExternalUri = {
  url?: Maybe<Scalars['String']>;
};

export type Bpd_ExtraField = {
  fieldOptions?: Maybe<Array<Maybe<Bpd_ExtraFieldOption>>>;
  fieldType: Scalars['String'];
  formKey: Scalars['String'];
  id: Scalars['Int'];
  isPublished?: Maybe<Scalars['Boolean']>;
  isRequired?: Maybe<Scalars['Boolean']>;
  label: Scalars['String'];
  position?: Maybe<Scalars['Int']>;
};

export type Bpd_ExtraFieldOption = {
  label: Scalars['String'];
  value: Scalars['String'];
};

export type Bpd_ExtraFieldPerBookingValues = {
  formKey: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type Bpd_ExtraFieldPerParticipantValues = {
  formKey: Scalars['String'];
  participantIndex: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type Bpd_ExtraFieldValues = {
  perBooking?: Maybe<Array<Maybe<Bpd_ExtraFieldPerBookingValues>>>;
  perParticipant?: Maybe<Array<Maybe<Bpd_ExtraFieldPerParticipantValues>>>;
};

export type Bpd_ExtraFields = {
  perBooking?: Maybe<Array<Maybe<Bpd_ExtraField>>>;
  perParticipant?: Maybe<Array<Maybe<Bpd_ExtraField>>>;
};

export type Bpd_FareTypeBookingId = {
  bpdFareType: Bpd_FareTypeInput;
  resSystemBookingId: Scalars['String'];
};

export enum Bpd_FareTypeInput {
  Adult = 'ADULT',
  Child = 'CHILD',
  Family = 'FAMILY'
}

export type Bpd_GenerateBraintreeClientTokenInput = {
  bookingRequest: Bpd_OpenDatedBookingRequestInput;
  channelHost: Scalars['String'];
  generateBraintreeToken?: InputMaybe<Scalars['Boolean']>;
  orderID?: InputMaybe<Scalars['String']>;
  productSlug: Scalars['String'];
};

export type Bpd_GeneratedBraintreeClientTokenOutput = {
  levy?: Maybe<Bpd_LevyOutput>;
  levyString?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  orderID: Scalars['String'];
  request: Bpd_GiftOrderRequestOutput;
  token?: Maybe<Scalars['String']>;
};

export type Bpd_GiftOrderRequestOutput = {
  adultQuantity?: Maybe<Scalars['Int']>;
  childQuantity?: Maybe<Scalars['Int']>;
  familyQuantity?: Maybe<Scalars['Int']>;
  orderSum: Money;
  prices: Bpd_PricesOutput;
};

export type Bpd_HomeLocalDeals = {
  products: Array<Product>;
  seeAllRelativeUrl: Scalars['String'];
  title?: Maybe<Scalars['String']>;
};

export type Bpd_Homepage_Ribbon = {
  banner_background_color?: Maybe<Scalars['String']>;
  banner_background_secondary_color?: Maybe<Scalars['String']>;
  banner_heading?: Maybe<Scalars['String']>;
  banner_text?: Maybe<Scalars['String']>;
  banner_url?: Maybe<Scalars['String']>;
};

export type Bpd_IntRange = {
  from: Scalars['Int'];
  to: Scalars['Int'];
};

export type Bpd_LandingPage = {
  header?: Maybe<Scalars['String']>;
  image?: Maybe<Image>;
  image_alt?: Maybe<Scalars['String']>;
  image_description?: Maybe<Scalars['String']>;
  image_title?: Maybe<Scalars['String']>;
  subheader?: Maybe<Scalars['String']>;
  teaser?: Maybe<Scalars['String']>;
};

export type Bpd_LevyOutput = {
  adult?: Maybe<Money>;
  child?: Maybe<Money>;
  family?: Maybe<Money>;
};

export type Bpd_ListFilter = {
  categories?: Maybe<Array<Bpd_Category>>;
  city?: Maybe<Bpd_City>;
  country?: Maybe<Bpd_Country>;
  last_minute?: Maybe<Scalars['Boolean']>;
  top_deal?: Maybe<Scalars['Boolean']>;
};

export type Bpd_ListPage = Bpd_Page & {
  category?: Maybe<Bpd_Category>;
  channel: Bpd_Channel;
  city?: Maybe<Bpd_City>;
  country?: Maybe<Bpd_Country>;
  hideBreadcrumbs?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  landingPage?: Maybe<Bpd_LandingPage>;
  landingPageFooter?: Maybe<Bpd_LandingPage>;
  /** @deprecated use productsStatistics query */
  listFilter?: Maybe<Bpd_ListFilter>;
  /** @deprecated use products query */
  popularProducts: Array<Product>;
  products: Array<Product>;
  ratingScore?: Maybe<Scalars['Float']>;
  /** @deprecated use productsStatistics query */
  relatedCategories?: Maybe<Array<Bpd_Category>>;
  /** @deprecated use productsStatistics query */
  relatedCities?: Maybe<Array<Bpd_City>>;
  /** @deprecated use productsStatistics query */
  relatedCountries?: Maybe<Array<Bpd_Country>>;
  template: Scalars['String'];
  totalReviews?: Maybe<Scalars['Int']>;
};

export type Bpd_MenuItem = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  uri: Bpd_MenuItemUri;
};

export type Bpd_MenuItemUri = Bpd_ExternalUri | Bpd_Uri;

export type Bpd_NonPage = Bpd_Page & {
  channel: Bpd_Channel;
  id: Scalars['ID'];
  template: Scalars['String'];
};

export type Bpd_OpenDatedBookingRequestInput = {
  adultQuantity: Scalars['Int'];
  childQuantity?: InputMaybe<Scalars['Int']>;
  familyQuantity?: InputMaybe<Scalars['Int']>;
};

export type Bpd_Order = {
  bookingData?: Maybe<Bpd_ContactBookingDataOutput>;
  bookingRequest: Bpd_ValidBookingDataRequestOutput;
  channel: Bpd_ChannelSimple;
  grandTotal?: Maybe<Money>;
  isGift?: Maybe<Scalars['Boolean']>;
  orderID: Scalars['String'];
  payment?: Maybe<Bpd_PaymentOutput>;
  product: Product;
  slot: Bpd_ValidBookingDataSlotOutput;
};

export type Bpd_OtherSearch = {
  categories: Array<Bpd_Category>;
  cities: Array<Bpd_City>;
  countries: Array<Bpd_Country>;
};

export type Bpd_Page = {
  channel: Bpd_Channel;
  id: Scalars['ID'];
  template: Scalars['String'];
};

export type Bpd_Participants = {
  adult?: Maybe<Array<Maybe<Scalars['String']>>>;
  child?: Maybe<Array<Maybe<Scalars['String']>>>;
  family?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Bpd_Partner = {
  company_logo?: Maybe<Image>;
  name: Scalars['String'];
};

export type Bpd_PaymentOptions = {
  afterpay?: Maybe<Bpd_Afterpay>;
  braintree?: Maybe<Scalars['Boolean']>;
  laybuy?: Maybe<Scalars['Boolean']>;
};

export type Bpd_PaymentOutput = {
  countryCode?: Maybe<Scalars['String']>;
  method?: Maybe<Scalars['String']>;
  methodType?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
};

export type Bpd_PickupLocation = {
  id: Scalars['String'];
  label: Scalars['String'];
  productStartTime?: Maybe<Scalars['String']>;
};

export type Bpd_Price = {
  price?: Maybe<Money>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Money>;
};

export type Bpd_PricesOutput = {
  adultPrice: Scalars['Float'];
  childPrice?: Maybe<Scalars['Float']>;
  familyPrice?: Maybe<Scalars['Float']>;
};

export type Bpd_ProductFilter = {
  categoryIds?: InputMaybe<Array<Scalars['Int']>>;
  cityIds?: InputMaybe<Array<Scalars['Int']>>;
  countryIds?: InputMaybe<Array<Scalars['Int']>>;
  lastMinute?: InputMaybe<Scalars['Boolean']>;
  priceRange?: InputMaybe<Bpd_IntRange>;
  topDeal?: InputMaybe<Scalars['Boolean']>;
  tourLength?: InputMaybe<Bpd_IntRange>;
};

export type Bpd_ProductPage = Bpd_Page & {
  channel: Bpd_Channel;
  id: Scalars['ID'];
  paymentOptions: Bpd_PaymentOptions;
  product: Product;
  /** @deprecated use products query */
  relatedProducts: Array<Product>;
  template: Scalars['String'];
};

export type Bpd_Redirect = {
  newUrl: Scalars['String'];
  status: Scalars['Int'];
};

export type Bpd_RegionPage = Bpd_Page & {
  channel: Bpd_Channel;
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  menu?: Maybe<Array<Bpd_MenuItem>>;
  template: Scalars['String'];
  title?: Maybe<Scalars['String']>;
};

export type Bpd_SeoData = {
  amp_url?: Maybe<Scalars['String']>;
  author_title?: Maybe<Scalars['String']>;
  canonical_host?: Maybe<Scalars['String']>;
  canonical_url?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  language?: Maybe<Scalars['String']>;
  noindex?: Maybe<Scalars['Boolean']>;
  openGraphImage?: Maybe<Image>;
  openGraph_description?: Maybe<Scalars['String']>;
  openGraph_image?: Maybe<Scalars['String']>;
  openGraph_image_raw?: Maybe<Scalars['String']>;
  openGraph_site_name?: Maybe<Scalars['String']>;
  openGraph_title?: Maybe<Scalars['String']>;
  openGraph_type?: Maybe<Scalars['String']>;
  openGraph_url?: Maybe<Scalars['String']>;
  rss_title?: Maybe<Scalars['String']>;
  rss_xml?: Maybe<Scalars['String']>;
  seoConfig_description?: Maybe<Scalars['String']>;
  seoConfig_keywords?: Maybe<Scalars['String']>;
  seoConfig_schema?: Maybe<Scalars['String']>;
  seoConfig_title?: Maybe<Scalars['String']>;
  twitterCardImage?: Maybe<Image>;
  twitterCard_card?: Maybe<Scalars['String']>;
  twitterCard_description?: Maybe<Scalars['String']>;
  twitterCard_image?: Maybe<Scalars['String']>;
  twitterCard_image_raw?: Maybe<Scalars['String']>;
  twitterCard_site?: Maybe<Scalars['String']>;
  twitterCard_title?: Maybe<Scalars['String']>;
};

export type Bpd_SiteConfig = {
  bannerIconImage?: Maybe<Image>;
  banner_background_color?: Maybe<Scalars['String']>;
  banner_background_secondary_color?: Maybe<Scalars['String']>;
  banner_heading?: Maybe<Scalars['String']>;
  banner_icon?: Maybe<Scalars['String']>;
  banner_text?: Maybe<Scalars['String']>;
  banner_url?: Maybe<Scalars['String']>;
  contact_address?: Maybe<Scalars['String']>;
  contact_company_id?: Maybe<Scalars['String']>;
  contact_facebook_url?: Maybe<Scalars['String']>;
  contact_links_mail?: Maybe<Scalars['String']>;
  contact_links_phone?: Maybe<Scalars['String']>;
  contact_mail?: Maybe<Scalars['String']>;
  contact_phone_default?: Maybe<Scalars['String']>;
  contact_phone_us?: Maybe<Scalars['String']>;
  contact_phones?: Maybe<Scalars['String']>;
  contact_physical_address?: Maybe<Scalars['String']>;
  contact_physical_phone?: Maybe<Scalars['String']>;
  favicon?: Maybe<Scalars['String']>;
  faviconImage?: Maybe<Image>;
  footer_copyright?: Maybe<Scalars['String']>;
  footer_right_info_box?: Maybe<Scalars['String']>;
  footer_social_links?: Maybe<Scalars['String']>;
  homeImage?: Maybe<Image>;
  home_featured_button_prefix?: Maybe<Scalars['String']>;
  home_featured_subtitle?: Maybe<Scalars['String']>;
  home_featured_title?: Maybe<Scalars['String']>;
  home_header?: Maybe<Scalars['String']>;
  home_image?: Maybe<Scalars['String']>;
  home_last_minute?: Maybe<Scalars['Boolean']>;
  home_partners?: Maybe<Scalars['String']>;
  home_schema?: Maybe<Scalars['String']>;
  home_search_placeholder?: Maybe<Scalars['String']>;
  home_subheader?: Maybe<Scalars['String']>;
  homepage_content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  is_banner_active?: Maybe<Scalars['Boolean']>;
  is_homepage_content_active?: Maybe<Scalars['Boolean']>;
  iterable_key?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  logoImage?: Maybe<Image>;
  promo_title_1?: Maybe<Scalars['String']>;
  promo_title_2?: Maybe<Scalars['String']>;
  promo_title_3?: Maybe<Scalars['String']>;
  promo_title_4?: Maybe<Scalars['String']>;
  promo_title_5?: Maybe<Scalars['String']>;
  tracking_google_tag_manager?: Maybe<Scalars['String']>;
};

export type Bpd_StaticPage = Bpd_Page & {
  channel: Bpd_Channel;
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  menu?: Maybe<Array<Bpd_MenuItem>>;
  subTemplate?: Maybe<Scalars['String']>;
  template: Scalars['String'];
  title?: Maybe<Scalars['String']>;
};

export type Bpd_UpdateContactInformationInput = {
  bookingData: Bpd_ContactBookingDataInput;
  bookingRequest: Bpd_BookingRequestInput;
  orderID: Scalars['String'];
};

export type Bpd_UpdatedContactInformationOutput = {
  message: Scalars['String'];
};

export type Bpd_Uri = {
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type Bpd_UserOrder = {
  bookingTime?: Maybe<Scalars['DateTime']>;
  couponCode?: Maybe<Scalars['String']>;
  invoiceDate?: Maybe<Scalars['String']>;
  invoiceNumber?: Maybe<Scalars['String']>;
  invoiceUrl?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  totalAmount?: Maybe<Money>;
  voucherUrl?: Maybe<Scalars['String']>;
};

export type Bpd_UserOrders = {
  edges?: Maybe<Array<Maybe<Bpd_UserOrder>>>;
  limitOffsetPageInfo?: Maybe<LimitOffsetPageInfo>;
};

export type Bpd_ValidBookingDataOutput = {
  orderID: Scalars['String'];
  product: Product;
  request: Bpd_ValidBookingDataRequestOutput;
  slot: Bpd_ValidBookingDataSlotOutput;
  token?: Maybe<Scalars['String']>;
};

export type Bpd_ValidBookingDataRequestOutput = {
  adultQuantity?: Maybe<Scalars['Int']>;
  childQuantity?: Maybe<Scalars['Int']>;
  date?: Maybe<Scalars['String']>;
  discount?: Maybe<Money>;
  discountSum?: Maybe<Money>;
  familyQuantity?: Maybe<Scalars['Int']>;
  sum?: Maybe<Money>;
};

export type Bpd_ValidBookingDataSlotOutput = {
  date?: Maybe<Scalars['String']>;
  doubleAdultPrice?: Maybe<Money>;
  doubleChildPrice?: Maybe<Money>;
  doubleFamilyPrice?: Maybe<Money>;
  endTime?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  orderedAvailabilitySlotId?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
};

export type Bpd_ValidBookingOutput = {
  data?: Maybe<Bpd_ValidBookingDataOutput>;
  message: Scalars['String'];
};

export type Bpd_ValidCouponDataCouponOutput = {
  balance: Scalars['Float'];
  discount: Scalars['Float'];
  name: Scalars['String'];
};

export type Bpd_ValidCouponDataOutput = {
  coupon: Bpd_ValidCouponDataCouponOutput;
};

export type Bpd_ValidCouponOutput = {
  data: Bpd_ValidCouponDataOutput;
  message: Scalars['String'];
};

export type Bpd_ValidateBookingInput = {
  availabilitySlotId: Scalars['String'];
  bookingRequest: Bpd_BookingRequestInput;
  channelHost: Scalars['String'];
  deviceInfo?: InputMaybe<Scalars['String']>;
  fareTypeBookingIds: Array<InputMaybe<Bpd_FareTypeBookingId>>;
  generateBraintreeToken?: InputMaybe<Scalars['Boolean']>;
  isBuyAsAGift?: InputMaybe<Scalars['Boolean']>;
  isGroupOrder?: InputMaybe<Scalars['Boolean']>;
  orderID?: InputMaybe<Scalars['String']>;
  productSlug: Scalars['String'];
};

export type Bpd_ValidateCouponInput = {
  adultQuantity: Scalars['Int'];
  childQuantity?: InputMaybe<Scalars['Int']>;
  couponCode: Scalars['String'];
  email?: InputMaybe<Scalars['String']>;
  familyQuantity?: InputMaybe<Scalars['Int']>;
  orderID: Scalars['String'];
  productSlug: Scalars['String'];
};

export type BarcodeDetails = {
  barcodeData?: InputMaybe<Scalars['String']>;
  barcodeRaw?: InputMaybe<Scalars['String']>;
  barcodeRequired?: InputMaybe<Scalars['Boolean']>;
  format?: InputMaybe<Scalars['String']>;
  instructions?: InputMaybe<Scalars['String']>;
};

export type BarcodeDetailsPayload = {
  barcodeData?: Maybe<Scalars['String']>;
  barcodeRaw?: Maybe<Scalars['String']>;
  barcodeRequired?: Maybe<Scalars['Boolean']>;
  format?: Maybe<Scalars['String']>;
  instructions?: Maybe<Scalars['String']>;
};

export type BaseVariant = {
  addOns?: InputMaybe<Array<InputMaybe<AddOn>>>;
  available?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  specialNotes?: InputMaybe<Scalars['String']>;
  timeSlots?: InputMaybe<Array<InputMaybe<Timeslot>>>;
};

export type BaseVariantPayload = {
  addOns?: Maybe<Array<Maybe<AddOnPayload>>>;
  available?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  specialNotes?: Maybe<Scalars['String']>;
  timeSlots?: Maybe<Array<Maybe<TimeslotPayload>>>;
};

export type BillingInfo = {
  billingCurrency?: InputMaybe<Scalars['String']>;
  billingExchangeRate?: InputMaybe<Scalars['String']>;
  forexSurchargePerc?: InputMaybe<Scalars['String']>;
};

export type BillingInfoPayload = {
  billingCurrency?: Maybe<Scalars['String']>;
  billingExchangeRate?: Maybe<Scalars['String']>;
  forexSurchargePerc?: Maybe<Scalars['String']>;
};

export type Booking = {
  billingInfo?: InputMaybe<BillingInfo>;
  cancellationPolicy?: InputMaybe<CancellationPolicy>;
  cancellations?: InputMaybe<Array<InputMaybe<Cancellation>>>;
  clientReference?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  externalResources?: InputMaybe<ExternalResources>;
  firstName: Scalars['String'];
  flowId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  invoice?: InputMaybe<Invoice>;
  lastName: Scalars['String'];
  livnReference?: InputMaybe<Scalars['String']>;
  partyEmailAddress?: InputMaybe<Scalars['String']>;
  partyName?: InputMaybe<Scalars['String']>;
  passThroughReference?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
  supplierReference?: InputMaybe<Scalars['String']>;
  tickets?: InputMaybe<Array<InputMaybe<Ticket>>>;
};

export enum BookingAnswerLevel {
  Booking = 'BOOKING',
  Participant = 'PARTICIPANT'
}

export type BookingCompany = {
  id: Scalars['String'];
  name: Scalars['String'];
};

export type BookingConfirmationResponse = {
  url?: Maybe<Scalars['String']>;
};

/** ## Booking Search End ### */
export type BookingContactDetailsPayload = {
  contactInfo?: Maybe<BookingContactInfoPayload>;
  customerLocation?: Maybe<BookingCustomerLocationPayload>;
  extra?: Maybe<BookingExtraInfoPayload>;
  participantDetails?: Maybe<Array<Maybe<BookingParticipantDetailsPayload>>>;
  pickup?: Maybe<BookingPickupPayload>;
};

export type BookingContactInfoInput = {
  customBookingFields?: Array<CustomBookingFieldAnswerInput>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
};

export type BookingContactInfoPayload = {
  customBookingFields: Array<CustomBookingFieldAnswerPayload>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
};

export type BookingCouponFilterCriteria = {
  name?: InputMaybe<Scalars['String']>;
};

export type BookingCustomerLocationInput = {
  customerCity?: InputMaybe<Scalars['String']>;
  customerCountry?: InputMaybe<Scalars['String']>;
  customerLocation?: InputMaybe<Scalars['String']>;
  ipAddress: Scalars['String'];
};

export type BookingCustomerLocationPayload = {
  customerCity?: Maybe<Scalars['String']>;
  customerCountry?: Maybe<Scalars['String']>;
  customerLocation?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  ipAddress: Scalars['String'];
};

/** ## BOOKING ### */
export type BookingDataInput = {
  availabilitySlotKey: Scalars['String'];
  bookingReferrals: BookingReferralsInput;
  bookingType?: InputMaybe<BookingType>;
  departureDate: Scalars['DateTime'];
  discountType: DiscountType;
  fareTypesToBook: Array<FareTypeToBookInput>;
  giftDetails?: InputMaybe<GiftBookingInput>;
  openDatedDetails?: InputMaybe<OpenDatedBookingInput>;
  productId: Scalars['String'];
};

export type BookingDataPayload = {
  availabilitySlotKey?: Maybe<Scalars['String']>;
  /** @deprecated replaced by bookingUid */
  bookingId: Scalars['Int'];
  bookingStatus: BookingStatus;
  bookingType?: Maybe<BookingType>;
  bookingUid: Scalars['String'];
  departureDate: Scalars['DateTime'];
  expirationDate?: Maybe<Scalars['DateTime']>;
  participantDetails?: Maybe<Array<Maybe<BookingParticipantDetailsPayload>>>;
  productId: Scalars['String'];
  userId: Scalars['ID'];
};

export type BookingDetails = {
  cancellationPolicy?: InputMaybe<CancellationPolicy>;
  clientReference?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  livnReference?: InputMaybe<Scalars['String']>;
  partyEmailAddress?: InputMaybe<Scalars['String']>;
  partyName?: InputMaybe<Scalars['String']>;
  passThroughReference?: InputMaybe<Scalars['String']>;
  supplierReference?: InputMaybe<Scalars['String']>;
};

export type BookingDetailsPayload = {
  cancellationPolicy?: Maybe<CancellationPolicyPayload>;
  clientReference?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  livnReference?: Maybe<Scalars['String']>;
  partyEmailAddress?: Maybe<Scalars['String']>;
  partyName?: Maybe<Scalars['String']>;
  passThroughReference?: Maybe<Scalars['String']>;
  supplierReference?: Maybe<Scalars['String']>;
};

export type BookingError = {
  customerErrorMessage?: InputMaybe<Scalars['String']>;
  goBackToRetry?: InputMaybe<Scalars['Boolean']>;
  internalErrorMessage?: InputMaybe<Scalars['String']>;
  terminateTransaction?: InputMaybe<Scalars['Boolean']>;
};

export type BookingErrorPayload = {
  customerErrorMessage?: Maybe<Scalars['String']>;
  goBackToRetry?: Maybe<Scalars['Boolean']>;
  internalErrorMessage?: Maybe<Scalars['String']>;
  terminateTransaction?: Maybe<Scalars['Boolean']>;
};

export enum BookingExceptionType {
  BookingApiError = 'BOOKING_API_ERROR'
}

export type BookingExtraInfoPayload = {
  message?: Maybe<Scalars['String']>;
};

export type BookingFilterCriteria = {
  bookingStatus?: InputMaybe<BookingStatus>;
  createdAt?: InputMaybe<DateRangeFilterCriteria>;
  expirationDate?: InputMaybe<DateRangeFilterCriteria>;
  orderNumber?: InputMaybe<Scalars['String']>;
  productId?: InputMaybe<Scalars['String']>;
};

export type BookingInternalNoteInput = {
  id?: InputMaybe<Scalars['Int']>;
  noteText: Scalars['String'];
};

export type BookingInternalNotePayload = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  noteText: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  userId: Scalars['ID'];
};

export type BookingParticipant = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  resSystemFareTypeId?: InputMaybe<Scalars['String']>;
};

export type BookingParticipantDetailsInput = {
  customBookingFields?: Array<CustomBookingFieldAnswerInput>;
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  lastName?: InputMaybe<Scalars['String']>;
};

export type BookingParticipantDetailsPayload = {
  bookingFareTypeId: Scalars['Int'];
  bookingFareTypeName: Scalars['String'];
  customBookingFields: Array<CustomBookingFieldAnswerPayload>;
  /** @deprecated replaced by booking related bookingFareTypeId */
  fareTypeId: Scalars['Int'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  lastName?: Maybe<Scalars['String']>;
};

export type BookingPayload = {
  billingInfo?: Maybe<BillingInfoPayload>;
  cancellationPolicy?: Maybe<CancellationPolicyPayload>;
  cancellations?: Maybe<Array<Maybe<ChannelCancellationPolicyPayload>>>;
  clientReference?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['DateTime']>;
  externalResources?: Maybe<ExternalResourcesPayload>;
  flowId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  invoice?: Maybe<InvoicePayload>;
  livnReference?: Maybe<Scalars['String']>;
  partyEmailAddress?: Maybe<Scalars['String']>;
  partyName?: Maybe<Scalars['String']>;
  passThroughReference?: Maybe<Scalars['String']>;
  supplierReference?: Maybe<Scalars['String']>;
  tickets?: Maybe<Array<Maybe<TicketPayload>>>;
};

export type BookingPaymentPayload = {
  currency?: Maybe<Scalars['String']>;
  paymentPrice?: Maybe<Scalars['Float']>;
  paymentProviderOrderId?: Maybe<Scalars['String']>;
  paymentType?: Maybe<Scalars['String']>;
};

export enum BookingPaymentStatus {
  Created = 'CREATED',
  Processed = 'PROCESSED'
}

export enum BookingPaymentType {
  CreditCard = 'CREDIT_CARD'
}

export type BookingPickupInput = {
  additionalNotes?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  pickupId?: InputMaybe<Scalars['String']>;
};

export type BookingPickupPayload = {
  additionalNotes?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  pickupId?: Maybe<Scalars['String']>;
};

export type BookingPricingPayload = {
  commission: Scalars['Float'];
  currency: Scalars['String'];
  discount?: Maybe<Scalars['Float']>;
  discountType?: Maybe<DiscountType>;
  fareTypesToBook: Array<FareTypeToBookPayload>;
  id?: Maybe<Scalars['Int']>;
  promocode?: Maybe<BookingPricingPromocodePayload>;
  recommendedRetailPrice: Scalars['Float'];
  totalOrderPrice: Scalars['Float'];
};

export type BookingPricingPromocodePayload = {
  discountAmount: Scalars['Float'];
  name: Scalars['String'];
};

export type BookingPrimaryContact = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  resSystemFareTypeId?: InputMaybe<Scalars['String']>;
};

export type BookingPromocodeErrorPayload = {
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type BookingPromocodePayload = BookingPromocodeErrorPayload | BookingPromocodeSuccessPayload;

export type BookingPromocodeSuccessPayload = {
  promocodeName?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type BookingReferrals = {
  affiliateType?: Maybe<Scalars['String']>;
  channelId: Scalars['String'];
  merchantId: Scalars['String'];
  promotionName?: Maybe<Scalars['String']>;
};

export type BookingReferralsFilterCriteria = {
  channelId?: InputMaybe<Scalars['String']>;
  merchantId?: InputMaybe<Scalars['String']>;
};

export type BookingReferralsInput = {
  affiliateType?: InputMaybe<Scalars['String']>;
  channelId: Scalars['String'];
  merchantId: Scalars['String'];
  promotionName?: InputMaybe<Scalars['String']>;
};

export type BookingReferralsPayload = {
  affiliateProgramType?: Maybe<Scalars['String']>;
  channelId?: Maybe<Scalars['String']>;
  channelName?: Maybe<Scalars['String']>;
  merchantId?: Maybe<Scalars['String']>;
};

/** Booking for Fareharbor, Ibis, Respax, Rezdy */
export type BookingRequest = {
  bookingType?: InputMaybe<BookingType>;
  itemsToBook?: InputMaybe<Array<InputMaybe<ItemsToBook>>>;
  participants?: InputMaybe<Array<InputMaybe<BookingParticipant>>>;
  payment?: InputMaybe<Payment>;
  primaryContact?: InputMaybe<BookingPrimaryContact>;
  productId?: InputMaybe<Scalars['String']>;
  slotInfo?: InputMaybe<BookingSlotInfo>;
  travelloBookingData?: InputMaybe<TravelloBookingData>;
};

/** General */
export enum BookingResSystemType {
  Amstar = 'AMSTAR',
  Bokun = 'BOKUN',
  Bpd = 'BPD',
  Fareharbor = 'FAREHARBOR',
  FareharborMarketplace = 'FAREHARBOR_MARKETPLACE',
  Ibis = 'IBIS',
  Livn = 'LIVN',
  LivnDirect = 'LIVN_DIRECT',
  Peek = 'PEEK',
  Respax = 'RESPAX',
  Rezdy = 'REZDY',
  Rtbs = 'RTBS',
  Undefined = 'UNDEFINED'
}

export type BookingResponse = {
  bookingId?: Maybe<Scalars['String']>;
  isBookable?: Maybe<Scalars['Boolean']>;
  resSystemType?: Maybe<BookingResSystemType>;
};

export type BookingSearchContactInfoPayload = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type BookingSearchCouponPayload = {
  amount?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
};

export type BookingSearchCustomerLocationPayload = {
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  ipAddress?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
};

export type BookingSearchExtraInfoPayload = {
  notes?: Maybe<Scalars['String']>;
};

export type BookingSearchFareTypePayload = {
  numberOfSeats: Scalars['Int'];
  price: FareTypePricePayload;
  resSystemFareTypeId: Scalars['String'];
};

export type BookingSearchInternalNotePayload = {
  createdAt: Scalars['DateTime'];
  createdBy: Scalars['Int'];
  text: Scalars['String'];
};

export type BookingSearchOrderPayload = {
  orderDate?: Maybe<Scalars['Date']>;
};

export type BookingSearchPricingPayload = {
  commission?: Maybe<Scalars['Float']>;
  discount?: Maybe<Scalars['Float']>;
  orderTotal?: Maybe<Scalars['Float']>;
  rrp?: Maybe<Scalars['Float']>;
};

export type BookingSearchProductDataPayload = {
  optionName?: Maybe<Scalars['String']>;
  productName?: Maybe<Scalars['String']>;
};

export type BookingSearchProductPayload = {
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  mainCategory?: Maybe<Scalars['String']>;
  partnerName?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type BookingSearchResProviderPayload = {
  resProviderId?: Maybe<Scalars['String']>;
};

export type BookingSearchVoucherPayload = {
  code?: Maybe<Scalars['String']>;
};

export type BookingSlotInfo = {
  availabilityKey?: InputMaybe<Scalars['String']>;
  departureDate?: InputMaybe<Scalars['DateTime']>;
  departureDateLocal?: InputMaybe<Scalars['String']>;
  departureDateOffset?: InputMaybe<Scalars['Int']>;
  productId?: InputMaybe<Scalars['String']>;
};

export enum BookingStatus {
  AuthorizePaymentFailed = 'AUTHORIZE_PAYMENT_FAILED',
  Completed = 'COMPLETED',
  Created = 'CREATED',
  CreateBookingFailed = 'CREATE_BOOKING_FAILED',
  Failed = 'FAILED',
  FinishBookingFailed = 'FINISH_BOOKING_FAILED',
  PromocodeRedemptionFailed = 'PROMOCODE_REDEMPTION_FAILED',
  QuoteBookingFailed = 'QUOTE_BOOKING_FAILED',
  SettlePaymentFailed = 'SETTLE_PAYMENT_FAILED',
  UnknownError = 'UNKNOWN_ERROR',
  VoucherUsed = 'VOUCHER_USED'
}

export enum BookingType {
  BuyAsAGift = 'BUY_AS_A_GIFT',
  OpenDated = 'OPEN_DATED',
  Regular = 'REGULAR'
}

export enum BpdFareType {
  Adult = 'ADULT',
  Child = 'CHILD',
  Family = 'FAMILY',
  Undefined = 'UNDEFINED'
}

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export enum CacheJobStatus {
  Started = 'STARTED'
}

export type Cancellation = {
  booking?: InputMaybe<Booking>;
  confirmed?: InputMaybe<Scalars['DateTime']>;
  created?: InputMaybe<Scalars['DateTime']>;
  error?: InputMaybe<BookingError>;
  failed?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  modified?: InputMaybe<Scalars['DateTime']>;
  price?: InputMaybe<PriceCancellationCost>;
  reason?: InputMaybe<Scalars['String']>;
  supplierReference?: InputMaybe<Scalars['String']>;
};

export type CancellationPolicy = {
  rules?: InputMaybe<Array<InputMaybe<CancellationPolicyRule>>>;
  setAtTimeOfBooking?: InputMaybe<Scalars['Boolean']>;
  text?: InputMaybe<Scalars['String']>;
};

export type CancellationPolicyPayload = {
  rules?: Maybe<Array<Maybe<CancellationPolicyRulePayload>>>;
  setAtTimeOfBooking?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
};

export type CancellationPolicyRule = {
  after?: InputMaybe<Scalars['DateTime']>;
  cancellationCostAmount?: InputMaybe<PriceCancellationCostAmount>;
  cancellationCostPerc?: InputMaybe<Scalars['String']>;
  cancellationPossible?: InputMaybe<Scalars['Boolean']>;
};

export type CancellationPolicyRulePayload = {
  after?: Maybe<Scalars['DateTime']>;
  cancellationCostAmount?: Maybe<PriceCancellationCostAmountPayload>;
  cancellationCostPerc?: Maybe<Scalars['String']>;
  cancellationPossible?: Maybe<Scalars['Boolean']>;
};

export type Catalogue = {
  id?: InputMaybe<Scalars['Int']>;
  modified?: InputMaybe<Scalars['DateTime']>;
  name?: InputMaybe<Scalars['String']>;
};

export type CataloguePayload = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type Category = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type CategoryDataInput = {
  additionalCategoryUniqueNames?: InputMaybe<Array<Scalars['String']>>;
  mainCategoryUniqueName?: InputMaybe<Scalars['String']>;
};

export type CategoryPayload = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type CategoryType = {
  href: Scalars['String'];
  id: Scalars['String'];
  label: Scalars['String'];
};

export type Channel = {
  billingCurrency?: InputMaybe<Scalars['String']>;
  cancellationPolicy?: InputMaybe<ChannelCancellationPolicy>;
  created?: InputMaybe<Scalars['DateTime']>;
  directConnect?: InputMaybe<Scalars['Boolean']>;
  forexSurchargePerc?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  modified?: InputMaybe<Scalars['DateTime']>;
};

export type ChannelCancellationPolicy = {
  rules?: InputMaybe<Array<InputMaybe<ChannelCancellationPolicyRule>>>;
  text?: InputMaybe<Scalars['String']>;
};

export type ChannelCancellationPolicyPayload = {
  rules?: Maybe<Array<Maybe<ChannelCancellationPolicyRulePayload>>>;
  text?: Maybe<Scalars['String']>;
};

export type ChannelCancellationPolicyRule = {
  cancellationCostAmount?: InputMaybe<PriceCancellationCostAmount>;
  cancellationCostPerc?: InputMaybe<Scalars['String']>;
  cancellationPossible?: InputMaybe<Scalars['Boolean']>;
  hoursToDeparture?: InputMaybe<Scalars['Int']>;
};

export type ChannelCancellationPolicyRulePayload = {
  cancellationCostAmount?: Maybe<PriceCancellationCostAmountPayload>;
  cancellationCostPerc?: Maybe<Scalars['String']>;
  cancellationPossible?: Maybe<Scalars['Boolean']>;
  hoursToDeparture?: Maybe<Scalars['Int']>;
};

export type ChannelPayload = {
  billingCurrency?: Maybe<Scalars['String']>;
  cancellationPolicy?: Maybe<ChannelCancellationPolicyPayload>;
  created?: Maybe<Scalars['DateTime']>;
  directConnect?: Maybe<Scalars['Boolean']>;
  forexSurchargePerc?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  modified?: Maybe<Scalars['DateTime']>;
};

export type City = {
  href: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type CityDataInput = {
  additionalCityUniqueNames?: InputMaybe<Array<Scalars['String']>>;
  mainCityUniqueName?: InputMaybe<Scalars['String']>;
};

export type ClientFilterCriteria = {
  affiliateType?: InputMaybe<Scalars['String']>;
  channel?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  ip?: InputMaybe<Scalars['String']>;
  merchant?: InputMaybe<Scalars['String']>;
  promotionName?: InputMaybe<Scalars['String']>;
};

export enum CommissionDiscountType {
  Percentage = 'PERCENTAGE',
  Voucher = 'VOUCHER'
}

export type Company = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  businessNumber?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  created?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  modified?: InputMaybe<Scalars['DateTime']>;
  name?: InputMaybe<Scalars['String']>;
  nameCompany?: InputMaybe<Scalars['String']>;
  nameTradingAs?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  postcode?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  tz?: InputMaybe<Scalars['String']>;
};

export type Coordinate = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Country = {
  href: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type CustomBookingFieldAnswerInput = {
  answerValue: Scalars['String'];
  customBookingFieldId: Scalars['Int'];
};

export type CustomBookingFieldAnswerPayload = {
  answerValue: Scalars['String'];
  customBookingFieldId: Scalars['Int'];
};

/** ## Custom Booking Types ### */
export enum CustomBookingFieldType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  Map = 'MAP',
  Number = 'NUMBER',
  Phone = 'PHONE',
  String = 'STRING'
}

export type CustomBookingFieldsFilter = {
  productId: Scalars['ID'];
};

export type CustomBookingFieldsInput = {
  fieldType: CustomBookingFieldType;
  fieldTypeDataForeignId?: InputMaybe<Scalars['Int']>;
  isRequiredByProvider?: InputMaybe<Scalars['Boolean']>;
  label?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  originalLabel?: InputMaybe<Scalars['String']>;
  placeholder?: InputMaybe<Scalars['String']>;
  publishedLevel: VisibilityLevel;
  requiredLevel: VisibilityLevel;
  resSystemFieldId: Scalars['String'];
};

export type CustomBookingFieldsPayload = {
  fieldType: CustomBookingFieldType;
  fieldTypeDataForeignId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  isRequiredByProvider?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  originalLabel?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  productId: Scalars['ID'];
  publishedLevel: VisibilityLevel;
  requiredLevel: VisibilityLevel;
  resSystemFieldId: Scalars['String'];
};

export type CustomerSearchCriteria = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type DateRange = {
  end: Scalars['DateTime'];
  start: Scalars['DateTime'];
};

export type DateRangeFilterCriteria = {
  from?: InputMaybe<Scalars['Date']>;
  to?: InputMaybe<Scalars['Date']>;
};

export type DateRangeInput = {
  end: Scalars['DateTime'];
  start: Scalars['DateTime'];
};

export type DeleteAvailabilityCacheConfigurationPayload = {
  id: Scalars['Int'];
};

export type DeleteDiscountRulePayload = {
  /**  Database ID of deleted object */
  id?: Maybe<Scalars['Int']>;
};

export type DeleteMapBookingFieldTypeConfigurationPayload = {
  /**  Database ID of deleted object */
  id: Array<Scalars['Int']>;
};

export type DeleteMapBookingFieldTypeGroupPayload = {
  /**  Database ID of deleted object */
  id: Array<Scalars['Int']>;
};

export type DepartureAvailability = {
  female: Scalars['String'];
  male: Scalars['String'];
  status: Scalars['String'];
  total: Scalars['Int'];
};

/** Livn models */
export type DepartureSelection = {
  endDate?: InputMaybe<Scalars['String']>;
  productId?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['String']>;
};

export type Detail = {
  body: Scalars['String'];
  detailType: DetailType;
};

export type DetailType = {
  id: Scalars['String'];
  label: Scalars['String'];
};

export type DiscountRuleFilter = {
  bpdId?: InputMaybe<Scalars['Int']>;
  productId: Scalars['ID'];
};

/** Discount related models */
export type DiscountRuleInput = {
  blackoutDates?: InputMaybe<Array<DateRangeInput>>;
  /**  used for DB-sync only to ensure one-to-one mapping between BPD record and new DiscountRule record */
  bpdId?: InputMaybe<Scalars['Int']>;
  dayOfWeekDisabled?: InputMaybe<Scalars['Int']>;
  discountRate: Scalars['Int'];
  isApproved?: InputMaybe<Scalars['Boolean']>;
  numberOfSeats?: InputMaybe<Scalars['Int']>;
  startTimeOffset: Scalars['Int'];
  travelDate?: InputMaybe<DateRangeInput>;
  valid?: InputMaybe<DateRangeInput>;
};

export type DiscountRulePayload = {
  blackoutDates?: Maybe<Array<DateRange>>;
  /**  used for DB-sync only to ensure one-to-one mapping between BPD record and new DiscountRule record */
  bpdId?: Maybe<Scalars['Int']>;
  dayOfWeekDisabled?: Maybe<Scalars['Int']>;
  discountRate: Scalars['Int'];
  /**  Database ID */
  id: Scalars['Int'];
  isActive: Scalars['Boolean'];
  isApproved: Scalars['Boolean'];
  numberOfSeats?: Maybe<Scalars['Int']>;
  /**  Unique product identifier (UUID) */
  productId: Scalars['ID'];
  startTimeOffset: Scalars['Int'];
  travelDate?: Maybe<DateRange>;
  validFrom?: Maybe<Scalars['DateTime']>;
  validUntil?: Maybe<Scalars['DateTime']>;
};

export enum DiscountType {
  Lmd = 'LMD',
  /** LAST MINUTE DEAL */
  None = 'NONE'
}

export type DiscountsConfigurationUpdateInput = {
  commissionType: CommissionDiscountType;
  fareDiscounts: Array<FareDiscountValuesInput>;
  productId: Scalars['String'];
};

export type Distributor = {
  company?: InputMaybe<Company>;
  created?: InputMaybe<Scalars['DateTime']>;
  emailCancellations?: InputMaybe<Scalars['String']>;
  emailRes?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  modified?: InputMaybe<Scalars['DateTime']>;
  name?: InputMaybe<Scalars['String']>;
  tnc?: InputMaybe<Scalars['String']>;
};

export type DistributorPayload = {
  emailCancellations?: Maybe<Scalars['String']>;
  emailRes?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  tnc?: Maybe<Scalars['String']>;
};

export type DurationRange = {
  maxDurationInMinutes?: InputMaybe<Scalars['Int']>;
  minDurationInMinutes?: InputMaybe<Scalars['Int']>;
};

export type EditProductInput = {
  nextAvailableDate: Scalars['String'];
  priceFrom: Scalars['Float'];
  priceFromCurrency: Scalars['String'];
  productId: Scalars['String'];
};

export type EditProductPayload = {
  currencyCode?: Maybe<Scalars['String']>;
  globalDiscount?: Maybe<Scalars['Float']>;
  id: Scalars['Int'];
  productId: Scalars['ID'];
};

export enum ErrorDetail {
  /**
   * The deadline expired before the operation could complete.
   *
   * For operations that change the state of the system, this error
   * may be returned even if the operation has completed successfully.
   * For example, a successful response from a server could have been
   * delayed long enough for the deadline to expire.
   *
   * HTTP Mapping: 504 Gateway Timeout
   * Error Type: UNAVAILABLE
   */
  DeadlineExceeded = 'DEADLINE_EXCEEDED',
  /**
   * The server detected that the client is exhibiting a behavior that
   * might be generating excessive load.
   *
   * HTTP Mapping: 429 Too Many Requests or 420 Enhance Your Calm
   * Error Type: UNAVAILABLE
   */
  EnhanceYourCalm = 'ENHANCE_YOUR_CALM',
  /**
   * The requested field is not found in the schema.
   *
   * This differs from `NOT_FOUND` in that `NOT_FOUND` should be used when a
   * query is valid, but is unable to return a result (if, for example, a
   * specific video id doesn't exist). `FIELD_NOT_FOUND` is intended to be
   * returned by the server to signify that the requested field is not known to exist.
   * This may be returned in lieu of failing the entire query.
   * See also `PERMISSION_DENIED` for cases where the
   * requested field is invalid only for the given user or class of users.
   *
   * HTTP Mapping: 404 Not Found
   * Error Type: BAD_REQUEST
   */
  FieldNotFound = 'FIELD_NOT_FOUND',
  /**
   * The client specified an invalid argument.
   *
   * Note that this differs from `FAILED_PRECONDITION`.
   * `INVALID_ARGUMENT` indicates arguments that are problematic
   * regardless of the state of the system (e.g., a malformed file name).
   *
   * HTTP Mapping: 400 Bad Request
   * Error Type: BAD_REQUEST
   */
  InvalidArgument = 'INVALID_ARGUMENT',
  /**
   * The provided cursor is not valid.
   *
   * The most common usage for this error is when a client is paginating
   * through a list that uses stateful cursors. In that case, the provided
   * cursor may be expired.
   *
   * HTTP Mapping: 404 Not Found
   * Error Type: NOT_FOUND
   */
  InvalidCursor = 'INVALID_CURSOR',
  /**
   * Unable to perform operation because a required resource is missing.
   *
   * Example: Client is attempting to refresh a list, but the specified
   * list is expired. This requires an action by the client to get a new list.
   *
   * If the user is simply trying GET a resource that is not found,
   * use the NOT_FOUND error type. FAILED_PRECONDITION.MISSING_RESOURCE
   * is to be used particularly when the user is performing an operation
   * that requires a particular resource to exist.
   *
   * HTTP Mapping: 400 Bad Request or 500 Internal Server Error
   * Error Type: FAILED_PRECONDITION
   */
  MissingResource = 'MISSING_RESOURCE',
  /**
   * Service Error.
   *
   * There is a problem with an upstream service.
   *
   * This may be returned if a gateway receives an unknown error from a service
   * or if a service is unreachable.
   * If a request times out which waiting on a response from a service,
   * `DEADLINE_EXCEEDED` may be returned instead.
   * If a service returns a more specific error Type, the specific error Type may
   * be returned instead.
   *
   * HTTP Mapping: 502 Bad Gateway
   * Error Type: UNAVAILABLE
   */
  ServiceError = 'SERVICE_ERROR',
  /**
   * Request failed due to network errors.
   *
   * HTTP Mapping: 503 Unavailable
   * Error Type: UNAVAILABLE
   */
  TcpFailure = 'TCP_FAILURE',
  /**
   * Request throttled based on server concurrency limits.
   *
   * HTTP Mapping: 503 Unavailable
   * Error Type: UNAVAILABLE
   */
  ThrottledConcurrency = 'THROTTLED_CONCURRENCY',
  /**
   * Request throttled based on server CPU limits
   *
   * HTTP Mapping: 503 Unavailable.
   * Error Type: UNAVAILABLE
   */
  ThrottledCpu = 'THROTTLED_CPU',
  /**
   * The operation is not implemented or is not currently supported/enabled.
   *
   * HTTP Mapping: 501 Not Implemented
   * Error Type: BAD_REQUEST
   */
  Unimplemented = 'UNIMPLEMENTED',
  /**
   * Unknown error.
   *
   * This error should only be returned when no other error detail applies.
   * If a client sees an unknown errorDetail, it will be interpreted as UNKNOWN.
   *
   * HTTP Mapping: 500 Internal Server Error
   */
  Unknown = 'UNKNOWN'
}

export enum ErrorType {
  /**
   * Bad Request.
   *
   * There is a problem with the request.
   * Retrying the same request is not likely to succeed.
   * An example would be a query or argument that cannot be deserialized.
   *
   * HTTP Mapping: 400 Bad Request
   */
  BadRequest = 'BAD_REQUEST',
  /**
   * The operation was rejected because the system is not in a state
   * required for the operation's execution.  For example, the directory
   * to be deleted is non-empty, an rmdir operation is applied to
   * a non-directory, etc.
   *
   * Service implementers can use the following guidelines to decide
   * between `FAILED_PRECONDITION` and `UNAVAILABLE`:
   *
   * - Use `UNAVAILABLE` if the client can retry just the failing call.
   * - Use `FAILED_PRECONDITION` if the client should not retry until
   * the system state has been explicitly fixed.  E.g., if an "rmdir"
   *      fails because the directory is non-empty, `FAILED_PRECONDITION`
   * should be returned since the client should not retry unless
   * the files are deleted from the directory.
   *
   * HTTP Mapping: 400 Bad Request or 500 Internal Server Error
   */
  FailedPrecondition = 'FAILED_PRECONDITION',
  /**
   * Internal error.
   *
   * An unexpected internal error was encountered. This means that some
   * invariants expected by the underlying system have been broken.
   * This error code is reserved for serious errors.
   *
   * HTTP Mapping: 500 Internal Server Error
   */
  Internal = 'INTERNAL',
  /**
   * The requested entity was not found.
   *
   * This could apply to a resource that has never existed (e.g. bad resource id),
   * or a resource that no longer exists (e.g. cache expired.)
   *
   * Note to server developers: if a request is denied for an entire class
   * of users, such as gradual feature rollout or undocumented allowlist,
   * `NOT_FOUND` may be used. If a request is denied for some users within
   * a class of users, such as user-based access control, `PERMISSION_DENIED`
   * must be used.
   *
   * HTTP Mapping: 404 Not Found
   */
  NotFound = 'NOT_FOUND',
  /**
   * The caller does not have permission to execute the specified
   * operation.
   *
   * `PERMISSION_DENIED` must not be used for rejections
   * caused by exhausting some resource or quota.
   * `PERMISSION_DENIED` must not be used if the caller
   * cannot be identified (use `UNAUTHENTICATED`
   * instead for those errors).
   *
   * This error Type does not imply the
   * request is valid or the requested entity exists or satisfies
   * other pre-conditions.
   *
   * HTTP Mapping: 403 Forbidden
   */
  PermissionDenied = 'PERMISSION_DENIED',
  /**
   * The request does not have valid authentication credentials.
   *
   * This is intended to be returned only for routes that require
   * authentication.
   *
   * HTTP Mapping: 401 Unauthorized
   */
  Unauthenticated = 'UNAUTHENTICATED',
  /**
   * Currently Unavailable.
   *
   * The service is currently unavailable.  This is most likely a
   * transient condition, which can be corrected by retrying with
   * a backoff.
   *
   * HTTP Mapping: 503 Unavailable
   */
  Unavailable = 'UNAVAILABLE',
  /**
   * Unknown error.
   *
   * For example, this error may be returned when
   * an error code received from another address space belongs to
   * an error space that is not known in this address space.  Also
   * errors raised by APIs that do not return enough error information
   * may be converted to this error.
   *
   * If a client sees an unknown errorType, it will be interpreted as UNKNOWN.
   * Unknown errors MUST NOT trigger any special behavior. These MAY be treated
   * by an implementation as being equivalent to INTERNAL.
   *
   * When possible, a more specific error should be provided.
   *
   * HTTP Mapping: 520 Unknown Error
   */
  Unknown = 'UNKNOWN'
}

export type ExternalResource = {
  caption?: InputMaybe<Scalars['String']>;
  data?: InputMaybe<Scalars['String']>;
  mimeType?: InputMaybe<Scalars['String']>;
  printRequired?: InputMaybe<Scalars['Boolean']>;
  required?: InputMaybe<Scalars['Boolean']>;
  ticketUuids?: InputMaybe<Array<InputMaybe<Uuid>>>;
  url?: InputMaybe<Scalars['String']>;
};

export type ExternalResourcePayload = {
  caption?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  printRequired?: Maybe<Scalars['Boolean']>;
  required?: Maybe<Scalars['Boolean']>;
  ticketUuids?: Maybe<Array<Maybe<UuidPayload>>>;
  url?: Maybe<Scalars['String']>;
};

export type ExternalResources = {
  externalResources?: InputMaybe<Array<InputMaybe<ExternalResource>>>;
};

export type ExternalResourcesPayload = {
  externalResources?: Maybe<Array<Maybe<ExternalResourcePayload>>>;
};

export enum Filetype {
  Invoice = 'INVOICE',
  Voucher = 'VOUCHER'
}

export type FareDetails = {
  addOns?: InputMaybe<Array<InputMaybe<AddOn>>>;
  baseVariants?: InputMaybe<Array<InputMaybe<BaseVariant>>>;
};

export type FareDetailsPayload = {
  addOns?: Maybe<Array<Maybe<AddOnPayload>>>;
  baseVariants?: Maybe<Array<Maybe<BaseVariantPayload>>>;
};

export type FareDiscountValuesInput = {
  bpdFareType?: InputMaybe<BpdFareType>;
  commission?: InputMaybe<Scalars['Float']>;
  displayName?: InputMaybe<Scalars['String']>;
  fareDiscount?: InputMaybe<Scalars['Float']>;
  fareTypeId: Scalars['Int'];
  isHidden?: InputMaybe<Scalars['Boolean']>;
  isLevyIncluded?: InputMaybe<Scalars['Boolean']>;
  levyAmount?: InputMaybe<Scalars['Float']>;
  levyBpdLabel?: InputMaybe<Scalars['String']>;
  levyLabel?: InputMaybe<Scalars['String']>;
};

export type FareDiscountValuesPayload = {
  bpdFareType?: Maybe<BpdFareType>;
  commission?: Maybe<Scalars['Float']>;
  fareDiscount?: Maybe<Scalars['Float']>;
  fareTypeId: Scalars['Int'];
  isHidden?: Maybe<Scalars['Boolean']>;
  isLevyIncluded?: Maybe<Scalars['Boolean']>;
  levyAmount?: Maybe<Scalars['Float']>;
  levyBpdLabel?: Maybe<Scalars['String']>;
  levyLabel?: Maybe<Scalars['String']>;
};

export type FareLivn = {
  addOns?: InputMaybe<Array<InputMaybe<AddOn>>>;
  ageMax?: InputMaybe<Scalars['Int']>;
  ageMin?: InputMaybe<Scalars['Int']>;
  ageQualified?: InputMaybe<Scalars['Boolean']>;
  availabilityUnknown?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  otherCharges?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<PriceFare>;
  specialNotes?: InputMaybe<Scalars['String']>;
  unitsAvailable?: InputMaybe<Scalars['Int']>;
  unitsMax?: InputMaybe<Scalars['Int']>;
  unitsMin?: InputMaybe<Scalars['Int']>;
  unitsMultipleOf?: InputMaybe<Scalars['Int']>;
  uuid?: InputMaybe<Uuid>;
};

export type FarePayload = {
  addOns?: Maybe<Array<Maybe<AddOnPayload>>>;
  ageMax?: Maybe<Scalars['Int']>;
  ageMin?: Maybe<Scalars['Int']>;
  ageQualified?: Maybe<Scalars['Boolean']>;
  availabilityUnknown?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  otherCharges?: Maybe<Scalars['String']>;
  price?: Maybe<PriceFarePayload>;
  specialNotes?: Maybe<Scalars['String']>;
  unitsAvailable?: Maybe<Scalars['Int']>;
  unitsMax?: Maybe<Scalars['Int']>;
  unitsMin?: Maybe<Scalars['Int']>;
  unitsMultipleOf?: Maybe<Scalars['Int']>;
  uuid?: Maybe<UuidPayload>;
};

export type FarePrice = {
  /**  Amount of commission for that particular fare */
  commission: AvailabilityMoney;
  /**  LMD Discount */
  discountRulePrice: AvailabilityMoney;
  fareDiscountPrice: AvailabilityMoney;
  levyPrice?: Maybe<LevyPrice>;
  /**  Price to pay to ResSystem */
  netPrice: AvailabilityMoney;
  /**  Regular price proposed by ResSystem – 235.95 */
  recommendedRetailPrice: AvailabilityMoney;
  /**  Final price to be payed by customer */
  totalPrice: AvailabilityMoney;
  /**  How much buyer saves picking this deal */
  totalSaving: AvailabilityMoney;
};

export type FareSelection = {
  hint?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Int']>;
  uuid?: InputMaybe<Scalars['String']>;
};

export type FareSelectionPayload = {
  hint?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type FareType = {
  /**
   * Get the value of displayName.
   * @deprecated this property comes from old system and should no longer be source of truth
   */
  displayName: Scalars['String'];
  /**
   * Get the value of typeName.
   * @deprecated this property comes from old system and should no longer be source of truth
   */
  typeName: FareTypeEnum;
};

export type FareTypeBooked = {
  quantity: Scalars['Int'];
  title: Scalars['String'];
};

export enum FareTypeEnum {
  Adult = 'ADULT',
  Child = 'CHILD',
  Family = 'FAMILY'
}

export type FareTypeFilter = {
  productId: Scalars['ID'];
  showHidden: Scalars['Boolean'];
};

export type FareTypeImportPayload = {
  data: Array<Maybe<FareTypePayload>>;
  status: FareTypeImportStatusPayload;
};

export type FareTypeImportStatusPayload = {
  ignored: Scalars['Int'];
  stored: Scalars['Int'];
};

/** Import Fare types models */
export type FareTypePayload = {
  bpdFareType?: Maybe<BpdFareType>;
  currencyCode?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  /**  Database ID */
  id: Scalars['Int'];
  isHidden: Scalars['Boolean'];
  originalName: Scalars['String'];
  productId: Scalars['ID'];
  recommendedRetailPrice?: Maybe<Scalars['Float']>;
  resSystemFareTypeId: Scalars['ID'];
};

export type FareTypePricePayload = {
  commission?: Maybe<Scalars['Float']>;
  currency?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['Float']>;
  orderTotal?: Maybe<Scalars['Float']>;
  recommendedRetailPrice?: Maybe<Scalars['Float']>;
};

export type FareTypeToBookInput = {
  numberOfSeats: Scalars['Int'];
  resSystemBookingId: Scalars['String'];
  resSystemFareTypeId: Scalars['String'];
};

export type FareTypeToBookPayload = {
  fareTypeName: Scalars['String'];
  numberOfSeats: Scalars['Int'];
  resSystemFareTypeId: Scalars['String'];
  totalPrice: Scalars['Float'];
  totalSaving: Scalars['Float'];
};

export type FareTypeUpdateInput = {
  bpdFareType?: InputMaybe<BpdFareType>;
  description?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  /**  Database ID */
  id: Scalars['Int'];
  isHidden?: InputMaybe<Scalars['Boolean']>;
  resSystemFareTypeId?: InputMaybe<Scalars['ID']>;
};

/**  Filter =  full match # */
export type FilterBookingCriteria = {
  booking?: InputMaybe<BookingFilterCriteria>;
  coupon?: InputMaybe<BookingCouponFilterCriteria>;
  referrals?: InputMaybe<BookingReferralsFilterCriteria>;
};

export type FilterVoucherCriteria = {
  dealName?: InputMaybe<Scalars['String']>;
  voucherStatus?: InputMaybe<VoucherStatus>;
};

export type FinalMoney = {
  amount: Scalars['Float'];
  currencyCode: Scalars['String'];
};

export type Flow = {
  billingInfo?: InputMaybe<BillingInfo>;
  bookings?: InputMaybe<Array<InputMaybe<Booking>>>;
  clientId?: InputMaybe<Scalars['String']>;
  clientReference?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['Date']>;
  directConnect?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['Int']>;
  livnReference?: InputMaybe<Scalars['String']>;
  product?: InputMaybe<LivnProduct>;
  productId?: InputMaybe<Scalars['Int']>;
  roadmap?: InputMaybe<Scalars['String']>;
  simulation?: InputMaybe<Scalars['Boolean']>;
  steps?: InputMaybe<Array<InputMaybe<Step>>>;
};

export type FlowPayload = {
  billingInfo?: Maybe<BillingInfoPayload>;
  bookings?: Maybe<Array<Maybe<BookingPayload>>>;
  clientId?: Maybe<Scalars['String']>;
  clientReference?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  directConnect?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Int']>;
  livnReference?: Maybe<Scalars['String']>;
  product?: Maybe<ProductPayload>;
  productId?: Maybe<Scalars['Int']>;
  resSystemType?: Maybe<ResSystemTypeForLivn>;
  roadmap?: Maybe<Scalars['String']>;
  simulation?: Maybe<Scalars['Boolean']>;
  steps?: Maybe<Array<Maybe<StepPayload>>>;
};

export type GeoLocation = {
  city?: Maybe<LocationData>;
  country?: Maybe<LocationData>;
  region?: Maybe<LocationData>;
};

export type Geography = {
  finishCity: City;
  finishCountry: Country;
  primaryCountry: Country;
  region: Region;
  startCity: City;
  startCountry: Country;
  visitedCountries: Array<Country>;
};

/** Get Product Raw Data */
export type GetProductDataInput = {
  productCode?: InputMaybe<Scalars['String']>;
  resSystemType: ImportResSystemType;
};

export type GiftBookingInput = {
  dateOfPrice: Scalars['DateTime'];
};

export type GuestMe = MeOrGuestMe & {
  id: Scalars['ID'];
  preferredCurrency: Scalars['String'];
};

export enum HedgeMode {
  Down = 'DOWN',
  None = 'NONE',
  Up = 'UP'
}

export type Highlights = {
  highlights?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type HighlightsPayload = {
  highlights?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Image = {
  altText?: Maybe<Scalars['String']>;
  fileName: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  imgSrc?: Maybe<Scalars['String']>;
  /** @deprecated use imgSrc instead */
  src?: Maybe<Scalars['String']>;
  /** @deprecated url is deprecated */
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};


export type ImageImgSrcArgs = {
  transform?: InputMaybe<ImageTransformInput>;
  transformBaseUrl?: InputMaybe<Scalars['String']>;
};


export type ImageSrcArgs = {
  transform?: InputMaybe<ImageTransformInput>;
  transformBaseUrl?: InputMaybe<Scalars['String']>;
};

export type ImagePayload = {
  fileSize?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  mimeType?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

/** check the document for parameters of image transformation https://docs.imgproxy.net/generating_the_url?id=processing-options */
export type ImageTransformInput = {
  autoQuality?: InputMaybe<AutoQualityInput>;
  dpr?: InputMaybe<Scalars['Float']>;
  enlarge?: InputMaybe<Scalars['Boolean']>;
  extend?: InputMaybe<Scalars['Boolean']>;
  height?: InputMaybe<Scalars['Int']>;
  quality?: InputMaybe<Scalars['Int']>;
  resizeType?: InputMaybe<ImgResizeType>;
  width?: InputMaybe<Scalars['Int']>;
};

export enum ImgOptimazeType {
  Dssim = 'DSSIM',
  Ml = 'ML',
  Size = 'SIZE'
}

export enum ImgResizeType {
  Auto = 'AUTO',
  Fill = 'FILL',
  FillDown = 'FILL_DOWN',
  Fit = 'FIT',
  Force = 'FORCE'
}

export type ImportRemoteDealsData = {
  departuresEndTime?: Maybe<Scalars['String']>;
  departuresStartTime?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  productLine?: Maybe<Scalars['String']>;
  resSystemType?: Maybe<ImportResSystemType>;
  tourId?: Maybe<Scalars['String']>;
};

/** import Remote Deals */
export type ImportRemoteDealsInput = {
  resSystemType: ImportResSystemType;
};

export type ImportRemoteDealsResponse = {
  data?: Maybe<Scalars['String']>;
  status?: Maybe<TravelloErrorStatus>;
};

export enum ImportResSystemType {
  Gadventures = 'GADVENTURES'
}

export type Inclusion = {
  content?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type InclusionPayload = {
  content?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type Inclusions = {
  items?: InputMaybe<Array<InputMaybe<Inclusion>>>;
};

export type InclusionsPayload = {
  items?: Maybe<Array<Maybe<InclusionPayload>>>;
};

export type InternalStoredData = {
  rsisStoredValues: Array<Maybe<AttributeKeyValuePair>>;
};

export type Invoice = {
  contractCommTotal?: InputMaybe<PriceContractCommTotal>;
  grossTotal?: InputMaybe<PriceLineItemsGrossTotal>;
  lineItems?: InputMaybe<Array<InputMaybe<LineItem>>>;
  netTotal?: InputMaybe<PriceLineItemsNetTotal>;
  resSuppliedCommTotal?: InputMaybe<PriceResSuppliedCommTotal>;
};

export type InvoicePayload = {
  contractCommTotal?: Maybe<PriceContractCommTotalPayload>;
  grossTotal?: Maybe<PriceLineItemsGrossTotalPayload>;
  lineItems?: Maybe<Array<Maybe<LineItemPayload>>>;
  netTotal?: Maybe<PriceLineItemsNetTotalPayload>;
  resSuppliedCommTotal?: Maybe<PriceResSuppliedCommTotalPayload>;
};

export type ItemsToBook = {
  quantityToBook?: InputMaybe<Scalars['Int']>;
  resSystemFareTypeId?: InputMaybe<Scalars['String']>;
};

export type Itinerary = {
  items?: InputMaybe<Array<InputMaybe<ItineraryItem>>>;
  name?: InputMaybe<Scalars['String']>;
};

export type ItineraryItem = {
  body?: InputMaybe<Scalars['String']>;
  dayFrom?: InputMaybe<Scalars['Int']>;
  dayTo?: InputMaybe<Scalars['Int']>;
  timeFrom?: InputMaybe<Scalars['String']>;
  timeTo?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ItineraryItemPayload = {
  body?: Maybe<Scalars['String']>;
  dayFrom?: Maybe<Scalars['Int']>;
  dayTo?: Maybe<Scalars['Int']>;
  timeFrom?: Maybe<Scalars['String']>;
  timeTo?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ItineraryPayload = {
  items?: Maybe<Array<Maybe<ItineraryItemPayload>>>;
  name?: Maybe<Scalars['String']>;
};

export type JobResponse = {
  status?: Maybe<JobStatus>;
};

export enum JobStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Started = 'STARTED'
}

export type Levy = Price & {
  /** @deprecated this property comes from old system and should no longer be source of truth */
  fareType: FareType;
  /** @deprecated this property comes from old system and should no longer be source of truth */
  label?: Maybe<Scalars['String']>;
  /** @deprecated this property comes from old system and should no longer be source of truth */
  value: Money;
};

export type LevyPrice = {
  included: Scalars['Boolean'];
  value: AvailabilityMoney;
};

export type LimitOffsetPageInfo = {
  totalCount: Scalars['Int'];
};

export type LineItem = {
  commissionTotal?: InputMaybe<PriceLineItemCommissionTotal>;
  fareUuids?: InputMaybe<Array<InputMaybe<Uuid>>>;
  grossPerUnit?: InputMaybe<PriceLineItemGrossPerUnit>;
  grossTotal?: InputMaybe<PriceLineItemGrossTotal>;
  netPerUnit?: InputMaybe<PriceLineItemNetPerUnit>;
  netTotal?: InputMaybe<PriceLineItemNetTotal>;
  quantity?: InputMaybe<Scalars['Int']>;
  salesComputationDetails?: InputMaybe<SalesComputationDetails>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type LineItemPayload = {
  commissionTotal?: Maybe<PriceLineItemCommissionTotalPayload>;
  fareUuids?: Maybe<Array<Maybe<UuidPayload>>>;
  grossPerUnit?: Maybe<PriceLineItemGrossPerUnitPayload>;
  grossTotal?: Maybe<PriceLineItemGrossTotalPayload>;
  netPerUnit?: Maybe<PriceLineItemNetPerUnitPayload>;
  netTotal?: Maybe<PriceLineItemNetTotalPayload>;
  quantity?: Maybe<Scalars['Int']>;
  salesComputationDetails?: Maybe<SalesComputationDetailsPayload>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type LivnImage = {
  fileSize?: InputMaybe<Scalars['Int']>;
  height?: InputMaybe<Scalars['Int']>;
  mimeType?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type LivnProduct = {
  ageMax?: InputMaybe<Scalars['Int']>;
  ageMin?: InputMaybe<Scalars['Int']>;
  catalogue?: InputMaybe<Catalogue>;
  catalogueProductId?: InputMaybe<Scalars['Int']>;
  categories?: InputMaybe<Array<InputMaybe<Category>>>;
  channel?: InputMaybe<Channel>;
  commissionPerc?: InputMaybe<Scalars['String']>;
  created?: InputMaybe<Scalars['DateTime']>;
  currencies?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  demo?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  distance?: InputMaybe<Scalars['Float']>;
  distributor?: InputMaybe<Distributor>;
  dropoffNotes?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  durationRangeMax?: InputMaybe<Scalars['Int']>;
  durationStr?: InputMaybe<Scalars['String']>;
  groupSizeMax?: InputMaybe<Scalars['Int']>;
  highlights?: InputMaybe<Highlights>;
  id?: InputMaybe<Scalars['Int']>;
  images?: InputMaybe<Array<InputMaybe<LivnImage>>>;
  inclusions?: InputMaybe<Inclusions>;
  itinerary?: InputMaybe<Itinerary>;
  locationsEnd?: InputMaybe<Array<InputMaybe<Location>>>;
  locationsStart?: InputMaybe<Array<InputMaybe<Location>>>;
  modified?: InputMaybe<Scalars['DateTime']>;
  name?: InputMaybe<Scalars['String']>;
  nameOriginal?: InputMaybe<Scalars['String']>;
  netRatesMarkupPerc?: InputMaybe<Scalars['String']>;
  operatedBy?: InputMaybe<Scalars['String']>;
  operatingDays?: InputMaybe<Scalars['Int']>;
  operatingDaysStr?: InputMaybe<Scalars['String']>;
  operatingLanguages?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  operatingSchedule?: InputMaybe<Scalars['String']>;
  pickupNotes?: InputMaybe<Scalars['String']>;
  redemptionNotes?: InputMaybe<Scalars['String']>;
  resSystem?: InputMaybe<Scalars['String']>;
  specialNotes?: InputMaybe<Scalars['String']>;
  supplier?: InputMaybe<SupplierBasic>;
  timeStart?: InputMaybe<Scalars['String']>;
  timeStartRangeMax?: InputMaybe<Scalars['String']>;
  usesNetRates?: InputMaybe<Scalars['Boolean']>;
  v1Cid?: InputMaybe<Scalars['Int']>;
};

export type LoaderResultPayload = {
  executed?: Maybe<Scalars['Int']>;
  ignored?: Maybe<Scalars['Int']>;
  processed?: Maybe<Scalars['Int']>;
  stored?: Maybe<Scalars['Int']>;
};

export type LocalTime = {
  hour?: InputMaybe<Scalars['Int']>;
  minute?: InputMaybe<Scalars['Int']>;
  nano?: InputMaybe<Scalars['Int']>;
  second?: InputMaybe<Scalars['Int']>;
};

export type LocalTimePayload = {
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  nano?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
};

export type Location = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  building?: InputMaybe<Scalars['String']>;
  business?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  continent?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  district?: InputMaybe<Scalars['String']>;
  landmark?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  postcode?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  streetAddressAccuracy?: InputMaybe<Scalars['Boolean']>;
  tz?: InputMaybe<Scalars['String']>;
};

export type LocationData = {
  id: Scalars['ID'];
  name: Scalars['String'];
  uniqueName: Scalars['String'];
};

export type LocationPayload = {
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  business?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  continent?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  landmark?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  postcode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  streetAddressAccuracy?: Maybe<Scalars['Boolean']>;
  tz?: Maybe<Scalars['String']>;
};

export type MapBookingFieldTypeConfigurationInput = {
  id?: InputMaybe<Scalars['ID']>;
  label?: InputMaybe<Scalars['String']>;
  originalLabel?: InputMaybe<Scalars['String']>;
  resSystemAnswerId?: InputMaybe<Scalars['String']>;
};

export type MapBookingFieldTypeConfigurationPayload = {
  groupId: Scalars['Int'];
  id: Scalars['Int'];
  label?: Maybe<Scalars['String']>;
  originalLabel?: Maybe<Scalars['String']>;
  resSystemAnswerId?: Maybe<Scalars['String']>;
};

export type Me = MeOrGuestMe & {
  email: Scalars['EmailAddress'];
  id: Scalars['ID'];
  preferredCurrency: Scalars['String'];
  privacySettings?: Maybe<UserPrivacySettings>;
  user: User;
};

export type MeOrGuestMe = {
  id: Scalars['ID'];
  preferredCurrency: Scalars['String'];
};

export enum MeasurementType {
  Day = 'DAY',
  Month = 'MONTH'
}

export type Merchant = {
  accountsEmail?: Maybe<Scalars['String']>;
  companyLogo?: Maybe<Image>;
  companyName?: Maybe<Scalars['String']>;
  companyPhone?: Maybe<Scalars['String']>;
  contactNumber?: Maybe<Scalars['String']>;
  contactPerson?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  otherInfo?: Maybe<Scalars['String']>;
  salesEmail?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type Money = {
  /**  235.95 */
  amount: Scalars['Float'];
  /** this is the same as bpd_convertedAmount except it returns a structure similar to Money but without any convertion methods */
  bpd_convertTo?: Maybe<FinalMoney>;
  bpd_convertedAmount?: Maybe<Scalars['Float']>;
  convertedAmount?: Maybe<Scalars['Float']>;
  /**  The three-letter currency code defined in ISO 4217 */
  currencyCode: Scalars['String'];
};


export type MoneyBpd_ConvertToArgs = {
  currencyCode?: InputMaybe<Scalars['String']>;
};


export type MoneyBpd_ConvertedAmountArgs = {
  currencyCode?: InputMaybe<Scalars['String']>;
};


export type MoneyConvertedAmountArgs = {
  currencyCode?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  activateDiscountRule?: Maybe<DiscountRulePayload>;
  /** @deprecated No longer supported */
  addAvailabilityFarePrice?: Maybe<Array<AvailabilityFarePricePayload>>;
  /**  Admin Only | Internal notes  */
  addBookingInternalNote: BookingInternalNotePayload;
  /**  Admin Only | Custom booking fields' endpoints  */
  addCustomBookingField: Array<CustomBookingFieldsPayload>;
  addMapBookingFieldTypeConfiguration: Array<MapBookingFieldTypeConfigurationPayload>;
  /**  Promocode API endpoints */
  applyBookingPromocode: BookingPromocodePayload;
  /**  User flow | Contact Info page endpoints */
  bookingContactInfo: BookingContactInfoPayload;
  bookingCustomerLocation: BookingCustomerLocationPayload;
  bookingExtraInfo: BookingExtraInfoPayload;
  bookingPickup: BookingPickupPayload;
  bpd_createBooking: Bpd_CreatedBookingOutput;
  /** @deprecated migated to use iterable directly */
  bpd_createWishlist: Bpd_CreateWishlistOutput;
  /** bpd_generateBraintreeClientToken can only be used for 'Buy As a Gift' */
  bpd_generateBraintreeClientToken: Bpd_GeneratedBraintreeClientTokenOutput;
  bpd_updateContactInformation: Bpd_UpdatedContactInformationOutput;
  bpd_validateBooking: Bpd_ValidBookingOutput;
  bpd_validateCoupon: Bpd_ValidCouponOutput;
  cancelRedeemedPromocode?: Maybe<Scalars['Boolean']>;
  completeBooking?: Maybe<Scalars['Int']>;
  /**  User flow | General endpoints  */
  createBooking: BookingDataPayload;
  /**  Discount Rules  */
  createDiscountRule?: Maybe<DiscountRulePayload>;
  createMapBookingFieldTypeConfiguration: Array<MapBookingFieldTypeConfigurationPayload>;
  /**  User flow | Payment page  */
  createPaymentToken?: Maybe<Token>;
  /**  General configurations */
  createStringBookingFieldTypeConfiguration: Array<StringBookingFieldTypeConfigurationPayload>;
  deleteAvailabilityFarePrice?: Maybe<Array<AvailabilityFarePricePayload>>;
  /** @deprecated No longer supported */
  deleteBookingInternalNote: Array<BookingInternalNotePayload>;
  deleteCustomBookingFields: Array<CustomBookingFieldsPayload>;
  deleteDiscountRule?: Maybe<DeleteDiscountRulePayload>;
  deleteMapBookingFieldTypeConfiguration: DeleteMapBookingFieldTypeConfigurationPayload;
  deleteMapBookingFieldTypeGroupConfiguration: Array<MapBookingFieldTypeConfigurationPayload>;
  deleteStringBookingFieldTypeConfiguration: StringBookingFieldTypeConfigurationPayload;
  disableDiscountRule?: Maybe<DiscountRulePayload>;
  /**  Fare Types Import  */
  importFareTypes: FareTypeImportPayload;
  importNumberOfBookings?: Maybe<JobResponse>;
  importReviewData?: Maybe<JobResponse>;
  importSingleProductAndCache: Scalars['Boolean'];
  indexAllProducts?: Maybe<JobResponse>;
  productMetaImportByProductDataMap: ProductMetaImportPayload;
  redeemPromocode?: Maybe<PromocodeRedemptionPayload>;
  /**  Admin Only | Voucher endpoints  */
  redeemVoucher?: Maybe<RedeemVoucherResponse>;
  savePriceFromAndNextAvailableDate: EditProductPayload;
  saveProductData: EditProductPayload;
  savePromocode?: Maybe<PromocodeSavePayload>;
  /**  Cache configs  */
  startCaching?: Maybe<StartCacheJobPayload>;
  syncProducts: Scalars['Boolean'];
  /** @deprecated No longer supported */
  updateAvailabilityFarePrice: AvailabilityFarePricePayload;
  updateBooking: UpdateBookingDataPayload;
  updateBookingContactInfo: BookingContactInfoPayload;
  updateBookingCustomerLocation: BookingCustomerLocationPayload;
  updateBookingExtraInfo: BookingExtraInfoPayload;
  updateBookingInternalNote: BookingInternalNotePayload;
  updateBookingParticipantDetails: Array<BookingParticipantDetailsPayload>;
  updateBookingPickup: BookingPickupPayload;
  updateCustomBookingField: CustomBookingFieldsPayload;
  updateDiscountRule?: Maybe<DiscountRulePayload>;
  updateFareTypes: Array<Maybe<FareTypePayload>>;
  updateMapBookingFieldTypeConfiguration: Array<MapBookingFieldTypeConfigurationPayload>;
  updateMyCurrency: UpdateMyCurrentPayload;
  updateMyPrivacySettings: UpdateMyPrivacySettingsPayload;
  /**   Discount rules  */
  updateProductDiscountsConfiguration: ProductDiscountsConfigurationPayload;
  updateStringBookingFieldTypeConfiguration: StringBookingFieldTypeConfigurationPayload;
};


export type MutationActivateDiscountRuleArgs = {
  id: Scalars['Int'];
};


export type MutationAddAvailabilityFarePriceArgs = {
  input: Array<AvailabilityFarePriceInput>;
};


export type MutationAddBookingInternalNoteArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
  input: BookingInternalNoteInput;
};


export type MutationAddCustomBookingFieldArgs = {
  input: Array<CustomBookingFieldsInput>;
  productId: Scalars['ID'];
};


export type MutationAddMapBookingFieldTypeConfigurationArgs = {
  groupId: Scalars['Int'];
  input: Array<MapBookingFieldTypeConfigurationInput>;
};


export type MutationApplyBookingPromocodeArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
  promocode: Scalars['String'];
};


export type MutationBookingContactInfoArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
  input: BookingContactInfoInput;
};


export type MutationBookingCustomerLocationArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
  input: BookingCustomerLocationInput;
};


export type MutationBookingExtraInfoArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
  message: Scalars['String'];
};


export type MutationBookingPickupArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
  input: BookingPickupInput;
};


export type MutationBpd_CreateBookingArgs = {
  input: Bpd_CreateBookingInput;
};


export type MutationBpd_CreateWishlistArgs = {
  input: Bpd_CreateWishlistInput;
};


export type MutationBpd_GenerateBraintreeClientTokenArgs = {
  input: Bpd_GenerateBraintreeClientTokenInput;
};


export type MutationBpd_UpdateContactInformationArgs = {
  input: Bpd_UpdateContactInformationInput;
};


export type MutationBpd_ValidateBookingArgs = {
  input: Bpd_ValidateBookingInput;
};


export type MutationBpd_ValidateCouponArgs = {
  input: Bpd_ValidateCouponInput;
};


export type MutationCancelRedeemedPromocodeArgs = {
  input: PromocodeRedemptionInput;
};


export type MutationCompleteBookingArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
  paymentToken: Scalars['String'];
};


export type MutationCreateBookingArgs = {
  input: BookingDataInput;
};


export type MutationCreateDiscountRuleArgs = {
  input: DiscountRuleInput;
  productId: Scalars['ID'];
};


export type MutationCreateMapBookingFieldTypeConfigurationArgs = {
  groupName: Scalars['String'];
  input: Array<MapBookingFieldTypeConfigurationInput>;
};


export type MutationCreatePaymentTokenArgs = {
  userId?: InputMaybe<Scalars['ID']>;
};


export type MutationCreateStringBookingFieldTypeConfigurationArgs = {
  input: Array<StringBookingFieldTypeConfigurationInput>;
};


export type MutationDeleteAvailabilityFarePriceArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeleteBookingInternalNoteArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteCustomBookingFieldsArgs = {
  ids: Array<InputMaybe<Scalars['Int']>>;
};


export type MutationDeleteDiscountRuleArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteMapBookingFieldTypeConfigurationArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeleteMapBookingFieldTypeGroupConfigurationArgs = {
  groupId: Scalars['Int'];
};


export type MutationDeleteStringBookingFieldTypeConfigurationArgs = {
  id: Scalars['Int'];
};


export type MutationDisableDiscountRuleArgs = {
  id: Scalars['Int'];
};


export type MutationImportFareTypesArgs = {
  productIds: Array<Scalars['ID']>;
};


export type MutationImportSingleProductAndCacheArgs = {
  input: SingleProductCacheUpdateInput;
};


export type MutationProductMetaImportByProductDataMapArgs = {
  productMetaImportInput: ProductMetaImportInput;
};


export type MutationRedeemPromocodeArgs = {
  input: PromocodeRedemptionInput;
};


export type MutationRedeemVoucherArgs = {
  id?: InputMaybe<Scalars['Int']>;
  securityCode?: InputMaybe<Scalars['String']>;
};


export type MutationSavePriceFromAndNextAvailableDateArgs = {
  input: EditProductInput;
};


export type MutationSaveProductDataArgs = {
  input?: InputMaybe<ProductDataInput>;
};


export type MutationSavePromocodeArgs = {
  input: PromocodeSaveInput;
};


export type MutationStartCachingArgs = {
  input?: InputMaybe<StartCacheJobInput>;
};


export type MutationSyncProductsArgs = {
  input: SyncProductsInput;
};


export type MutationUpdateAvailabilityFarePriceArgs = {
  id: Scalars['Int'];
  input: AvailabilityFarePriceInput;
};


export type MutationUpdateBookingArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
  input: UpdateBookingDataInput;
};


export type MutationUpdateBookingContactInfoArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
  input: BookingContactInfoInput;
};


export type MutationUpdateBookingCustomerLocationArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
  input: BookingCustomerLocationInput;
};


export type MutationUpdateBookingExtraInfoArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
  message: Scalars['String'];
};


export type MutationUpdateBookingInternalNoteArgs = {
  input: BookingInternalNoteInput;
};


export type MutationUpdateBookingParticipantDetailsArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
  input: Array<BookingParticipantDetailsInput>;
};


export type MutationUpdateBookingPickupArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
  input: BookingPickupInput;
};


export type MutationUpdateCustomBookingFieldArgs = {
  id: Scalars['Int'];
  input: CustomBookingFieldsInput;
};


export type MutationUpdateDiscountRuleArgs = {
  id: Scalars['Int'];
  input: DiscountRuleInput;
};


export type MutationUpdateFareTypesArgs = {
  input: Array<FareTypeUpdateInput>;
  productId: Scalars['ID'];
};


export type MutationUpdateMapBookingFieldTypeConfigurationArgs = {
  groupId: Scalars['Int'];
  input: Array<UpdateMapBookingFieldTypeConfigurationInput>;
};


export type MutationUpdateMyCurrencyArgs = {
  preferredCurrency: Scalars['String'];
};


export type MutationUpdateMyPrivacySettingsArgs = {
  privacySettings: UserPrivacySettingsInput;
};


export type MutationUpdateProductDiscountsConfigurationArgs = {
  input: DiscountsConfigurationUpdateInput;
};


export type MutationUpdateStringBookingFieldTypeConfigurationArgs = {
  id: Scalars['Int'];
  input: StringBookingFieldTypeConfigurationInput;
};

/** Represents data regarding the next availability of a product. */
export type NextAvailableData = {
  /** The date on which the product becomes available next. */
  nextAvailableDate?: Maybe<Scalars['String']>;
  /** The starting price for the product. */
  priceFrom?: Maybe<Money>;
  /** The date and time at which the priceFrom becomes available. */
  priceFromAvailableAt?: Maybe<Scalars['String']>;
  /** The unique identifier for the product. */
  productId: Scalars['String'];
};

/** This input type represents a filter used to query for the next available date and price information. */
export type NextAvailableDateAndPriceFromFilter = {
  /** Enabled reservation providers for availability and price fetching. */
  enabledResProviders: Scalars['String'];
  /** Flag indicating whether to only enquire about availability. */
  enquireOnly: Scalars['Boolean'];
  /** Flag indicating whether to force the use of availability version 1. */
  forceAvailabilityV1: Scalars['Boolean'];
  /** Number of days to fetch price information from the current date. */
  priceFromFetchPeriodDays: Scalars['Long'];
  /** Unique identifier of the product for availability and price querying. */
  productId: Scalars['String'];
};

export type NextAvailableDateAndPricePayload = {
  availableDateAndPrice: Array<NextAvailableData>;
  hasOnlyOneVariant: Scalars['Boolean'];
  hasTwoOrMoreVariantProducts: Scalars['Boolean'];
};

export type NextAvailableDatePayload = {
  priceFrom?: Maybe<Money>;
  value: Scalars['DateTime'];
};

export type OpenDatedBookingInput = {
  dateOfPrice: Scalars['DateTime'];
};

export type OtherDetails = {
  body?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type OtherDetailsPayload = {
  body?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type PassengerDetails = {
  age?: InputMaybe<Scalars['Int']>;
  fareUUIDs?: InputMaybe<Array<InputMaybe<Uuid>>>;
  name?: InputMaybe<Scalars['String']>;
  otherDetails?: InputMaybe<Array<InputMaybe<OtherDetails>>>;
};

export type PassengerDetailsPayload = {
  age?: Maybe<Scalars['Int']>;
  fareUUIDs?: Maybe<Array<Maybe<UuidPayload>>>;
  name?: Maybe<Scalars['String']>;
  otherDetails?: Maybe<Array<Maybe<OtherDetailsPayload>>>;
};

export type Payment = {
  amount?: InputMaybe<Scalars['Float']>;
  datePaid?: InputMaybe<Scalars['DateTime']>;
  type?: InputMaybe<Scalars['String']>;
};

export type PickupDetail = {
  locationTitle: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  pickupTime?: Maybe<Scalars['String']>;
};

export type PickupDetails = {
  dropOffLocation?: InputMaybe<Scalars['String']>;
  dropOffTime?: InputMaybe<Scalars['String']>;
  dropoffNotes?: InputMaybe<Scalars['String']>;
  fareUuids?: InputMaybe<Array<InputMaybe<Uuid>>>;
  notes?: InputMaybe<Scalars['String']>;
  pickupLocation?: InputMaybe<Scalars['String']>;
  pickupTime?: InputMaybe<Scalars['String']>;
};

export type PickupDetailsPayload = {
  dropOffLocation?: Maybe<Scalars['String']>;
  dropOffTime?: Maybe<Scalars['String']>;
  dropoffNotes?: Maybe<Scalars['String']>;
  fareUuids?: Maybe<Array<Maybe<UuidPayload>>>;
  notes?: Maybe<Scalars['String']>;
  pickupLocation?: Maybe<Scalars['String']>;
  pickupTime?: Maybe<Scalars['String']>;
};

export type PickupDropOffPayload = {
  address: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  isDefault?: Maybe<Scalars['Boolean']>;
  /**  -30 mins before the departure date or +15 mins after departure date */
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  time?: Maybe<Scalars['String']>;
  type: PickupDropOffType;
};

export enum PickupDropOffType {
  Both = 'BOTH',
  DropOff = 'DROP_OFF',
  Pickup = 'PICKUP'
}

export type Price = {
  /** @deprecated this property comes from old system and should no longer be source of truth */
  fareType: FareType;
  /** @deprecated this property comes from old system and should no longer be source of truth */
  value: Money;
};

export type PriceAddOn = {
  amount?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
};

export type PriceAddOnPayload = {
  amount?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type PriceBand = {
  code: Scalars['String'];
  maxAge: Scalars['Int'];
  maxTravellers: Scalars['Int'];
  minAge: Scalars['Int'];
  minTravellers: Scalars['Int'];
  name: Scalars['String'];
  prices: Array<ProductAdminPrice>;
};

export type PriceCancellationCost = {
  amount?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
};

export type PriceCancellationCostAmount = {
  amount?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
};

export type PriceCancellationCostAmountPayload = {
  amount?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type PriceContractComm = {
  amount?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
};

export type PriceContractCommPayload = {
  amount?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type PriceContractCommTotal = {
  amount?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
};

export type PriceContractCommTotalPayload = {
  amount?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type PriceFare = {
  amount?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
};

export type PriceFarePayload = {
  amount?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type PriceFromPayload = {
  priceDate?: Maybe<Scalars['DateTime']>;
  value: Money;
};

export type PriceLineItemCommissionTotal = {
  amount?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
};

export type PriceLineItemCommissionTotalPayload = {
  amount?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type PriceLineItemGrossPerUnit = {
  amount?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
};

export type PriceLineItemGrossPerUnitPayload = {
  amount?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type PriceLineItemGrossTotal = {
  amount?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
};

export type PriceLineItemGrossTotalPayload = {
  amount?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type PriceLineItemNetPerUnit = {
  amount?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
};

export type PriceLineItemNetPerUnitPayload = {
  amount?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type PriceLineItemNetTotal = {
  amount?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
};

export type PriceLineItemNetTotalPayload = {
  amount?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type PriceLineItemsGrossTotal = {
  amount?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
};

export type PriceLineItemsGrossTotalPayload = {
  amount?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type PriceLineItemsNetTotal = {
  amount?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
};

export type PriceLineItemsNetTotalPayload = {
  amount?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type PriceRange = {
  currencyCode: Scalars['String'];
  from: Scalars['Float'];
  to: Scalars['Float'];
};

export type PriceResSupplied = {
  amount?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
};

export type PriceResSuppliedComm = {
  amount?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
};

export type PriceResSuppliedCommPayload = {
  amount?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type PriceResSuppliedCommTotal = {
  amount?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
};

export type PriceResSuppliedCommTotalPayload = {
  amount?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type PriceResSuppliedGrandTotal = {
  amount?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
};

export type PriceResSuppliedGrandTotalPayload = {
  amount?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type PriceResSuppliedNetGrandTotal = {
  amount?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
};

export type PriceResSuppliedNetGrandTotalPayload = {
  amount?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type PriceResSuppliedPayload = {
  amount?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type Product = {
  /**  Product FAQ */
  address?: Maybe<ProductAddress>;
  /** @deprecated this property comes from old system and should no longer be source of truth */
  availability?: Maybe<ProductAvailability>;
  benefits?: Maybe<TextContent>;
  bookingRequired?: Maybe<Scalars['Boolean']>;
  /** @deprecated use Product.duration.label */
  bpd_activityHr?: Maybe<Scalars['String']>;
  /** @deprecated use Product.legacy.bookingUrl, disabled in admin, almost always null */
  bpd_bookingUrl?: Maybe<Scalars['String']>;
  /** @deprecated use Product.legacy.countDownLimit */
  bpd_countDownLimit?: Maybe<Scalars['Int']>;
  /** @deprecated use Product.legacy.updatedAt */
  bpd_createdAt?: Maybe<Scalars['DateTime']>;
  /** @deprecated use Product.legacy.defaultDeparturePoint */
  bpd_defaultDeparturePoint?: Maybe<Scalars['String']>;
  /** @deprecated use Product.legacy.displayPrice */
  bpd_displayPrice?: Maybe<Bpd_DisplayPrice>;
  /** @deprecated use Product.legacy.excludedBookingInfo, disabled in admin, almost always null */
  bpd_excludedBookingInfo?: Maybe<Scalars['String']>;
  /** @deprecated use Product.legacy.forceAvailabilityV1 */
  bpd_forceAvailabilityV1?: Maybe<Scalars['Boolean']>;
  /** @deprecated use Product.legacy.hasNoIndexMetaTag */
  bpd_hasNoIndexMetaTag?: Maybe<Scalars['Boolean']>;
  /** @deprecated use Product.legacy.hidePickupOnFrontend */
  bpd_hidePickupOnFrontend?: Maybe<Scalars['Boolean']>;
  /** @deprecated use Product.legacy.isDisplayAfterpay */
  bpd_isDisplayAfterpay?: Maybe<Scalars['Boolean']>;
  /** @deprecated use Product.legacy.isDisplayApplePay */
  bpd_isDisplayApplePay?: Maybe<Scalars['Boolean']>;
  /** @deprecated use Product.legacy.isDisplayGooglePay */
  bpd_isDisplayGooglePay?: Maybe<Scalars['Boolean']>;
  /** @deprecated use Product.legacy.isDisplayHotelPickupWarning */
  bpd_isDisplayHotelPickupWarning?: Maybe<Scalars['Boolean']>;
  /** @deprecated use Product.legacy.isDisplayPaypal */
  bpd_isDisplayPaypal?: Maybe<Scalars['Boolean']>;
  /** @deprecated use Product.title */
  bpd_name?: Maybe<Scalars['String']>;
  /** @deprecated use Product.legacy.openDatedBooking */
  bpd_openDatedBooking?: Maybe<Scalars['Boolean']>;
  /** @deprecated use Product.partner  */
  bpd_partner?: Maybe<Bpd_Partner>;
  /** @deprecated use Product.legacy.priceFrom */
  bpd_priceFrom?: Maybe<Money>;
  /** @deprecated use Product.legacy.recommendedRetailPrice */
  bpd_recommendedRetailPrice?: Maybe<Money>;
  /** @deprecated use Product.labels */
  bpd_ribbon?: Maybe<Bpd_DealRibbon>;
  /** @deprecated use Product.legacy.shortId, reference only field, use Product.productId where possible */
  bpd_shortId: Scalars['Int'];
  /** @deprecated use Product.legacy.showMerchant */
  bpd_showMerchant?: Maybe<Scalars['Boolean']>;
  /** @deprecated use Product.legacy.subheader */
  bpd_subheader?: Maybe<Scalars['String']>;
  /** @deprecated use Product.uri */
  bpd_uri?: Maybe<Bpd_Uri>;
  /**  Travel Instructions (how to get there information) */
  cancellationPolicy?: Maybe<TextContent>;
  categories?: Maybe<Array<ProductCategoryEdge>>;
  discounts?: Maybe<Array<ProductDiscount>>;
  duration?: Maybe<ProductDuration>;
  /**  Indicate whether booking is required, if false then user will directly come to payment after choosing a product */
  enquireOnly?: Maybe<Scalars['Boolean']>;
  /**  Product Benefits (why we love this) */
  exclusions?: Maybe<TextContent>;
  /**  Product pickup Details, default one will be the 1st and rest items are ordered by name */
  faqs?: Maybe<Array<Maybe<ProductFaq>>>;
  fullDescription?: Maybe<TextContent>;
  /**  Product address or merchant address if product address is not available */
  icons?: Maybe<Array<Maybe<ProductIcon>>>;
  images?: Maybe<ProductImagesInfo>;
  /**  Indicate a product only support enquire support team to book */
  instantConfirmation?: Maybe<Scalars['Boolean']>;
  /**
   * Variant products, if product has sub-products. At the moment, Products returned as variants will have only limited number of fields populated, e.g. productId and title
   * Intrinsic property used by product purchasing or search
   */
  isMaster?: Maybe<Scalars['Boolean']>;
  itinerary?: Maybe<ProductItinerary>;
  labels?: Maybe<Array<Scalars['String']>>;
  legacy?: Maybe<ProductLegacy>;
  location?: Maybe<ProductLocation>;
  nextAvailableDate?: Maybe<Scalars['String']>;
  /**  Product duration, supports duration range (e.g. from 1 to 2 hours). Maximum value may be absent for durations without a range */
  numberOfBookings?: Maybe<Scalars['Int']>;
  /**  Product relation to other products */
  parentProduct?: Maybe<Product>;
  /**  not optimized - do not batch */
  partner?: Maybe<Merchant>;
  pickupDetails?: Maybe<Array<PickupDetail>>;
  /**  Money relative items */
  priceFrom?: Maybe<Money>;
  /**  Travello reward credit points a customer may earn */
  priceFromAnP?: Maybe<Money>;
  /**  Unique product identifier (UUID) */
  productId: Scalars['ID'];
  ratingScore?: Maybe<Scalars['Float']>;
  /**
   *  Product review, not optimized - do not batch
   * @deprecated querying reviewDetail is no longer supported
   */
  recentReviews?: Maybe<Array<ReviewDetail>>;
  recommendedRetailPrice?: Maybe<Money>;
  /** @deprecated relativeUrl is deprecated, use uri.url instead, the only difference between relativeUrl and uri.url is that relativeUrl has no / as prefix */
  relativeUrl?: Maybe<Scalars['String']>;
  resSystemType?: Maybe<Scalars['String']>;
  /**  Discounts applied to a product */
  rewardPointsToEarn?: Maybe<Scalars['Int']>;
  /**  Product content */
  shortDescription?: Maybe<TextContent>;
  status?: Maybe<Scalars['String']>;
  supplierTermsAndConditions?: Maybe<TextContent>;
  termsAndConditions?: Maybe<TextContent>;
  /**  whether a product could instantly confirmed */
  title?: Maybe<Scalars['String']>;
  totalReviews?: Maybe<Scalars['Int']>;
  travelInstructions?: Maybe<TextContent>;
  uri?: Maybe<Uri>;
  /**  Parent product, if there is one. At the moment, Product returned as a parent will have only limited number of fields populated, e.g. productId and title */
  variantProducts?: Maybe<Array<Product>>;
  /**  Product Icons and the associated names and hints, order is customized by CMS */
  videos?: Maybe<Array<Maybe<ProductVideo>>>;
};


export type ProductAvailabilityArgs = {
  days?: InputMaybe<Scalars['Int']>;
  month?: InputMaybe<Scalars['Int']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  targetCurrency?: InputMaybe<Scalars['String']>;
};


export type ProductImagesArgs = {
  first?: InputMaybe<Scalars['Int']>;
};


export type ProductRecentReviewsArgs = {
  first?: InputMaybe<Scalars['Int']>;
};

export type ProductAddress = {
  address?: Maybe<Scalars['String']>;
};

export type ProductAdminPrice = {
  amount: Scalars['String'];
  currency: Scalars['String'];
  deposit: Scalars['String'];
  promotions: Array<Promotion>;
};

export type ProductAdminServiceCategory = {
  categoryType: CategoryType;
  href: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type ProductAdminServiceDeparture = {
  href: Scalars['String'];
  id: Scalars['String'];
};

export type ProductAdminServiceImage = {
  imageHref?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type ProductAdminServiceItinerary = {
  href: Scalars['String'];
  id: Scalars['String'];
  validDuringRanges: Array<ValidDuringRange>;
  variationId: Scalars['String'];
};

export type ProductAdminServicePromotion = {
  href: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type ProductAvailability = {
  /**
   * Get the value of calendar.
   * @deprecated this property comes from old system and should no longer be source of truth
   */
  availableDates: Array<AvailableDate>;
  /**
   * Get the value of maximumUnitOrder.
   * @deprecated No longer supported
   */
  maximumUnitOrder?: Maybe<Scalars['Int']>;
  /**
   * Get the value of minimumUnitOrder.
   * @deprecated No longer supported
   */
  minimumUnitOrder: Scalars['Int'];
  /** @deprecated this property comes from old system and should no longer be source of truth */
  nextAvailableDate?: Maybe<Scalars['DateTime']>;
  /** @deprecated this property comes from old system and should no longer be source of truth */
  startDate: Scalars['DateTime'];
};

export type ProductCategory = {
  id: Scalars['ID'];
  image?: Maybe<Image>;
  metaData?: Maybe<ProductGroupMetaData>;
  name: Scalars['String'];
  uniqueName: Scalars['String'];
  uri?: Maybe<Uri>;
};

export type ProductCategoryEdge = {
  category: ProductCategory;
  categoryId: Scalars['ID'];
  /**  indicates if this Category is a main category for this product */
  isMainCategory: Scalars['Boolean'];
  /** @deprecated use category.name */
  title: Scalars['String'];
  /** @deprecated use category.uniqueName */
  uniqueName: Scalars['String'];
};

export type ProductCategoryWithStatistic = ProductStatistic & {
  category: ProductCategory;
  id: Scalars['ID'];
  /** @deprecated use category.name */
  name: Scalars['String'];
  productCount: Scalars['Int'];
  /** @deprecated use category.uniqueName */
  uniqueName: Scalars['String'];
};

export type ProductCity = {
  country?: Maybe<ProductCountry>;
  id: Scalars['ID'];
  image?: Maybe<Image>;
  metaData?: Maybe<ProductGroupMetaData>;
  name: Scalars['String'];
  region?: Maybe<ProductRegion>;
  uniqueName: Scalars['String'];
  uri?: Maybe<Uri>;
};

export type ProductCityWithStatistic = ProductStatistic & {
  city: ProductCity;
  id: Scalars['ID'];
  /** @deprecated use city.name */
  name: Scalars['String'];
  productCount: Scalars['Int'];
  /** @deprecated use city.uniqueName */
  uniqueName: Scalars['String'];
};

/**  define pagination according to https://relay.dev/graphql/connections.htm */
export type ProductConnection = {
  edges?: Maybe<Array<Maybe<ProductEdge>>>;
  limitOffsetPageInfo?: Maybe<LimitOffsetPageInfo>;
};

export type ProductCountry = {
  id: Scalars['ID'];
  image?: Maybe<Image>;
  name: Scalars['String'];
  uniqueName: Scalars['String'];
  uri?: Maybe<Uri>;
};

export type ProductCountryWithStatistic = ProductStatistic & {
  country: ProductCountry;
  id: Scalars['ID'];
  /** @deprecated use country.name */
  name: Scalars['String'];
  productCount: Scalars['Int'];
  /** @deprecated use country.uniqueName */
  uniqueName: Scalars['String'];
};

export type ProductDataInput = {
  categories?: InputMaybe<CategoryDataInput>;
  cities?: InputMaybe<CityDataInput>;
  currencyCode?: InputMaybe<Scalars['String']>;
  /**  List of channel hosts where this product will be excluded */
  excludedChannelHosts?: InputMaybe<Array<Scalars['String']>>;
  /**  The global discount of a product */
  globalDiscount?: InputMaybe<Scalars['Float']>;
  productId: Scalars['String'];
};

export type ProductDataMap = {
  key: Scalars['String'];
  value: Scalars['String'];
};

export type ProductDataPayload = {
  isProviderSupported?: Maybe<Scalars['Boolean']>;
  resSystemType?: Maybe<ResSystemType>;
  summary?: Maybe<AvailabilityAndPricingSummaryPayload>;
};

export type ProductDataRetrievalResponse = {
  advertisedDepartures: Array<AdvertisedDeparture>;
  bookingCompanies: Array<BookingCompany>;
  categories: Array<ProductAdminServiceCategory>;
  departuresEndDate: Scalars['String'];
  departuresStartDate: Scalars['String'];
  description: Scalars['String'];
  details: Array<Detail>;
  geography?: Maybe<Geography>;
  href: Scalars['String'];
  id: Scalars['String'];
  images?: Maybe<Array<ProductAdminServiceImage>>;
  name: Scalars['String'];
  productLine: Scalars['String'];
  slug: Scalars['String'];
  structuredItineraries: Array<ProductAdminServiceItinerary>;
};

export type ProductDateRange = {
  endDate?: InputMaybe<Scalars['Date']>;
  startDate?: InputMaybe<Scalars['Date']>;
};

export type ProductDetails = {
  baseVariantName?: InputMaybe<Scalars['String']>;
  fareSelectionUUID?: InputMaybe<Uuid>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  openingHours?: InputMaybe<Scalars['String']>;
  otherDetails?: InputMaybe<Array<InputMaybe<OtherDetails>>>;
  startTime?: InputMaybe<Scalars['String']>;
};

export type ProductDetailsPayload = {
  baseVariantName?: Maybe<Scalars['String']>;
  fareSelectionUUID?: Maybe<UuidPayload>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  openingHours?: Maybe<Scalars['String']>;
  otherDetails?: Maybe<Array<Maybe<OtherDetailsPayload>>>;
  startTime?: Maybe<Scalars['String']>;
};

export type ProductDiscount = {
  discountAmount: Money;
  discountType: ProductDiscountType;
  displayName?: Maybe<Scalars['String']>;
};

export enum ProductDiscountType {
  TravelloDiscount = 'TRAVELLO_DISCOUNT',
  TravelloRewards = 'TRAVELLO_REWARDS'
}

export type ProductDiscountsConfigurationPayload = {
  commissionType: CommissionDiscountType;
  fareDiscounts: Array<FareDiscountValuesPayload>;
};

export type ProductDuration = {
  /**  raw duration */
  label?: Maybe<Scalars['String']>;
  /**  maximum duration in ISO Duration standard */
  maxDuration?: Maybe<Scalars['String']>;
  /**  minimum duration in ISO Duration standard */
  minDuration?: Maybe<Scalars['String']>;
};

export type ProductEdge = {
  cursor: Scalars['String'];
  node: Product;
};

export type ProductFaq = {
  answer: TextContent;
  question: Scalars['String'];
};

export type ProductFilter = {
  categoryNames?: InputMaybe<Array<Scalars['String']>>;
  categoryUniqueNames?: InputMaybe<Array<Scalars['String']>>;
  /**  use the current channel host to get the products that is only included in that channel */
  channelHostFilter?: InputMaybe<Scalars['String']>;
  /** use cityNames to do freetext match, for example "Brsibane" could match both "Brsibane" and "Brisbane City" */
  cityNames?: InputMaybe<Array<Scalars['String']>>;
  /**  use uniqueName to do precise match */
  cityUniqueNames?: InputMaybe<Array<Scalars['String']>>;
  countryNames?: InputMaybe<Array<Scalars['String']>>;
  countryUniqueNames?: InputMaybe<Array<Scalars['String']>>;
  /**  filter by labels */
  dateRange?: InputMaybe<ProductDateRange>;
  durationRange?: InputMaybe<DurationRange>;
  includeChildren?: Scalars['Boolean'];
  includeHiddenFromSearch?: Scalars['Boolean'];
  labelNames?: InputMaybe<Array<Scalars['String']>>;
  locationFilter?: InputMaybe<ProductLocationFilter>;
  priceRange?: InputMaybe<PriceRange>;
  productIds?: InputMaybe<Array<Scalars['String']>>;
  regionNames?: InputMaybe<Array<Scalars['String']>>;
  regionUniqueNames?: InputMaybe<Array<Scalars['String']>>;
  slug?: InputMaybe<Scalars['String']>;
  /**  free text query based on prefix, support multiple words, sort by match score, query targets include title/city/country/category of a product */
  textQuery?: InputMaybe<TextQuery>;
};

export type ProductGroup = {
  groupIdentifier: Scalars['ID'];
  groupName?: Maybe<Scalars['String']>;
  products: Array<Product>;
};

export enum ProductGroupBy {
  Category = 'CATEGORY'
}

export type ProductGroupMetaData = {
  priority?: Maybe<Scalars['Int']>;
};

export type ProductIcon = {
  hints?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  src?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type ProductImage = {
  image?: Maybe<Image>;
  isMainImage?: Maybe<Scalars['Boolean']>;
  position?: Maybe<Scalars['Int']>;
  productImageId: Scalars['ID'];
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ProductImagesInfo = {
  productImages?: Maybe<Array<ProductImage>>;
  totalCount: Scalars['Int'];
};

export type ProductItinerary = {
  itineraryItems?: Maybe<Array<Maybe<ProductItineraryItem>>>;
  tourEndCoordinate?: Maybe<Coordinate>;
  tourEndLocationTitle?: Maybe<Scalars['String']>;
  tourStartCoordinate?: Maybe<Coordinate>;
  tourStartLocationTitle?: Maybe<Scalars['String']>;
};

export type ProductItineraryItem = {
  coordinate?: Maybe<Coordinate>;
  description?: Maybe<TextContent>;
  locationTitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ProductLegacy = {
  bookingUrl?: Maybe<Scalars['String']>;
  closeBooking?: Maybe<Scalars['Int']>;
  countDownLimit?: Maybe<Scalars['Int']>;
  defaultDeparturePoint?: Maybe<Scalars['String']>;
  displayPrice?: Maybe<ProductLegacyDisplayPrice>;
  excludedBookingInfo?: Maybe<Scalars['String']>;
  forceAvailabilityV1?: Maybe<Scalars['Boolean']>;
  hasNoIndexMetaTag?: Maybe<Scalars['Boolean']>;
  hidePickupOnFrontend?: Maybe<Scalars['Boolean']>;
  isDisplayAfterpay?: Maybe<Scalars['Boolean']>;
  isDisplayApplePay?: Maybe<Scalars['Boolean']>;
  isDisplayGooglePay?: Maybe<Scalars['Boolean']>;
  isDisplayHotelPickupWarning?: Maybe<Scalars['Boolean']>;
  isDisplayPaypal?: Maybe<Scalars['Boolean']>;
  openDatedBooking?: Maybe<Scalars['Boolean']>;
  priceFrom?: Maybe<Money>;
  recommendedRetailPrice?: Maybe<Money>;
  shortId?: Maybe<Scalars['ID']>;
  showMerchant?: Maybe<Scalars['Boolean']>;
  subheader?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProductLegacyDisplayPrice = {
  adultPrice?: Maybe<ProductLegacyPrice>;
  childPrice?: Maybe<ProductLegacyPrice>;
  familyPrice?: Maybe<ProductLegacyPrice>;
};

export type ProductLegacyPrice = {
  price?: Maybe<Money>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Money>;
};

/**  currently one product could have multiple cities and only one coordinate that belongs to the 1st city */
export type ProductLocation = {
  allCityLocations?: Maybe<Array<GeoLocation>>;
  city?: Maybe<Scalars['String']>;
  coordinate?: Maybe<Coordinate>;
  country?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
};

export type ProductLocationFilter = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  radiusInKm?: InputMaybe<Scalars['Int']>;
};

/** these models for metadata */
export type ProductMetaImportInput = {
  productDataMap: Array<InputMaybe<ProductDataMap>>;
  productId: Scalars['String'];
  resSystemType: ResSystemType;
};

export type ProductMetaImportPayload = {
  productId: Scalars['String'];
  resSystemType: ResSystemType;
};

export type ProductPayload = {
  ageMax?: Maybe<Scalars['Int']>;
  ageMin?: Maybe<Scalars['Int']>;
  catalogue?: Maybe<CataloguePayload>;
  catalogueProductId?: Maybe<Scalars['Int']>;
  categories?: Maybe<Array<Maybe<CategoryPayload>>>;
  channel?: Maybe<ChannelPayload>;
  commissionPerc?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['DateTime']>;
  currencies?: Maybe<Array<Maybe<Scalars['String']>>>;
  demo?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  distance?: Maybe<Scalars['Float']>;
  distributor?: Maybe<DistributorPayload>;
  dropoffNotes?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  durationRangeMax?: Maybe<Scalars['Int']>;
  durationStr?: Maybe<Scalars['String']>;
  groupSizeMax?: Maybe<Scalars['Int']>;
  highlights?: Maybe<HighlightsPayload>;
  id?: Maybe<Scalars['Int']>;
  images?: Maybe<Array<Maybe<ImagePayload>>>;
  inclusions?: Maybe<InclusionsPayload>;
  itinerary?: Maybe<ItineraryPayload>;
  locationsEnd?: Maybe<Array<Maybe<LocationPayload>>>;
  locationsStart?: Maybe<Array<Maybe<LocationPayload>>>;
  modified?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  nameOriginal?: Maybe<Scalars['String']>;
  netRatesMarkupPerc?: Maybe<Scalars['String']>;
  operatedBy?: Maybe<Scalars['String']>;
  operatingDays?: Maybe<Scalars['Int']>;
  operatingDaysStr?: Maybe<Scalars['String']>;
  operatingLanguages?: Maybe<Array<Maybe<Scalars['String']>>>;
  operatingSchedule?: Maybe<Scalars['String']>;
  pickupNotes?: Maybe<Scalars['String']>;
  redemptionNotes?: Maybe<Scalars['String']>;
  resSystem?: Maybe<Scalars['String']>;
  specialNotes?: Maybe<Scalars['String']>;
  supplier?: Maybe<SupplierBasicPayload>;
  timeStart?: Maybe<Scalars['String']>;
  timeStartRangeMax?: Maybe<Scalars['String']>;
  usesNetRates?: Maybe<Scalars['Boolean']>;
  v1Cid?: Maybe<Scalars['Int']>;
};

export type ProductRegion = {
  country?: Maybe<ProductCountry>;
  id: Scalars['ID'];
  name: Scalars['String'];
  uniqueName: Scalars['String'];
};

export type ProductRegionWithStatistic = ProductStatistic & {
  id: Scalars['ID'];
  /** @deprecated use region.name */
  name: Scalars['String'];
  productCount: Scalars['Int'];
  region: ProductRegion;
  /** @deprecated use region.uniqueName */
  uniqueName: Scalars['String'];
};

export type ProductRelatedDataPayload = {
  optionName?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ProductSelection = {
  currency?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['String']>;
  productId?: InputMaybe<Scalars['String']>;
};

export type ProductSelectionPayload = {
  ageMax?: Maybe<Scalars['Int']>;
  ageMin?: Maybe<Scalars['Int']>;
  catalogue?: Maybe<CataloguePayload>;
  catalogueProductId?: Maybe<Scalars['Int']>;
  categories?: Maybe<Array<Maybe<CategoryPayload>>>;
  channel?: Maybe<ChannelPayload>;
  commissionPerc?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['DateTime']>;
  currency?: Maybe<Scalars['String']>;
  demo?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  distance?: Maybe<Scalars['Float']>;
  distributor?: Maybe<DistributorPayload>;
  dropoffNotes?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  durationRangeMax?: Maybe<Scalars['Int']>;
  durationStr?: Maybe<Scalars['String']>;
  groupSizeMax?: Maybe<Scalars['Int']>;
  highlights?: Maybe<HighlightsPayload>;
  id?: Maybe<Scalars['Int']>;
  images?: Maybe<Array<Maybe<ImagePayload>>>;
  inclusions?: Maybe<InclusionsPayload>;
  itinerary?: Maybe<ItineraryPayload>;
  locationsEnd?: Maybe<Array<Maybe<LocationPayload>>>;
  locationsStart?: Maybe<Array<Maybe<LocationPayload>>>;
  modified?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  nameOriginal?: Maybe<Scalars['String']>;
  netRatesMarkupPerc?: Maybe<Scalars['String']>;
  operatedBy?: Maybe<Scalars['String']>;
  operatingDays?: Maybe<Scalars['Int']>;
  operatingDaysStr?: Maybe<Scalars['String']>;
  operatingLanguages?: Maybe<Array<Maybe<Scalars['String']>>>;
  operatingSchedule?: Maybe<Scalars['String']>;
  pickupNotes?: Maybe<Scalars['String']>;
  redemptionNotes?: Maybe<Scalars['String']>;
  resSystem?: Maybe<Scalars['String']>;
  specialNotes?: Maybe<Scalars['String']>;
  supplier?: Maybe<SupplierBasicPayload>;
  timeStart?: Maybe<Scalars['String']>;
  timeStartRangeMax?: Maybe<Scalars['String']>;
  usesNetRates?: Maybe<Scalars['Boolean']>;
  v1Cid?: Maybe<Scalars['Int']>;
};

export enum ProductSortOrder {
  /** TOP product, discount percentage in desc order, product id in desc order */
  Default = 'DEFAULT',
  /** Sort by distance from target location(city) */
  Location = 'LOCATION',
  /** Sort by number of bookings */
  MostBought = 'MOST_BOUGHT',
  /** Uses a combination of fields, e.g. Featured products first, sort by Discount in desc order, etc */
  Popular = 'POPULAR',
  /** sort by price from high to low */
  PriceHighToLow = 'PRICE_HIGH_TO_LOW',
  /** sort by price from low to high */
  PriceLowToHigh = 'PRICE_LOW_TO_HIGH',
  /** Sort by flag of TOP_PRODUCT and updatedAt(DESC) */
  TopProduct = 'TOP_PRODUCT'
}

export type ProductStatistic = {
  id: Scalars['ID'];
  name: Scalars['String'];
  productCount: Scalars['Int'];
  uniqueName: Scalars['String'];
};

export type ProductStatistics = {
  categoryStatistic?: Maybe<Array<ProductCategoryWithStatistic>>;
  cityStatistic?: Maybe<Array<ProductCityWithStatistic>>;
  countryStatistic?: Maybe<Array<ProductCountryWithStatistic>>;
  regionStatistic?: Maybe<Array<ProductRegionWithStatistic>>;
};

export type ProductVideo = {
  url?: Maybe<Scalars['String']>;
};

export type ProfileUser = {
  user: User;
};

export enum PromocodeApplicationType {
  PerCart = 'PER_CART',
  PerPerson = 'PER_PERSON'
}

export type PromocodeAvailabilityPayload = {
  errors: Array<PromocodeRedemptionError>;
};

export enum PromocodeDiscountType {
  Amount = 'AMOUNT',
  Percent = 'PERCENT'
}

export type PromocodeEdge = {
  cursor: Scalars['String'];
  node: PromocodePayload;
};

export type PromocodeLimitOffsetPageInfo = {
  totalCount: Scalars['Int'];
};

export enum PromocodeListAllowedColumns {
  Code = 'CODE',
  CurrencyId = 'CURRENCY_ID',
  DiscountType = 'DISCOUNT_TYPE',
  End = 'END',
  Id = 'ID',
  Name = 'NAME',
  Quantity = 'QUANTITY',
  Start = 'START',
  Type = 'TYPE',
  UsedCount = 'USED_COUNT',
  Value = 'VALUE'
}

export type PromocodeListConnection = {
  edges: Array<Maybe<PromocodeEdge>>;
  limitOffsetPageInfo: PromocodeLimitOffsetPageInfo;
};

export type PromocodeListSearchInput = {
  nameOrCode?: InputMaybe<Scalars['String']>;
  parentOnly?: Scalars['Boolean'];
  status?: InputMaybe<PromocodeListStatus>;
};

export type PromocodeListSortInput = {
  column?: PromocodeListAllowedColumns;
  sortOrder?: PromocodeListSortOrder;
};

export enum PromocodeListSortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum PromocodeListStatus {
  Active = 'ACTIVE',
  Expired = 'EXPIRED'
}

export enum PromocodeLocationLeaf {
  City = 'CITY',
  Country = 'COUNTRY',
  Region = 'REGION'
}

/** Types */
export type PromocodePayload = {
  active: Scalars['Boolean'];
  application: PromocodeApplicationType;
  categoryId?: Maybe<Scalars['String']>;
  code: Scalars['String'];
  currencyId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  discountType: PromocodeDiscountType;
  end: Scalars['DateTime'];
  excludedProductIds?: Maybe<Array<Scalars['String']>>;
  id: Scalars['Int'];
  isPartOfSpecialPromotion?: Maybe<Scalars['Boolean']>;
  locationId?: Maybe<Scalars['String']>;
  locationType?: Maybe<PromocodeLocationLeaf>;
  minimumOrderAmount?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  nonDiscountOffersOnly: Scalars['Boolean'];
  productIds?: Maybe<Array<Scalars['String']>>;
  quantity: Scalars['Int'];
  specialPromotionId?: Maybe<Scalars['String']>;
  start: Scalars['DateTime'];
  type: PromocodeType;
  uniquePerUser: Scalars['Boolean'];
  usedCount: Scalars['Int'];
  value: Scalars['Int'];
};

export type PromocodePaymentDetailsPayload = {
  application: PromocodeApplicationType;
  code: Scalars['String'];
  discountType: PromocodeDiscountType;
  name: Scalars['String'];
  value: Scalars['Int'];
};

export enum PromocodeRedemptionError {
  InvalidPromocode = 'INVALID_PROMOCODE',
  Used = 'USED',
  UserAlreadyRedeemed = 'USER_ALREADY_REDEEMED'
}

export type PromocodeRedemptionInput = {
  code: Scalars['String'];
  userEmailId: Scalars['String'];
};

export type PromocodeRedemptionPayload = {
  errors: Array<PromocodeRedemptionError>;
  redeemed: Scalars['Boolean'];
};

/** Inputs */
export type PromocodeSaveInput = {
  active: Scalars['Boolean'];
  application: PromocodeApplicationType;
  categoryId?: InputMaybe<Scalars['String']>;
  /** Id input can be null for an insert or non null for an update */
  code?: InputMaybe<Scalars['String']>;
  currencyId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  discountType: PromocodeDiscountType;
  end: Scalars['DateTime'];
  excludedProductIds?: Array<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  isPartOfSpecialPromotion?: InputMaybe<Scalars['Boolean']>;
  locationId?: InputMaybe<Scalars['String']>;
  locationType?: InputMaybe<PromocodeLocationLeaf>;
  minimumOrderAmount?: InputMaybe<Scalars['Int']>;
  /** Code input can be null to autogenerate a code */
  name: Scalars['String'];
  nonDiscountOffersOnly: Scalars['Boolean'];
  productIds?: Array<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Int']>;
  specialPromotionId?: InputMaybe<Scalars['String']>;
  start: Scalars['DateTime'];
  type: PromocodeType;
  uniquePerUser: Scalars['Boolean'];
  /** defaults to 0 */
  value: Scalars['Int'];
};

export type PromocodeSavePayload = {
  /**  Database ID */
  code: Scalars['String'];
  id: Scalars['Int'];
};

export enum PromocodeType {
  Multiple = 'MULTIPLE',
  Parent = 'PARENT'
}

export enum PromocodeValidationError {
  /** Products GEO doesn't match promocode geo requirements */
  CategoryWrong = 'CATEGORY_WRONG',
  /** Product discounted. Promocode requirement doesn't allow discounts */
  CurrencyWrong = 'CURRENCY_WRONG',
  DisabledPromocode = 'DISABLED_PROMOCODE',
  /** Products Category doesn't match promocode category requirements */
  DiscountNotAllowed = 'DISCOUNT_NOT_ALLOWED',
  /** Can't find the promocode */
  ExpiredPromocode = 'EXPIRED_PROMOCODE',
  /** All the available count have been used up. ie  count == used */
  GeoWrong = 'GEO_WRONG',
  /** Product is in the exclusion list of the promocode requirement */
  InvalidPromocode = 'INVALID_PROMOCODE',
  /** Currency specified doesn't match promocode requirement */
  MinimumOrderNotMet = 'MINIMUM_ORDER_NOT_MET',
  /** Product is not in the inclusion list of the promocode requirement */
  ProductExcluded = 'PRODUCT_EXCLUDED',
  /** Miniumn order amount is not met as per the promocode requirement */
  ProductNotIncluded = 'PRODUCT_NOT_INCLUDED',
  /** Promocode disabled by the promocode admin */
  UsedCompletely = 'USED_COMPLETELY'
}

export type PromocodeValidationInput = {
  categoryIds: Array<Scalars['String']>;
  cityId: Scalars['String'];
  code: Scalars['String'];
  countryId: Scalars['String'];
  /**  or multiple product ids */
  currencyId: Scalars['String'];
  isDiscountedPrice: Scalars['Boolean'];
  productId: Scalars['String'];
  /** Need all the ids to match the geo leaf */
  regionId: Scalars['String'];
  totalPrice: Scalars['Float'];
};

export type PromocodeValidationPayload = {
  details?: Maybe<PromocodePaymentDetailsPayload>;
  /** Able to apply the promocode with the below details */
  error?: Maybe<PromocodeValidationError>;
  success: Scalars['Boolean'];
};

export type Promotion = {
  amount: Scalars['String'];
  href: Scalars['String'];
  id: Scalars['String'];
};

export type Query = {
  GetProductData?: Maybe<ProductDataRetrievalResponse>;
  HelloWorldTestEndpoint?: Maybe<Scalars['String']>;
  allCategories: Array<ProductCategory>;
  allCities: Array<ProductCity>;
  allCountries: Array<ProductCountry>;
  allRegions: Array<ProductRegion>;
  /**  General  */
  availability?: Maybe<AvailabilityDataPayload>;
  availabilityFarePrice?: Maybe<Array<AvailabilityFarePricePayload>>;
  availablePromocode?: Maybe<PromocodeAvailabilityPayload>;
  /**  User flow | General endpoints  */
  booking: BookingDataPayload;
  /**  User flow | Contact Info page endpoints */
  bookingContactInfo?: Maybe<BookingContactInfoPayload>;
  bookingCustomerLocation?: Maybe<BookingCustomerLocationPayload>;
  bookingExtraInfo?: Maybe<BookingExtraInfoPayload>;
  /** @deprecated No longer supported */
  bookingInternalNote: Array<BookingInternalNotePayload>;
  bookingParticipantDetails?: Maybe<Array<Maybe<BookingParticipantDetailsPayload>>>;
  bookingPickup?: Maybe<BookingPickupPayload>;
  bookingPricing: BookingPricingPayload;
  bookingReferrals: BookingReferrals;
  bpd_blog: Bpd_Blog;
  bpd_bookingFields?: Maybe<Bpd_BookingFields>;
  bpd_channelByHost: Bpd_Channel;
  /** id should come straight from BPD_Channel.id, id format may change */
  bpd_channelById?: Maybe<Bpd_Channel>;
  bpd_channels: Array<Bpd_Channel>;
  bpd_clientInfo?: Maybe<Bpd_ClientInfo>;
  /** @deprecated use Query.productStatistics */
  bpd_homeCategories: Array<Bpd_Category>;
  /** @deprecated use Query.productStatistics */
  bpd_homeCountries: Array<Bpd_Country>;
  /** @deprecated use Query.products */
  bpd_homeLocalDeals: Bpd_HomeLocalDeals;
  /** @deprecated use Query.products */
  bpd_lastMinuteDeals: Array<Product>;
  bpd_orderById?: Maybe<Bpd_Order>;
  /** @deprecated use Query.productStatistics */
  bpd_otherSearch: Bpd_OtherSearch;
  bpd_page?: Maybe<Bpd_Page>;
  /** @deprecated use Query.products */
  bpd_products?: Maybe<ProductConnection>;
  bpd_redirect?: Maybe<Bpd_Redirect>;
  bpd_seoData: Bpd_SeoData;
  bpd_userOrders: Bpd_UserOrders;
  /** @deprecated No longer supported */
  createOrQuoteBooking?: Maybe<BookingResponse>;
  /**  Per product configurations */
  customBookingFields: Array<CustomBookingFieldsPayload>;
  customBookingFieldsMapTypeConfiguration: Array<MapBookingFieldTypeConfigurationPayload>;
  customBookingFieldsStringTypeConfiguration: Array<StringBookingFieldTypeConfigurationPayload>;
  /**
   *  Livn
   * @deprecated livn is not supported
   */
  departureSelection?: Maybe<ProductSelectionPayload>;
  /**  Admin Only  */
  discountRule?: Maybe<Array<DiscountRulePayload>>;
  exportSearchBooking?: Maybe<SearchBookingExportPayload>;
  fareType: Array<Maybe<FareTypePayload>>;
  findPromocodeById?: Maybe<PromocodePayload>;
  /**  PDF/Email related endpoints  */
  getBookingConfirmationSignedUrl: BookingConfirmationResponse;
  imgTransformImage: Image;
  importRemoteDeals?: Maybe<ImportRemoteDealsResponse>;
  listPromocodes: PromocodeListConnection;
  mapBookingFieldTypeConfiguration: Array<MapBookingFieldTypeConfigurationPayload>;
  me: MeOrGuestMe;
  merchant?: Maybe<Merchant>;
  /**  Logged In User flow | General endpoints  */
  myBookings: Array<UserBookingPayload>;
  nextAvailableDateAndPriceFrom?: Maybe<NextAvailableDateAndPricePayload>;
  /**  need to provide productId or slug to get a result, if a product is hiddenFromSearch/inactive, then it could only be got via productId, all other api will filter it out */
  product?: Maybe<Product>;
  /** @deprecated this query comes from old system and should no longer be source of truth */
  productAvailability?: Maybe<ProductAvailability>;
  productData?: Maybe<ProductDataPayload>;
  productDiscountsConfiguration: ProductDiscountsConfigurationPayload;
  /**
   *  Returns product groups for a specified location (groups are defined by `groupBy` parameter)
   * @deprecated use Query.products instead
   */
  productGroups?: Maybe<Array<ProductGroup>>;
  productMetaCallByProductId?: Maybe<InternalStoredData>;
  /** @deprecated querying reviewDetail is no longer supported */
  productReviews?: Maybe<Array<ReviewDetail>>;
  /**
   * Returns products for a specified location, sorted by default, unless sortOrder is specified
   * offset should be non-negative or it will reset to 0
   */
  products?: Maybe<ProductConnection>;
  /**  returns the productsStatistics based on the filter. The list is ordered by productCount then product name */
  productsStatistics?: Maybe<ProductStatistics>;
  /**  Admin Only  */
  searchBooking?: Maybe<SearchBookingConnection>;
  /**  Admin Only | Voucher endpoints  */
  searchVoucher?: Maybe<SearchVoucherConnection>;
  /**  General configurations */
  stringBookingFieldTypeConfiguration: Array<StringBookingFieldTypeConfigurationPayload>;
  /** @deprecated use imgTransformImage instead */
  transformImage: Image;
  user?: Maybe<ProfileUser>;
  /**  Admin Only | Custom booking fields' related endpoints  */
  userBookings: Array<UserBookingPayload>;
  validateAvailabilityAndPricing: Scalars['Boolean'];
  /** base 0 offset */
  validatePromocode?: Maybe<PromocodeValidationPayload>;
};


export type QueryGetProductDataArgs = {
  input?: InputMaybe<GetProductDataInput>;
};


export type QueryHelloWorldTestEndpointArgs = {
  input?: InputMaybe<Scalars['String']>;
};


export type QueryAvailabilityArgs = {
  input: AvailabilityDataFilter;
};


export type QueryAvailabilityFarePriceArgs = {
  filter: AvailabilityFarePriceFilter;
};


export type QueryAvailablePromocodeArgs = {
  input: PromocodeRedemptionInput;
};


export type QueryBookingArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
};


export type QueryBookingContactInfoArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
};


export type QueryBookingCustomerLocationArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
};


export type QueryBookingExtraInfoArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
};


export type QueryBookingInternalNoteArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
};


export type QueryBookingParticipantDetailsArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
};


export type QueryBookingPickupArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
};


export type QueryBookingPricingArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
};


export type QueryBookingReferralsArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
};


export type QueryBpd_BlogArgs = {
  baseUrl?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};


export type QueryBpd_BookingFieldsArgs = {
  productId: Scalars['String'];
};


export type QueryBpd_ChannelByHostArgs = {
  host: Scalars['String'];
};


export type QueryBpd_ChannelByIdArgs = {
  id: Scalars['ID'];
};


export type QueryBpd_ChannelsArgs = {
  filter?: InputMaybe<Bpd_ChannelFilter>;
};


export type QueryBpd_ClientInfoArgs = {
  clientIP?: InputMaybe<Scalars['String']>;
  host: Scalars['String'];
};


export type QueryBpd_HomeLocalDealsArgs = {
  clientIP?: InputMaybe<Scalars['String']>;
};


export type QueryBpd_OrderByIdArgs = {
  orderID: Scalars['String'];
};


export type QueryBpd_OtherSearchArgs = {
  query?: InputMaybe<Scalars['String']>;
};


export type QueryBpd_PageArgs = {
  clientIP?: InputMaybe<Scalars['String']>;
  host: Scalars['String'];
  pathname: Scalars['String'];
};


export type QueryBpd_ProductsArgs = {
  clientIP?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<Bpd_ProductFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sortOrder?: InputMaybe<ProductSortOrder>;
};


export type QueryBpd_RedirectArgs = {
  pathname: Scalars['String'];
};


export type QueryBpd_SeoDataArgs = {
  clientIP?: InputMaybe<Scalars['String']>;
  host: Scalars['String'];
  pathname: Scalars['String'];
};


export type QueryBpd_UserOrdersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  userToken: Scalars['String'];
};


export type QueryCreateOrQuoteBookingArgs = {
  input?: InputMaybe<BookingRequest>;
};


export type QueryCustomBookingFieldsArgs = {
  filter: CustomBookingFieldsFilter;
};


export type QueryCustomBookingFieldsMapTypeConfigurationArgs = {
  filter: CustomBookingFieldsFilter;
};


export type QueryCustomBookingFieldsStringTypeConfigurationArgs = {
  filter: CustomBookingFieldsFilter;
};


export type QueryDepartureSelectionArgs = {
  input?: InputMaybe<DepartureSelection>;
};


export type QueryDiscountRuleArgs = {
  filter: DiscountRuleFilter;
};


export type QueryExportSearchBookingArgs = {
  filter?: InputMaybe<FilterBookingCriteria>;
  search?: InputMaybe<SearchBookingCriteria>;
};


export type QueryFareTypeArgs = {
  filter: FareTypeFilter;
};


export type QueryFindPromocodeByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetBookingConfirmationSignedUrlArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
  fileType?: InputMaybe<Filetype>;
  userId?: InputMaybe<Scalars['ID']>;
};


export type QueryImgTransformImageArgs = {
  url: Scalars['String'];
};


export type QueryImportRemoteDealsArgs = {
  input: ImportRemoteDealsInput;
};


export type QueryListPromocodesArgs = {
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
  search?: InputMaybe<PromocodeListSearchInput>;
  sort?: PromocodeListSortInput;
};


export type QueryMapBookingFieldTypeConfigurationArgs = {
  groupId: Scalars['Int'];
};


export type QueryMerchantArgs = {
  merchantId: Scalars['ID'];
};


export type QueryMyBookingsArgs = {
  input: UserBookingFilter;
};


export type QueryNextAvailableDateAndPriceFromArgs = {
  input: NextAvailableDateAndPriceFromFilter;
};


export type QueryProductArgs = {
  hedgeMode?: InputMaybe<HedgeMode>;
  productId?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  targetCurrency?: InputMaybe<Scalars['String']>;
};


export type QueryProductAvailabilityArgs = {
  days?: InputMaybe<Scalars['Int']>;
  month?: InputMaybe<Scalars['Int']>;
  productId: Scalars['String'];
  startDate?: InputMaybe<Scalars['DateTime']>;
  targetCurrency?: InputMaybe<Scalars['String']>;
};


export type QueryProductDataArgs = {
  productId: Scalars['String'];
};


export type QueryProductDiscountsConfigurationArgs = {
  productId: Scalars['String'];
};


export type QueryProductGroupsArgs = {
  filter: ProductLocationFilter;
  groupBy: ProductGroupBy;
  hedgeMode?: InputMaybe<HedgeMode>;
  targetCurrency?: InputMaybe<Scalars['String']>;
};


export type QueryProductMetaCallByProductIdArgs = {
  productId: Scalars['String'];
};


export type QueryProductReviewsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  productId: Scalars['String'];
};


export type QueryProductsArgs = {
  filter?: InputMaybe<ProductFilter>;
  hedgeMode?: InputMaybe<HedgeMode>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sortOrder?: InputMaybe<ProductSortOrder>;
  targetCurrency?: InputMaybe<Scalars['String']>;
};


export type QueryProductsStatisticsArgs = {
  filter?: InputMaybe<ProductFilter>;
};


export type QuerySearchBookingArgs = {
  filter?: InputMaybe<FilterBookingCriteria>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<SearchBookingCriteria>;
};


export type QuerySearchVoucherArgs = {
  filter?: InputMaybe<FilterVoucherCriteria>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<SearchVoucherCriteria>;
};


export type QueryTransformImageArgs = {
  url: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUserBookingsArgs = {
  input: UserBookingFilter;
  userId: Scalars['ID'];
};


export type QueryValidateAvailabilityAndPricingArgs = {
  bookingUid?: InputMaybe<Scalars['String']>;
};


export type QueryValidatePromocodeArgs = {
  input: PromocodeValidationInput;
};

export type Question = {
  answerType?: InputMaybe<Scalars['String']>;
  defaultValue?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  example?: InputMaybe<Scalars['String']>;
  fareUuids?: InputMaybe<Array<InputMaybe<Uuid>>>;
  feeDescription?: InputMaybe<Scalars['String']>;
  lengthMax?: InputMaybe<Scalars['Int']>;
  lengthMin?: InputMaybe<Scalars['Int']>;
  multiLine?: InputMaybe<Scalars['Boolean']>;
  purpose?: InputMaybe<Scalars['String']>;
  regex?: InputMaybe<Scalars['String']>;
  required?: InputMaybe<Scalars['Boolean']>;
  scope?: InputMaybe<Scalars['String']>;
  selectMax?: InputMaybe<Scalars['Int']>;
  selectMin?: InputMaybe<Scalars['Int']>;
  selectOptions?: InputMaybe<Array<InputMaybe<SelectOption>>>;
  title?: InputMaybe<Scalars['String']>;
  uuid?: InputMaybe<Uuid>;
  valueMax?: InputMaybe<Scalars['String']>;
  valueMin?: InputMaybe<Scalars['String']>;
};

export type QuestionGroup = {
  caption?: InputMaybe<Scalars['String']>;
  questions?: InputMaybe<Array<InputMaybe<Question>>>;
};

export type QuestionGroupPayload = {
  caption?: Maybe<Scalars['String']>;
  questions?: Maybe<Array<Maybe<QuestionPayload>>>;
};

export type QuestionPayload = {
  answerType?: Maybe<Scalars['String']>;
  defaultValue?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  example?: Maybe<Scalars['String']>;
  fareUuids?: Maybe<Array<Maybe<UuidPayload>>>;
  feeDescription?: Maybe<Scalars['String']>;
  lengthMax?: Maybe<Scalars['Int']>;
  lengthMin?: Maybe<Scalars['Int']>;
  multiLine?: Maybe<Scalars['Boolean']>;
  purpose?: Maybe<Scalars['String']>;
  regex?: Maybe<Scalars['String']>;
  required?: Maybe<Scalars['Boolean']>;
  scope?: Maybe<Scalars['String']>;
  selectMax?: Maybe<Scalars['Int']>;
  selectMin?: Maybe<Scalars['Int']>;
  selectOptions?: Maybe<Array<Maybe<SelectOptionPayload>>>;
  title?: Maybe<Scalars['String']>;
  uuid?: Maybe<UuidPayload>;
  valueMax?: Maybe<Scalars['String']>;
  valueMin?: Maybe<Scalars['String']>;
};

export type Questions = {
  questionGroups?: InputMaybe<Array<InputMaybe<QuestionGroup>>>;
};

export type QuestionsPayload = {
  questionGroups?: Maybe<Array<Maybe<QuestionGroupPayload>>>;
};

export type Quote = {
  cancellationPolicy?: InputMaybe<CancellationPolicy>;
  contractCommTotal?: InputMaybe<PriceContractCommTotal>;
  generalTerms?: InputMaybe<Scalars['String']>;
  grossTotal?: InputMaybe<PriceLineItemsGrossTotal>;
  lineItems?: InputMaybe<Array<InputMaybe<LineItem>>>;
  localFees?: InputMaybe<Scalars['String']>;
  netTotal?: InputMaybe<PriceLineItemsNetTotal>;
  resSuppliedCommTotal?: InputMaybe<PriceResSuppliedCommTotal>;
  title?: InputMaybe<Scalars['String']>;
};

export type QuotePayload = {
  cancellationPolicy?: Maybe<CancellationPolicyPayload>;
  contractCommTotal?: Maybe<PriceContractCommTotalPayload>;
  generalTerms?: Maybe<Scalars['String']>;
  grossTotal?: Maybe<PriceLineItemsGrossTotalPayload>;
  lineItems?: Maybe<Array<Maybe<LineItemPayload>>>;
  localFees?: Maybe<Scalars['String']>;
  netTotal?: Maybe<PriceLineItemsNetTotalPayload>;
  resSuppliedCommTotal?: Maybe<PriceResSuppliedCommTotalPayload>;
  title?: Maybe<Scalars['String']>;
};

export type RecommendedRetailPrice = Price & {
  /** @deprecated this property comes from old system and should no longer be source of truth */
  fareType: FareType;
  /** @deprecated this property comes from old system and should no longer be source of truth */
  maximumUnitOrder?: Maybe<Scalars['Int']>;
  /** @deprecated this property comes from old system and should no longer be source of truth */
  minimumUnitOrder?: Maybe<Scalars['Int']>;
  /** @deprecated this property comes from old system and should no longer be source of truth */
  rateId?: Maybe<Scalars['ID']>;
  /** @deprecated this property comes from old system and should no longer be source of truth */
  seatUsed: Scalars['Int'];
  /** @deprecated this property comes from old system and should no longer be source of truth */
  value: Money;
};

export type RedeemVoucherResponse = {
  /** @deprecated replaced by bookingUid */
  bookingId?: Maybe<Scalars['Int']>;
  bookingUid?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  securityCode?: Maybe<Scalars['String']>;
  voucherCode?: Maybe<Scalars['String']>;
  voucherStatus?: Maybe<VoucherStatus>;
};

export type Region = {
  id: Scalars['String'];
  name: Scalars['String'];
};

export enum ResSystemIntegrationServiceEnums {
  NotApplicable = 'NOT_APPLICABLE'
}

export enum ResSystemType {
  Amstar = 'AMSTAR',
  Bokun = 'BOKUN',
  Bpd = 'BPD',
  Fareharbor = 'FAREHARBOR',
  FareharborMarketplace = 'FAREHARBOR_MARKETPLACE',
  Gadventures = 'GADVENTURES',
  Ibis = 'IBIS',
  Livn = 'LIVN',
  LivnDirect = 'LIVN_DIRECT',
  Peek = 'PEEK',
  Respax = 'RESPAX',
  Rezdy = 'REZDY',
  Rtbs = 'RTBS',
  Undefined = 'UNDEFINED'
}

/** Booking for Livn */
export enum ResSystemTypeForLivn {
  Bokun = 'BOKUN',
  Fareharbor = 'FAREHARBOR',
  Ibis = 'IBIS',
  Livn = 'LIVN',
  Peek = 'PEEK',
  Respax = 'RESPAX',
  Rezdy = 'REZDY',
  Rtbs = 'RTBS',
  Unknown = 'UNKNOWN',
  Unrecognized = 'UNRECOGNIZED'
}

export type ReviewDetail = {
  id?: Maybe<Scalars['Int']>;
  ratingScore?: Maybe<Scalars['Int']>;
  reviewCreatedAt?: Maybe<Scalars['DateTime']>;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
};

export type Room = {
  availability: DepartureAvailability;
  code: Scalars['String'];
  flags: Array<Scalars['String']>;
  name: Scalars['String'];
  priceBands: Array<PriceBand>;
};

export type SalesComputationDetails = {
  commissionable?: InputMaybe<Scalars['Boolean']>;
  contractCommPerc?: InputMaybe<Scalars['String']>;
  contractCommPrice?: InputMaybe<PriceContractComm>;
  resSuppliedCommPerc?: InputMaybe<Scalars['String']>;
  resSuppliedCommPrice?: InputMaybe<PriceResSuppliedComm>;
  resSuppliedPrice?: InputMaybe<PriceResSupplied>;
  resSuppliedPriceIsNetRate?: InputMaybe<Scalars['Boolean']>;
};

export type SalesComputationDetailsPayload = {
  commissionable?: Maybe<Scalars['Boolean']>;
  contractCommPerc?: Maybe<Scalars['String']>;
  contractCommPrice?: Maybe<PriceContractCommPayload>;
  resSuppliedCommPerc?: Maybe<Scalars['String']>;
  resSuppliedCommPrice?: Maybe<PriceResSuppliedCommPayload>;
  resSuppliedPrice?: Maybe<PriceResSuppliedPayload>;
  resSuppliedPriceIsNetRate?: Maybe<Scalars['Boolean']>;
};

/**  define pagination according to https://relay.dev/graphql/connections.htm */
export type SearchBookingConnection = {
  edges?: Maybe<Array<Maybe<SearchBookingEdge>>>;
  limitOffsetPageInfo?: Maybe<LimitOffsetPageInfo>;
};

/**
 * ## Booking Search ###
 *  Search = partial matching #
 */
export type SearchBookingCriteria = {
  bookingUid?: InputMaybe<Scalars['String']>;
  customer?: InputMaybe<CustomerSearchCriteria>;
};

export type SearchBookingEdge = {
  cursor: Scalars['String'];
  node: SearchBookingPayload;
};

/** ## Booking Search Export ### */
export type SearchBookingExportPayload = {
  email?: Maybe<Scalars['String']>;
  file?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type SearchBookingPayload = {
  /** @deprecated replaced by bookingUid */
  bookingId: Scalars['Int'];
  bookingStatus: BookingStatus;
  bookingUid: Scalars['String'];
  contactInfo?: Maybe<BookingSearchContactInfoPayload>;
  coupon?: Maybe<BookingSearchCouponPayload>;
  createdAt: Scalars['DateTime'];
  customerLocation?: Maybe<BookingSearchCustomerLocationPayload>;
  expiryDate: Scalars['DateTime'];
  extra?: Maybe<BookingSearchExtraInfoPayload>;
  fareTypes?: Maybe<Array<BookingSearchFareTypePayload>>;
  internalNotes?: Maybe<Array<BookingSearchInternalNotePayload>>;
  isLastMinute?: Maybe<Scalars['Boolean']>;
  order?: Maybe<BookingSearchOrderPayload>;
  orderNumber: Scalars['String'];
  payment?: Maybe<BookingPaymentPayload>;
  pricing?: Maybe<BookingSearchPricingPayload>;
  product?: Maybe<BookingSearchProductPayload>;
  productData?: Maybe<BookingSearchProductDataPayload>;
  referrals?: Maybe<BookingReferralsPayload>;
  resProvider?: Maybe<BookingSearchResProviderPayload>;
  voucher?: Maybe<BookingSearchVoucherPayload>;
};

export type SearchVoucherConnection = {
  edges?: Maybe<Array<Maybe<SearchVoucherEdge>>>;
};

export type SearchVoucherCriteria = {
  customerEmail?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  voucherCode?: InputMaybe<Scalars['String']>;
};

export type SearchVoucherEdge = {
  cursor: Scalars['String'];
  node: SearchVoucherPayload;
};

export type SearchVoucherPayload = {
  bookingDate?: Maybe<Scalars['DateTime']>;
  dealName?: Maybe<Scalars['String']>;
  invoiceId?: Maybe<Scalars['Int']>;
  orderData?: Maybe<Scalars['String']>;
  participant?: Maybe<Scalars['String']>;
  status?: Maybe<VoucherStatus>;
  validTill?: Maybe<Scalars['DateTime']>;
  voucherCode?: Maybe<Scalars['String']>;
};

export type SelectOption = {
  description?: InputMaybe<Scalars['String']>;
  feeDescription?: InputMaybe<Scalars['String']>;
  followUpQuestions?: InputMaybe<Questions>;
  title?: InputMaybe<Scalars['String']>;
  uuid?: InputMaybe<Uuid>;
};

export type SelectOptionPayload = {
  description?: Maybe<Scalars['String']>;
  feeDescription?: Maybe<Scalars['String']>;
  followUpQuestions?: Maybe<QuestionsPayload>;
  title?: Maybe<Scalars['String']>;
  uuid?: Maybe<UuidPayload>;
};

export type SingleProductCacheUpdateInput = {
  cacheConfigType?: InputMaybe<AvailabilityCacheConfigType>;
  productId: Scalars['String'];
  resSystemType: ResSystemType;
  startDate?: InputMaybe<Scalars['Date']>;
};

export type Slot = {
  /** @deprecated this property comes from old system and should no longer be source of truth */
  date?: Maybe<Scalars['DateTime']>;
  /** @deprecated this property comes from old system and should no longer be source of truth */
  endTime: Scalars['String'];
  /** @deprecated use `status` instead */
  isActive: Scalars['Boolean'];
  /** @deprecated this property comes from old system and should no longer be source of truth */
  isLastMinute: Scalars['Boolean'];
  /** @deprecated this property comes from old system and should no longer be source of truth */
  isTopDeal: Scalars['Boolean'];
  /** @deprecated this property comes from old system and should no longer be source of truth */
  orderedId: Scalars['String'];
  /** @deprecated this property comes from old system and should no longer be source of truth */
  prices: Array<Price>;
  /** @deprecated this property comes from old system and should no longer be source of truth */
  remainingCount: Scalars['Int'];
  /** @deprecated this property comes from old system and should no longer be source of truth */
  slotId: Scalars['String'];
  /** @deprecated this property comes from old system and should no longer be source of truth */
  startTime: Scalars['String'];
  /** @deprecated this property comes from old system and should no longer be source of truth */
  status: SlotStatusEnum;
  /** @deprecated this property comes from old system and should no longer be source of truth */
  title?: Maybe<Scalars['String']>;
  /** @deprecated this property comes from old system and should no longer be source of truth */
  totalCount: Scalars['Int'];
};

export enum SlotStatusEnum {
  Available = 'AVAILABLE',
  SoldOut = 'SOLD_OUT',
  Unavailable = 'UNAVAILABLE'
}

export type StartCacheJobInput = {
  cacheConfigType: AvailabilityCacheConfigType;
  resSystemType: ResSystemType;
};

export type StartCacheJobPayload = {
  jobId: Scalars['String'];
  status?: Maybe<CacheJobStatus>;
};

export type Step = {
  addOnSelections?: InputMaybe<Array<InputMaybe<AddOnSelection>>>;
  allowBackHere?: InputMaybe<Scalars['Boolean']>;
  answers?: InputMaybe<Answers>;
  caption?: InputMaybe<Scalars['String']>;
  created?: InputMaybe<Scalars['String']>;
  error?: InputMaybe<BookingError>;
  expires?: InputMaybe<Scalars['String']>;
  fareDetails?: InputMaybe<FareDetails>;
  fareSelections?: InputMaybe<Array<InputMaybe<FareSelection>>>;
  finalQuote?: InputMaybe<Quote>;
  id?: InputMaybe<Scalars['Int']>;
  milestone?: InputMaybe<Scalars['String']>;
  modified?: InputMaybe<Scalars['String']>;
  nextStepConfirmedBooking?: InputMaybe<Scalars['Boolean']>;
  nextStepSequenceNumber?: InputMaybe<Scalars['Int']>;
  nextStepTemporaryHold?: InputMaybe<Scalars['Boolean']>;
  previousStep?: InputMaybe<Scalars['String']>;
  previousStepSequenceNumber?: InputMaybe<Scalars['Int']>;
  questions?: InputMaybe<Questions>;
  resSuppliedGrossGrandTotal?: InputMaybe<PriceResSuppliedGrandTotal>;
  resSuppliedNetGrandTotal?: InputMaybe<PriceResSuppliedNetGrandTotal>;
  sequenceNumber?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  stepName?: InputMaybe<Scalars['String']>;
};

export type StepPayload = {
  addOnSelections?: Maybe<Array<Maybe<AddOnSelectionPayload>>>;
  allowBackHere?: Maybe<Scalars['Boolean']>;
  answers?: Maybe<AnswersPayload>;
  caption?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['String']>;
  error?: Maybe<BookingErrorPayload>;
  expires?: Maybe<Scalars['String']>;
  fareDetails?: Maybe<FareDetailsPayload>;
  fareSelections?: Maybe<Array<Maybe<FareSelectionPayload>>>;
  finalQuote?: Maybe<QuotePayload>;
  id?: Maybe<Scalars['Int']>;
  milestone?: Maybe<Scalars['String']>;
  modified?: Maybe<Scalars['String']>;
  nextStepConfirmedBooking?: Maybe<Scalars['Boolean']>;
  nextStepSequenceNumber?: Maybe<Scalars['Int']>;
  nextStepTemporaryHold?: Maybe<Scalars['Boolean']>;
  previousStep?: Maybe<Scalars['String']>;
  previousStepSequenceNumber?: Maybe<Scalars['Int']>;
  questions?: Maybe<QuestionsPayload>;
  resSuppliedGrossGrandTotal?: Maybe<PriceResSuppliedGrandTotalPayload>;
  resSuppliedNetGrandTotal?: Maybe<PriceResSuppliedNetGrandTotalPayload>;
  sequenceNumber?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  stepName?: Maybe<Scalars['String']>;
};

export type StepSelection = {
  currency?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  productId?: InputMaybe<Scalars['String']>;
  step?: InputMaybe<Array<InputMaybe<Step>>>;
};

export type StringBookingFieldTypeConfigurationInput = {
  maxLength?: InputMaybe<Scalars['Int']>;
  regex?: InputMaybe<Scalars['String']>;
  shortDescription: Scalars['String'];
};

export type StringBookingFieldTypeConfigurationPayload = {
  id: Scalars['Int'];
  maxLength?: Maybe<Scalars['Int']>;
  regex?: Maybe<Scalars['String']>;
  shortDescription: Scalars['String'];
};

export type SupplierBasic = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  businessNumber?: InputMaybe<Scalars['String']>;
  catalogueSupplierId?: InputMaybe<Scalars['Int']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  created?: InputMaybe<Scalars['DateTime']>;
  demo?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  emailRes?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  logo?: InputMaybe<LivnImage>;
  modified?: InputMaybe<Scalars['DateTime']>;
  name?: InputMaybe<Scalars['String']>;
  nameCompany?: InputMaybe<Scalars['String']>;
  nameOriginal?: InputMaybe<Scalars['String']>;
  nameTradingAs?: InputMaybe<Scalars['String']>;
  phoneRes?: InputMaybe<Scalars['String']>;
  postcode?: InputMaybe<Scalars['String']>;
  resSystem?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  tnc?: InputMaybe<Scalars['String']>;
  tz?: InputMaybe<Scalars['String']>;
  v1Cid?: InputMaybe<Scalars['Int']>;
  website?: InputMaybe<Scalars['String']>;
};

export type SupplierBasicPayload = {
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  businessNumber?: Maybe<Scalars['String']>;
  catalogueSupplierId?: Maybe<Scalars['Int']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['DateTime']>;
  demo?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  emailRes?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  logo?: Maybe<ImagePayload>;
  modified?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  nameCompany?: Maybe<Scalars['String']>;
  nameOriginal?: Maybe<Scalars['String']>;
  nameTradingAs?: Maybe<Scalars['String']>;
  phoneRes?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  resSystem?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  tnc?: Maybe<Scalars['String']>;
  tz?: Maybe<Scalars['String']>;
  v1Cid?: Maybe<Scalars['Int']>;
  website?: Maybe<Scalars['String']>;
};

export type SyncProductsInput = {
  cacheConfigType?: InputMaybe<AvailabilityCacheConfigType>;
  productIds: Array<Scalars['String']>;
  resSystemType: ResSystemType;
  startDate?: InputMaybe<Scalars['Date']>;
};

export type TextContent = {
  format?: Maybe<TextFormat>;
  text?: Maybe<Scalars['String']>;
};

export enum TextFormat {
  Html = 'HTML'
}

export type TextQuery = {
  text: Scalars['String'];
  /**  empty categories means query all categories */
  textQueryCategories?: InputMaybe<Array<TextQueryCategory>>;
};

export enum TextQueryCategory {
  ProductCity = 'PRODUCT_CITY',
  ProductCountry = 'PRODUCT_COUNTRY',
  ProductTitle = 'PRODUCT_TITLE',
  ProductTourCategory = 'PRODUCT_TOUR_CATEGORY'
}

export type Ticket = {
  barcodeDetails?: InputMaybe<BarcodeDetails>;
  billingNotes?: InputMaybe<Scalars['String']>;
  bookingDetails?: InputMaybe<BookingDetails>;
  created?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  localFees?: InputMaybe<Scalars['String']>;
  localOperatorName?: InputMaybe<Scalars['String']>;
  passengerDetails?: InputMaybe<Array<InputMaybe<PassengerDetails>>>;
  pickupDetails?: InputMaybe<PickupDetails>;
  printRequired?: InputMaybe<Scalars['Boolean']>;
  productDetails?: InputMaybe<Array<InputMaybe<ProductDetails>>>;
  specialNotes?: InputMaybe<Scalars['String']>;
  supplierEmailRes?: InputMaybe<Scalars['String']>;
  supplierName?: InputMaybe<Scalars['String']>;
  supplierPhoneRes?: InputMaybe<Scalars['String']>;
  supplierReference?: InputMaybe<Scalars['String']>;
  travelDate?: InputMaybe<Scalars['Date']>;
  uuid?: InputMaybe<Scalars['String']>;
};

export type TicketPayload = {
  barcodeDetails?: Maybe<BarcodeDetailsPayload>;
  billingNotes?: Maybe<Scalars['String']>;
  bookingDetails?: Maybe<BookingDetailsPayload>;
  created?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  localFees?: Maybe<Scalars['String']>;
  localOperatorName?: Maybe<Scalars['String']>;
  passengerDetails?: Maybe<Array<Maybe<PassengerDetailsPayload>>>;
  pickupDetails?: Maybe<PickupDetailsPayload>;
  printRequired?: Maybe<Scalars['Boolean']>;
  productDetails?: Maybe<Array<Maybe<ProductDetailsPayload>>>;
  specialNotes?: Maybe<Scalars['String']>;
  supplierEmailRes?: Maybe<Scalars['String']>;
  supplierName?: Maybe<Scalars['String']>;
  supplierPhoneRes?: Maybe<Scalars['String']>;
  supplierReference?: Maybe<Scalars['String']>;
  travelDate?: Maybe<Scalars['Date']>;
  uuid?: Maybe<Scalars['String']>;
};

export type Timeslot = {
  addOns?: InputMaybe<Array<InputMaybe<AddOn>>>;
  availabilityShared?: InputMaybe<Scalars['Boolean']>;
  available?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  durationRangeMax?: InputMaybe<Scalars['Int']>;
  durationStr?: InputMaybe<Scalars['String']>;
  fares?: InputMaybe<Array<InputMaybe<FareLivn>>>;
  name?: InputMaybe<Scalars['String']>;
  specialNotes?: InputMaybe<Scalars['String']>;
  timeEnd?: InputMaybe<Scalars['String']>;
  timeStart?: InputMaybe<Scalars['String']>;
};

export type TimeslotPayload = {
  addOns?: Maybe<Array<Maybe<AddOnPayload>>>;
  availabilityShared?: Maybe<Scalars['Boolean']>;
  available?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  durationRangeMax?: Maybe<Scalars['Int']>;
  durationStr?: Maybe<Scalars['String']>;
  fares?: Maybe<Array<Maybe<FarePayload>>>;
  name?: Maybe<Scalars['String']>;
  specialNotes?: Maybe<Scalars['String']>;
  timeEnd?: Maybe<Scalars['String']>;
  timeStart?: Maybe<Scalars['String']>;
};

export type Token = {
  type: Scalars['String'];
  value: Scalars['String'];
};

export type TravelloBookingData = {
  orderNumberCode?: InputMaybe<Scalars['String']>;
  voucherCodes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export enum TravelloErrorStatus {
  Failure = 'FAILURE',
  Success = 'SUCCESS'
}

export type TravelloPrice = Price & {
  /** @deprecated this property comes from old system and should no longer be source of truth */
  fareType: FareType;
  /** @deprecated this property comes from old system and should no longer be source of truth */
  maximumUnitOrder?: Maybe<Scalars['Int']>;
  /** @deprecated this property comes from old system and should no longer be source of truth */
  minimumUnitOrder?: Maybe<Scalars['Int']>;
  /** @deprecated this property comes from old system and should no longer be source of truth */
  rateId?: Maybe<Scalars['ID']>;
  /** @deprecated this property comes from old system and should no longer be source of truth */
  seatUsed: Scalars['Int'];
  /** @deprecated this property comes from old system and should no longer be source of truth */
  value: Money;
};

export enum TravelloSecurityExceptionType {
  TokenValidationFailed = 'TOKEN_VALIDATION_FAILED'
}

export type Uuid = {
  value?: InputMaybe<Scalars['String']>;
};

export type UuidPayload = {
  value?: Maybe<Scalars['String']>;
};

export type UpdateBookingDataInput = {
  availabilitySlotKey: Scalars['String'];
  departureDate: Scalars['DateTime'];
  discountType: DiscountType;
  fareTypesToBook: Array<FareTypeToBookInput>;
  userApprovedPriceChange?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateBookingDataPayload = {
  data?: Maybe<BookingDataPayload>;
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  pricing: BookingPricingPayload;
};

export type UpdateMapBookingFieldTypeConfigurationInput = {
  id: Scalars['Int'];
  label?: InputMaybe<Scalars['String']>;
  originalLabel?: InputMaybe<Scalars['String']>;
  resSystemAnswerId?: InputMaybe<Scalars['String']>;
};

export type UpdateMyCurrentPayload = {
  preferredCurrency?: Maybe<Scalars['String']>;
};

export type UpdateMyPrivacySettingsPayload = {
  privacySettings?: Maybe<UserPrivacySettings>;
};

export type Uri = {
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  /** url is the full path that could be used to reach a product, e.g. "/united-states/maui/haleakala-sunrise-tour-with-breakfast" */
  url?: Maybe<Scalars['String']>;
};

export type User = {
  bio?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  gender?: Maybe<Scalars['Gender']>;
  id: Scalars['ID'];
  locationText?: Maybe<Scalars['String']>;
  mediaList: Array<UserMedia>;
  nationality?: Maybe<Scalars['CountryCode']>;
  profileImage?: Maybe<Image>;
  userName: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type UserBookingFilter = {
  status?: InputMaybe<UserBookingStatus>;
};

/**  User account | Search bookings  */
export type UserBookingPayload = {
  /**  booking_voucher */
  bookedAt: Scalars['DateTime'];
  bookedFareTypes?: Maybe<Array<FareTypeBooked>>;
  /** @deprecated replaced by bookingUid */
  bookingId: Scalars['Int'];
  bookingStatus: BookingStatus;
  bookingUid: Scalars['String'];
  /**  booking_voucher */
  confirmationTicketCode?: Maybe<Scalars['String']>;
  /**  booking */
  expiryDate?: Maybe<Scalars['String']>;
  /**  booking */
  invoiceId?: Maybe<Scalars['String']>;
  /**  availability_fare_price */
  priceTotal: Scalars['Float'];
  /**  booking */
  productRelatedData?: Maybe<ProductRelatedDataPayload>;
  /**  booking_pricing */
  tourDate: Scalars['String'];
};

export enum UserBookingStatus {
  Active = 'ACTIVE',
  Expired = 'EXPIRED'
}

export type UserCoverImage = {
  image?: Maybe<Image>;
};

export type UserMapImage = {
  image?: Maybe<Image>;
};

export type UserMedia = UserCoverImage | UserMapImage | UserProfileImage;

export type UserPrivacySettings = {
  email?: Maybe<UserPrivacyType>;
};

export type UserPrivacySettingsInput = {
  email: UserPrivacyType;
};

export enum UserPrivacyType {
  OptIn = 'OPT_IN',
  OptOut = 'OPT_OUT'
}

export type UserProfileImage = {
  image?: Maybe<Image>;
};

export type ValidDuringRange = {
  endDate: Scalars['String'];
  startDate: Scalars['String'];
};

export enum VisibilityLevel {
  Booking = 'BOOKING',
  Both = 'BOTH',
  None = 'NONE',
  Participant = 'PARTICIPANT'
}

export enum VoucherStatus {
  Active = 'ACTIVE',
  OrderCanceled = 'ORDER_CANCELED',
  Redeemed = 'REDEEMED',
  Scheduled = 'SCHEDULED'
}

export type ZoneOffset = {
  totalSeconds?: InputMaybe<Scalars['Int']>;
};

export type ZoneOffsetPayload = {
  totalSeconds?: Maybe<Scalars['Int']>;
};

export type ListFilterFragment = { last_minute?: boolean | null, top_deal?: boolean | null };

export type ListPageFragment = { id: string, totalReviews?: number | null, ratingScore?: number | null, landingPage?: { header?: string | null, subheader?: string | null, teaser?: string | null, image?: { id: string, altText?: string | null, fileName: string, top3000?: string | null, top2400?: string | null, top1600?: string | null, top1400?: string | null, top1200?: string | null, top1140?: string | null, top1024?: string | null, top800?: string | null, top768?: string | null, top500?: string | null, top480?: string | null } | null } | null, country?: { id?: string | null, name: string, uniqueName: string, productCount?: number | null, uri: { url?: string | null }, image?: { id: string, fileName: string, altText?: string | null, megaMenuCard?: string | null, grid624?: string | null, top3000?: string | null, top2400?: string | null, top1600?: string | null, top1400?: string | null, top1200?: string | null, top1140?: string | null, top1024?: string | null, top800?: string | null, top768?: string | null, top500?: string | null, top480?: string | null } | null } | null, city?: { id?: string | null, name: string, uniqueName: string, productCount?: number | null, uri: { url?: string | null }, image?: { id: string, altText?: string | null, fileName: string, cityCard?: string | null, top3000?: string | null, top2400?: string | null, top1600?: string | null, top1400?: string | null, top1200?: string | null, top1140?: string | null, top1024?: string | null, top800?: string | null, top768?: string | null, top500?: string | null, top480?: string | null, grid624?: string | null } | null } | null, category?: { id?: string | null, name: string, uniqueName: string, productCount?: number | null, uri: { url?: string | null }, image?: { id: string, fileName: string, altText?: string | null, grid624?: string | null, top3000?: string | null, top2400?: string | null, top1600?: string | null, top1400?: string | null, top1200?: string | null, top1140?: string | null, top1024?: string | null, top800?: string | null, top768?: string | null, top500?: string | null, top480?: string | null } | null } | null, relatedCategories?: Array<{ id?: string | null, name: string, uniqueName: string, productCount?: number | null, uri: { url?: string | null }, image?: { id: string, fileName: string, altText?: string | null, grid624?: string | null, top3000?: string | null, top2400?: string | null, top1600?: string | null, top1400?: string | null, top1200?: string | null, top1140?: string | null, top1024?: string | null, top800?: string | null, top768?: string | null, top500?: string | null, top480?: string | null } | null }> | null, relatedCountries?: Array<{ id?: string | null, name: string, uniqueName: string, productCount?: number | null, uri: { url?: string | null }, image?: { id: string, fileName: string, altText?: string | null, megaMenuCard?: string | null, grid624?: string | null, top3000?: string | null, top2400?: string | null, top1600?: string | null, top1400?: string | null, top1200?: string | null, top1140?: string | null, top1024?: string | null, top800?: string | null, top768?: string | null, top500?: string | null, top480?: string | null } | null }> | null, relatedCities?: Array<{ id?: string | null, name: string, uniqueName: string, productCount?: number | null, uri: { url?: string | null }, image?: { id: string, altText?: string | null, fileName: string, cityCard?: string | null, top3000?: string | null, top2400?: string | null, top1600?: string | null, top1400?: string | null, top1200?: string | null, top1140?: string | null, top1024?: string | null, top800?: string | null, top768?: string | null, top500?: string | null, top480?: string | null, grid624?: string | null } | null }> | null, landingPageFooter?: { teaser?: string | null, header?: string | null } | null, listFilter?: { last_minute?: boolean | null, top_deal?: boolean | null } | null };

export const ListFilterFragmentDoc = gql`
    fragment ListFilter on BPD_ListFilter {
  last_minute
  top_deal
}
    `;
export const ListPageFragmentDoc = gql`
    fragment ListPage on BPD_ListPage {
  id
  landingPage {
    ...DestinationHeader
  }
  country {
    ...CountryCard
  }
  city {
    ...CityCard
  }
  category {
    ...CategoryCard
  }
  relatedCategories {
    ...CategoryCard
  }
  relatedCountries {
    ...CountryCard
  }
  relatedCities {
    ...CityCard
  }
  landingPageFooter {
    teaser
    header
  }
  listFilter {
    ...ListFilter
  }
  totalReviews
  ratingScore
}
    ${DestinationHeaderFragmentDoc}
${CountryCardFragmentDoc}
${CityCardFragmentDoc}
${CategoryCardFragmentDoc}
${ListFilterFragmentDoc}`;
import gql from "graphql-tag";

gql`
  fragment ProductImage on ProductImage {
    image {
      ...HeroImage
    }
    isMainImage
    position
    productImageId
    title
    status
  }

  fragment ProductMoney on Money {
    currencyCode
    amount
    convertedAmount: bpd_convertedAmount(currencyCode: $currencyCode)
  }

  fragment ProductLegacyPrice on ProductLegacyPrice {
    price {
      ...ProductMoney
    }
    value {
      ...ProductMoney
    }
    type
  }

  fragment ProductLegacyDisplayPrice on ProductLegacyDisplayPrice {
    adultPrice {
      ...ProductLegacyPrice
    }
    childPrice {
      ...ProductLegacyPrice
    }
    familyPrice {
      ...ProductLegacyPrice
    }
  }

  fragment ProductLegacy on ProductLegacy {
    priceFrom {
      ...ProductMoney
    }
    displayPrice {
      ...ProductLegacyDisplayPrice
    }
    recommendedRetailPrice {
      ...ProductMoney
    }
    shortId
    updatedAt
    forceAvailabilityV1
    subheader
    countDownLimit
    excludedBookingInfo
    bookingUrl
    openDatedBooking
    showMerchant
    hasNoIndexMetaTag
    hidePickupOnFrontend
    isDisplayGooglePay
    isDisplayPaypal
    isDisplayApplePay
    isDisplayAfterpay
    defaultDeparturePoint
    isDisplayHotelPickupWarning
  }

  fragment ProductLocation on ProductLocation {
    city
    country
  }

  fragment ProductPartner on Merchant {
    id
    name
    email
    website
    otherInfo
    salesEmail
    companyLogo {
      ...HeroImage
    }
    companyName
    companyPhone
    contactNumber
    accountsEmail
    contactPerson
  }

  fragment ProductPage on BPD_ProductPage {
    id
    product {
      productId
      priceFrom {
        amount
        convertedAmount
        currencyCode
      }
      priceFromAnP {
        amount
        convertedAmount
        currencyCode
      }
      nextAvailableDate
      address {
        address
      }
      categories {
        category {
          id
          image {
            altText
            banner: fileName
          }
          name
          uniqueName
        }
        isMainCategory
      }
      bookingRequired
      title
      status
      instantConfirmation
      itinerary {
        itineraryItems {
          description {
            text
          }
          locationTitle
          title
        }
        tourEndLocationTitle
        tourStartLocationTitle
      }
      uri {
        country
        city
        slug
        url
      }
      images {
        productImages {
          ...ProductImage
        }
      }
      location {
        ...ProductLocation
      }
      ratingScore
      totalReviews
      shortDescription {
        text
      }
      pickupDetails {
        locationTitle
      }
      termsAndConditions {
        text
      }
      exclusions {
        text
      }
      faqs {
        question
        answer {
          text
        }
      }
      fullDescription {
        text
      }
      labels
      supplierTermsAndConditions {
        text
      }
      benefits {
        text
      }
      cancellationPolicy {
        text
      }
      videos {
        url
      }
      icons {
        hints
        name
        src
        value
      }
      travelInstructions {
        text
      }
      enquireOnly
      partner {
        ...ProductPartner
      }
      duration {
        label
        maxDuration
        minDuration
      }
      legacy {
        ...ProductLegacy
      }
      variantProducts {
        ...VariantProduct
      }
      recentReviews {
        id
        ratingScore
        reviewCreatedAt
        text
        title
        userName
      }
    }
  }

  fragment ProductDiscountAmount on ProductDiscount {
    discountAmount {
      currencyCode
      convertedAmount: bpd_convertedAmount(currencyCode: $targetCurrency)
    }
  }

  query ProductData($productId: String!, $targetCurrency: String) {
    data: productData(productId: $productId) {
      isProviderSupported
      resSystemType
      __typename

      summary {
        productId
        zoneOffset
        nextAvailableDate {
          value
          priceFrom {
            amount
            currencyCode
            convertedAmount: bpd_convertedAmount(currencyCode: $targetCurrency)
          }
        }
        priceFrom {
          value {
            amount
            currencyCode
            convertedAmount: bpd_convertedAmount(currencyCode: $targetCurrency)
          }
          priceDate
        }
        variantSummaries {
          productId
          zoneOffset
          nextAvailableDate {
            value
            priceFrom {
              amount
              currencyCode
              convertedAmount: bpd_convertedAmount(
                currencyCode: $targetCurrency
              )
            }
          }
          priceFrom {
            value {
              amount
              currencyCode
              convertedAmount: bpd_convertedAmount(
                currencyCode: $targetCurrency
              )
            }
            priceDate
          }
        }
      }
    }
  }

  query ProductDiscounts($productId: String!, $targetCurrency: String!) {
    product(productId: $productId) {
      productId
      discounts {
        ...ProductDiscountAmount
      }
    }
  }

  fragment ProductPaymentOptions on BPD_PaymentOptions {
    laybuy
    braintree
    afterpay {
      region
      order_minimum
      order_maximum
    }
  }

  query PaymentOptions($host: String!, $pathname: String!) {
    bpd_page(host: $host, pathname: $pathname) {
      id
      ... on BPD_ProductPage {
        paymentOptions {
          ...ProductPaymentOptions
        }
      }
    }
  }

  fragment LevyFields on Levy {
    label
    value {
      amount
      currencyCode
    }
  }

  fragment TravelloPriceFields on TravelloPrice {
    seatUsed
  }

  fragment ProductVariantMoney on Money {
    currencyCode
    amount
    convertedAmount: bpd_convertedAmount(currencyCode: $targetCurrency)
  }

  fragment ProductVariantLegacyPrice on ProductLegacyPrice {
    price {
      ...ProductVariantMoney
    }
    value {
      ...ProductVariantMoney
    }
    type
  }

  fragment ProductVariantLegacyDisplayPrice on ProductLegacyDisplayPrice {
    adultPrice {
      ...ProductVariantLegacyPrice
    }
    childPrice {
      ...ProductVariantLegacyPrice
    }
    familyPrice {
      ...ProductVariantLegacyPrice
    }
  }

  fragment ProductVariantLegacy on ProductLegacy {
    priceFrom {
      ...ProductVariantMoney
    }
    displayPrice {
      ...ProductVariantLegacyDisplayPrice
    }
    recommendedRetailPrice {
      ...ProductVariantMoney
    }
    shortId
    updatedAt
    forceAvailabilityV1
    subheader
    countDownLimit
    excludedBookingInfo
    bookingUrl
    openDatedBooking
    showMerchant
    hasNoIndexMetaTag
    hidePickupOnFrontend
    isDisplayGooglePay
    isDisplayPaypal
    isDisplayApplePay
    isDisplayAfterpay
    defaultDeparturePoint
    isDisplayHotelPickupWarning
  }

  fragment ProductVariantPartner on Merchant {
    id
    name
    email
    website
    otherInfo
    salesEmail
    companyLogo {
      ...HeroImage
    }
    companyName
    companyPhone
    contactNumber
    accountsEmail
    contactPerson
  }

  fragment VariantProduct on Product {
    productId
    resSystemType
    title
    status
    nextAvailableDate
    discounts {
      ...ProductDiscountAmount
    }
    priceFrom {
      ...ProductVariantMoney
    }
    priceFromAnP {
      ...ProductVariantMoney
    }
    pickupDetails {
      locationTitle
    }
    shortDescription {
      text
    }
    labels
    partner {
      ...ProductVariantPartner
    }
    duration {
      label
      maxDuration
      minDuration
    }
    uri {
      slug
      url
    }
    legacy {
      ...ProductVariantLegacy
    }
  }

  fragment Product on Product {
    productId
    resSystemType
    title
    labels
    enquireOnly
    partner {
      ...ProductVariantPartner
    }
    duration {
      label
      maxDuration
      minDuration
    }
    uri {
      slug
      url
    }
    nextAvailableDate
    priceFrom {
      ...ProductVariantMoney
    }
    priceFromAnP {
      ...ProductVariantMoney
    }
    discounts {
      ...ProductDiscountAmount
    }
    variantProducts {
      ...VariantProduct
    }
    parentProduct {
      productId
    }
    legacy {
      ...ProductVariantLegacy
    }
  }

  #
  #  slots return prices in tour provider's currency, this is existing BPD behaviour
  #
  #  this is likely to change in the future when we can specify a target currency in the root query level
  #
  query Product($productId: String!, $targetCurrency: String!) {
    product(productId: $productId) {
      ...Product
    }
  }
`;

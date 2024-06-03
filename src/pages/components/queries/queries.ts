import gql from "graphql-tag";

gql`
  fragment CityCard on BPD_City {
    id
    name
    uniqueName
    uri {
      url
    }
    productCount
    image {
      id
      cityCard: imgSrc(transform: { width: 190, height: 100 })
      ...HeroImage
      ...CategoryCardImage
    }
  }

  fragment CityCardV2 on ProductCityWithStatistic {
    id
    city {
      id
      name
      uniqueName
      uri {
        url
      }
      image {
        id
        cityCard: imgSrc(transform: { width: 190, height: 100 })
        ...CategoryCardImage
        ...HeroImage
      }
      metaData {
        priority
      }
      country {
        id
        name
        uniqueName
      }
    }
    productCount
  }

  fragment CategoryCardImage on Image {
    id
    grid624: imgSrc(transform: { width: 300, height: 280 })
    fileName
  }

  fragment CategoryCard on BPD_Category {
    id
    uri {
      url
    }
    name
    uniqueName
    productCount
    image {
      ...CategoryCardImage
      ...HeroImage
    }
  }

  fragment CategoryCardV2 on ProductCategoryWithStatistic {
    id
    category {
      id
      name
      uniqueName
      uri {
        url
      }
      image {
        id
        ...CategoryCardImage
        ...HeroImage
      }
      metaData {
        priority
      }
    }
    productCount
  }

  fragment CountryCard on BPD_Country {
    id
    name
    uniqueName
    uri {
      url
    }
    productCount
    image {
      ...ImageCard
    }
  }

  fragment CountryCardV2 on ProductCountryWithStatistic {
    id
    country {
      id
      name
      uniqueName
      uri {
        url
      }
      image {
        id
        megaMenuCard: imgSrc(transform: { width: 190, height: 100 })
        ...CategoryCardImage
        ...HeroImage
      }
    }
    productCount
  }

  fragment ImageCard on Image {
    id
    megaMenuCard: imgSrc(transform: { width: 190, height: 100 })
    ...CategoryCardImage
    ...HeroImage
  }

  fragment HeroImage on Image {
    id
    top3000: imgSrc(transform: { width: 3000, height: 750 })
    top2400: imgSrc(transform: { width: 2400, height: 2400 })
    top1600: imgSrc(transform: { width: 1600, height: 1600 })
    top1400: imgSrc(transform: { width: 1400, height: 1400 })
    top1200: imgSrc(transform: { width: 1200, height: 375 })
    top1140: imgSrc(transform: { width: 1140, height: 1140 })
    top1024: imgSrc(transform: { width: 1024, height: 1024 })
    top800: imgSrc(transform: { width: 800, height: 800 })
    top768: imgSrc(transform: { width: 768, height: 768 })
    top500: imgSrc(transform: { width: 500, height: 500 })
    top480: imgSrc(transform: { width: 480, height: 480 })
    altText
    fileName
  }

  fragment ProductCardImage on Image {
    id
    productCard: imgSrc(transform: { width: 500, height: 500 })
    altText
    fileName
  }

  fragment ProductCardMoney on Money {
    currencyCode
    amount
    convertedAmount: bpd_convertedAmount(currencyCode: $targetCurrency)
  }

  fragment ProductCardLegacyPrice on ProductLegacyPrice {
    price {
      ...ProductCardMoney
    }
    value {
      ...ProductCardMoney
    }
    type
  }

  fragment ProductCardLegacyDisplayPrice on ProductLegacyDisplayPrice {
    adultPrice {
      ...ProductCardLegacyPrice
    }
    childPrice {
      ...ProductCardLegacyPrice
    }
    familyPrice {
      ...ProductCardLegacyPrice
    }
  }

  fragment ProductCardLegacy on ProductLegacy {
    priceFrom {
      ...ProductCardMoney
    }
    displayPrice {
      ...ProductCardLegacyDisplayPrice
    }
    recommendedRetailPrice {
      ...ProductCardMoney
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

  fragment ProductCardPartner on Merchant {
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

  fragment ProductCard on Product {
    productId
    title
    images(first: 0) {
      productImages {
        isMainImage
        status
        image {
          ...ProductCardImage
        }
      }
    }
    location {
      country
      city
    }
    uri {
      country
      city
      url
    }
    priceFrom {
      ...ProductCardMoney
    }
    discounts {
      discountType
      discountAmount {
        convertedAmount
        currencyCode
        amount
      }
      displayName
    }
    totalReviews
    ratingScore
    labels
    partner {
      ...ProductCardPartner
    }
    duration {
      label
      maxDuration
      minDuration
    }
    legacy {
      ...ProductCardLegacy
    }
  }
`;

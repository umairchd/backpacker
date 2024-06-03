import gql from "graphql-tag";

gql`
  fragment ListFilter on BPD_ListFilter {
    last_minute
    top_deal
  }

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
`;

import gql from "graphql-tag";

gql`
  query TopDestinationPage($backgroundImage: String!) {
    backgroundImage: imgTransformImage(url: $backgroundImage) {
      ...HeroImage
    }
  }
`;

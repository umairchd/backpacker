import { type InMemoryCacheConfig } from "@apollo/client";

export const memoryCacheConfig: InMemoryCacheConfig = {
  typePolicies: {
    BPD_Category: {
      merge: true,
    },
    BPD_Country: {
      merge: true,
    },
    BPD_City: {
      merge: true,
    },
    BPD_SiteConfig: {
      merge: true,
    },
    BPD_Uri: {
      keyFields: ["url"],
      merge: true,
    },
    BPD_Channel: {
      merge: true,
    },
    Image: {
      merge: true,
    },
    Product: {
      keyFields: ["productId"],
      merge: true,
    },
    Money: {
      merge: false,
    },
  },
};

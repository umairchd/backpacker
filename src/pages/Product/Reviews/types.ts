export type Review = {
  id: string;
  attributes: string[];
  date_created: string;
  author: {
    name: string;
    location: string;
    attributes: string[];
  };
  helpful_count: number;
  photos: string[];
  comments: string;
  product: string;
  order_id: string;
  product_name: string;
  rating: number;
  replies: string[];
  sku: string;
  source: string;
  type: string;
  title: string;
  tags: string[];
  videos: string[];
};

export type ReviewData = {
  average_rating: string;
  filters: {
    review_attributes: string[];
    reviewer_attributes: string[];
  };
  results_count: number;
  review_count: number;
  stats: {
    attributes: string[];
    company: {
      review_count: number;
      average_rating: string;
      ratings: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
      };
    };
  };
  reviews: Review[];
};

import gql from "graphql-tag";

gql`
  query MiddlewareRedirectOrRewrite($host: String!, $pathname: String!) {
    redirect: bpd_redirect(pathname: $pathname) {
      newUrl
      status
    }
    page: bpd_page(host: $host, pathname: $pathname) {
      __typename
    }
  }

  query MiddlewareChannelByHost($host: String!) {
    channel: bpd_channelByHost(host: $host) {
      id
      theme
      key
      url
    }
  }
`;

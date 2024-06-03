import type { GetServerSideProps } from "next";
import { addApolloState, initializeApollo } from "@@/pages/lib/useApollo";
import sharedGetServerSideProps, {
  SharedServerSideProps,
} from "@@/pages/lib/sharedGetServerSideProps-server";
import { getHeaders } from "@@/pages/auth/sessionUtils";
import { fetch } from "@@/pages/lib/serverUtils";
import CampervanHire from "./index.page";

export const getServerSideProps: GetServerSideProps<
  SharedServerSideProps
> = async (context) => {
  const { res } = context;
  const cacheControl = process.env.CACHE_CONTROL;
  const getApolloClient = initializeApollo(
    undefined,
    { fetch, headers: getHeaders() },
    true
  );

  const [sharedProps] = await Promise.all([
    sharedGetServerSideProps(getApolloClient)(context),
  ]);

  if (cacheControl) {
    res.setHeader("Cache-Control", cacheControl);
  }

  return addApolloState(
    getApolloClient,
    {
      props: {
        ...sharedProps,
      },
    },
    CampervanHire,
    context
  );
};

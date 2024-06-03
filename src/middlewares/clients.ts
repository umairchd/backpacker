import { DocumentNode, print } from "graphql";

const travelloGraphServerSide = process.env.TRAVELLO_GRAPH_SERVER_SIDE ?? "";
const travelloApiKey = process.env.TRAVELLO_APIKEY ?? "";
const serviceName = process.env.K_SERVICE ?? "backpackerdeals-next";
const version = process.env.K_REVISION ?? "dev";

// eslint-disable-next-line etc/no-misused-generics
export async function fetchFromGraph<Data, Variables>(args: {
  query: DocumentNode;
  variables: Variables;
  next?: NextFetchRequestConfig;
}) {
  return fetch(travelloGraphServerSide, {
    method: "POST",
    headers: {
      "apollographql-client-name": serviceName,
      "apollographql-client-version": version,
      "Apollo-Require-Preflight": "false",
      "Content-Type": "application/json",
      "x-api-key": travelloApiKey,
    },
    body: JSON.stringify({
      query: print(args.query),
      variables: args.variables,
    }),
    next: args.next,
  }).then((r) => r.json() as Promise<{ data?: Data }>);
}

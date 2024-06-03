import nodeFetch from "node-fetch";

export const fetch = nodeFetch as unknown as (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

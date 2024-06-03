import { getClient } from "@@/app/lib/apolloClient";
import {
  AppRouterStaticPageDocument,
  AppRouterStaticPageQuery,
  AppRouterStaticPageQueryVariables,
  StaticPageFragment,
} from "./queries.generated";
import { getReq } from "@@/app/lib/utils";
import ContactUsPage from "@@/app/components/ContactUs/ContactUsPage";
import WhyUsPage from "@@/app/components/Static/WhyUsPage/WhyUsPage";
import GenericPage from "@@/app/components/Static/GenericPage/GenericPage";
import HtmlPage from "@@/app/components/Static/HtmlPage/HtmlPage";

import components from "./components";
import { MDXRemote } from "next-mdx-remote/rsc";
import { use } from "react";

export default function Page() {
  const { host, pathname } = getReq();

  const { data } = use(
    getClient().query<AppRouterStaticPageQuery, AppRouterStaticPageQueryVariables>({
      query: AppRouterStaticPageDocument,
      variables: { host, pathname },
    }),
  );

  const page = data.page as StaticPageFragment;

  const source = page.content?.replaceAll("class=", "className=").replace(/style="[^"]*"/, "");

  switch (page.subTemplate) {
    case "contact":
      return <ContactUsPage />;
    case "why_us":
      return (
        <WhyUsPage
          {...{
            title: page.title,
          }}
        >
          <MDXRemote
            source={source}
            components={components}
          />
        </WhyUsPage>
      );
    case "html":
      return <HtmlPage content={source} />;
    default:
      return (
        <GenericPage
          {...{
            title: page.title,
            menu: page.menu,
            host,
          }}
        >
          <MDXRemote
            source={source}
            components={components}
          />
        </GenericPage>
      );
  }
}

export const revalidate = 300;

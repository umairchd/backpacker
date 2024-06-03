"use client";

import type { Metadata, ResolvingMetadata } from "next";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

type Props = {
  params: { site: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  return {
    other: {
      "travello:site": params.site,
    },
  };
}

export default function SiteLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  const [isRunningInClient, setIsRunningInClient] = useState(false);

  /*
  Solution to prevent hydration error in Next.js:
  Ensure that the component renders consistent content during server-side and initial client-side renders to avoid hydration mismatches.
  We can intentionally render different content on the client using the useEffect hook.
  During React hydration, useEffect is invoked, allowing the use of browser APIs like window without causing hydration mismatches.
  For more information, refer to: https://nextjs.org/docs/messages/react-hydration-error
*/
  useEffect(() => {
    setIsRunningInClient(true);
  }, []);

  return isRunningInClient ? <ThemeProvider>{children}</ThemeProvider> : <>{children}</>;
}

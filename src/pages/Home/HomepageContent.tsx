import { FC } from "react";

interface HomepageContentProps {
  homepage_content: string;
}

const HomepageContent: FC<HomepageContentProps> = ({ homepage_content }) => {
  return (
    <section className="pt-0">
      <div
        dangerouslySetInnerHTML={{ __html: homepage_content }}
        suppressHydrationWarning
      />
    </section>
  );
};

export default HomepageContent;

import { FC } from "react";
import { WhyBookWithUsProps } from "../types";

const WhyBookWithUs: FC<WhyBookWithUsProps> = (props) => {
  const { promoTitles: pt } = props;
  // To Do: Convert this to tailwindcss

  return (
    <div className="why-book-with-us">
      <div>
        <h3>Why book with us?</h3>
        <ul className="rounded-md flex flex-col m-0 p-0">
          {[pt.promo_title_1, pt.promo_title_2, pt.promo_title_3, pt.promo_title_4, pt.promo_title_5]
            .filter((i) => !!i)
            .map((i, ind) => (
              <li
                key={`${i} -${ind}`}
                className="list-none m-0 relative py-2 px-4 text-tabBorder border border-bookBorder bg-cardT"
              >
                <span
                  className="why-book-with-us-icon"
                  style={{
                    WebkitMask: `url(/imagesv3/why-icon-${ind + 1}-blue.svg) no-repeat center`,
                    mask: `url(/imagesv3/why-icon-${ind + 1}-blue.svg) no-repeat center`,
                  }}
                />
                <span>{i}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default WhyBookWithUs;

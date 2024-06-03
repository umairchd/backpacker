import { IterableDataWishlist } from "@@/pages/components/WishlistModal/types";
import { IterableDataSignUpGiveaway } from "@@/features/giveawaySignUpForm/types";
import { EnquireNowIterableBody } from "@@/pages/components/EnquireNowModal/types";

export const postIterableEventTrack = async (
  data:
    | IterableDataWishlist
    | IterableDataSignUpGiveaway
    | EnquireNowIterableBody,
  iterable_key: string
) => {
  return await fetch("https://api.iterable.com/api/users/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "API-Key": iterable_key,
    },
    body: JSON.stringify(data.user),
  })
    .then((resUser) => resUser.json())
    .then(async (resUser) => {
      if (resUser.code !== "Success") {
        console.error(resUser);
      }

      const responseEvent = await fetch(
        "https://api.iterable.com/api/events/track",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "API-Key": iterable_key,
          },
          body: JSON.stringify(data.event),
        }
      );

      const resEvent = await responseEvent.json();

      if (resEvent.code !== "Success") {
        console.error(resEvent);
      } else {
        return resEvent;
      }
    });
};

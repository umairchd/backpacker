import { gql } from "graphql-tag";
import { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";

import { useSlotWithPickUpDropOffLazyQuery } from "./usePickUpDropOffData.generated";
import { BookingPageContext } from "../[slug]/components/BookingPage";

gql`
  fragment PickUpDropOff on PickupDropOffPayload {
    address
    id
    isDefault
    name
    offset
    type
  }
`;

gql`
  query SlotWithPickUpDropOff($input: AvailabilityDataFilter!) {
    availability(input: $input) {
      slots {
        availabilitySlotKey
        pickupDropOffs {
          ...PickUpDropOff
        }
      }
    }
  }
`;

export default () => {
  const router = useRouter();
  const { slot, date } = router.query;
  const [pickUpDropOffData, setPickUpDropOffData] = useState(null);
  const [getAvailability] = useSlotWithPickUpDropOffLazyQuery();
  const { product } = useContext(BookingPageContext);

  useEffect(() => {
    if (!product.legacy?.bookingUrl || !product.bookingRequired) {
      (async () => {
        const startDate = date
          ? dayjs(date as string)
              .subtract(1, "days")
              .format()
          : dayjs().subtract(1, "days").startOf("day").format();
        const endDate = dayjs(startDate).add(3, "days").format();

        const availabilityData = await getAvailability({
          variables: {
            input: {
              startDate,
              endDate,
              productId: product.productId,
            },
          },
          fetchPolicy: "no-cache",
        });

        const pickUpDropOffs =
          availabilityData?.data?.availability?.slots?.find(
            (s) => s.availabilitySlotKey === slot
          )?.pickupDropOffs;

        if (pickUpDropOffs) {
          setPickUpDropOffData(pickUpDropOffs);
        }
      })();
    }
  }, []);

  return pickUpDropOffData;
};

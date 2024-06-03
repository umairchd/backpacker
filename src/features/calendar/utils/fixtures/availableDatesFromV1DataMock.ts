import { AvailableDateFragment } from "@@/features/calendar/queries/availability-query.generated";
import { FareTypeEnum, SlotStatusEnum } from "@@/types.generated";

export const availableDatesFromV1DataMock: Array<AvailableDateFragment> = [
  {
    date: "2023-10-26T00:00:00+11:00",
    slots: [
      {
        slotId: "0000",
        prices: [
          {
            __typename: "TravelloPrice",
            fareType: {
              typeName: FareTypeEnum.Adult,
              displayName: "Adult",
            },
            value: {
              currencyCode: "NZD",
              amount: 35,
              convertedAmount: 32.12161246930474,
            },
            seatUsed: 1,
          },
          {
            __typename: "RecommendedRetailPrice",
            fareType: {
              typeName: FareTypeEnum.Adult,
              displayName: "Adult",
            },
            value: {
              currencyCode: "NZD",
              amount: 35,
              convertedAmount: 32.12161246930474,
            },
          },
          {
            __typename: "TravelloPrice",
            fareType: {
              typeName: FareTypeEnum.Child,
              displayName: "Child",
            },
            value: {
              currencyCode: "NZD",
              amount: 35,
              convertedAmount: 32.12161246930474,
            },
            seatUsed: 1,
          },
          {
            __typename: "RecommendedRetailPrice",
            fareType: {
              typeName: FareTypeEnum.Child,
              displayName: "Child",
            },
            value: {
              currencyCode: "NZD",
              amount: 35,
              convertedAmount: 32.12161246930474,
            },
          },
        ],
        orderedId: "0000",
        remainingCount: 20,
        totalCount: 20,
        date: "2023-10-26T00:00:00+13:00",
        isLastMinute: false,
        isTopDeal: false,
        startTime: "12:00 AM",
        endTime: "12:00 AM",
        title: "12:00AM",
        status: SlotStatusEnum.Unavailable,
      },
    ],
    hasAvailableSlots: true,
  },
  {
    date: "2023-10-27T00:00:00+11:00",
    slots: [
      {
        slotId: "0000",
        prices: [
          {
            __typename: "TravelloPrice",
            fareType: {
              typeName: FareTypeEnum.Adult,
              displayName: "Adult",
            },
            value: {
              currencyCode: "NZD",
              amount: 35,
              convertedAmount: 32.12161246930474,
            },
            seatUsed: 1,
          },
          {
            __typename: "RecommendedRetailPrice",
            fareType: {
              typeName: FareTypeEnum.Adult,
              displayName: "Adult",
            },
            value: {
              currencyCode: "NZD",
              amount: 35,
              convertedAmount: 32.12161246930474,
            },
          },
          {
            __typename: "TravelloPrice",
            fareType: {
              typeName: FareTypeEnum.Child,
              displayName: "Child",
            },
            value: {
              currencyCode: "NZD",
              amount: 35,
              convertedAmount: 32.12161246930474,
            },
            seatUsed: 1,
          },
          {
            __typename: "RecommendedRetailPrice",
            fareType: {
              typeName: FareTypeEnum.Child,
              displayName: "Child",
            },
            value: {
              currencyCode: "NZD",
              amount: 35,
              convertedAmount: 32.12161246930474,
            },
          },
        ],
        orderedId: "0000",
        remainingCount: 20,
        totalCount: 20,
        date: "2023-10-27T00:00:00+13:00",
        isLastMinute: false,
        isTopDeal: false,
        startTime: "12:00 AM",
        endTime: "12:00 AM",
        title: "12:00AM",
        status: SlotStatusEnum.Available,
      },
    ],
    hasAvailableSlots: true,
  },
  {
    date: "2023-10-28T00:00:00+11:00",
    slots: [
      {
        slotId: "0000",
        prices: [
          {
            __typename: "TravelloPrice",
            fareType: {
              typeName: FareTypeEnum.Adult,
              displayName: "Adult",
            },
            value: {
              currencyCode: "NZD",
              amount: 35,
              convertedAmount: 32.12161246930474,
            },
            seatUsed: 1,
          },
          {
            __typename: "RecommendedRetailPrice",
            fareType: {
              typeName: FareTypeEnum.Adult,
              displayName: "Adult",
            },
            value: {
              currencyCode: "NZD",
              amount: 35,
              convertedAmount: 32.12161246930474,
            },
          },
          {
            __typename: "TravelloPrice",
            fareType: {
              typeName: FareTypeEnum.Child,
              displayName: "Child",
            },
            value: {
              currencyCode: "NZD",
              amount: 35,
              convertedAmount: 32.12161246930474,
            },
            seatUsed: 1,
          },
          {
            __typename: "RecommendedRetailPrice",
            fareType: {
              typeName: FareTypeEnum.Child,
              displayName: "Child",
            },
            value: {
              currencyCode: "NZD",
              amount: 35,
              convertedAmount: 32.12161246930474,
            },
          },
        ],
        orderedId: "0000",
        remainingCount: 20,
        totalCount: 20,
        date: "2023-10-28T00:00:00+13:00",
        isLastMinute: false,
        isTopDeal: false,
        startTime: "12:00 AM",
        endTime: "12:00 AM",
        title: "12:00AM",
        status: SlotStatusEnum.Available,
      },
    ],
    hasAvailableSlots: true,
  },
  {
    date: "2023-10-29T00:00:00+11:00",
    slots: [
      {
        slotId: "0000",
        prices: [
          {
            __typename: "TravelloPrice",
            fareType: {
              typeName: FareTypeEnum.Adult,
              displayName: "Adult",
            },
            value: {
              currencyCode: "NZD",
              amount: 35,
              convertedAmount: 32.12161246930474,
            },
            seatUsed: 1,
          },
          {
            __typename: "RecommendedRetailPrice",
            fareType: {
              typeName: FareTypeEnum.Adult,
              displayName: "Adult",
            },
            value: {
              currencyCode: "NZD",
              amount: 35,
              convertedAmount: 32.12161246930474,
            },
          },
          {
            __typename: "TravelloPrice",
            fareType: {
              typeName: FareTypeEnum.Child,
              displayName: "Child",
            },
            value: {
              currencyCode: "NZD",
              amount: 35,
              convertedAmount: 32.12161246930474,
            },
            seatUsed: 1,
          },
          {
            __typename: "RecommendedRetailPrice",
            fareType: {
              typeName: FareTypeEnum.Child,
              displayName: "Child",
            },
            value: {
              currencyCode: "NZD",
              amount: 35,
              convertedAmount: 32.12161246930474,
            },
          },
        ],
        orderedId: "0000",
        remainingCount: 20,
        totalCount: 20,
        date: "2023-10-29T00:00:00+13:00",
        isLastMinute: false,
        isTopDeal: false,
        startTime: "12:00 AM",
        endTime: "12:00 AM",
        title: "12:00AM",
        status: SlotStatusEnum.Available,
      },
    ],
    hasAvailableSlots: true,
  },
];

export const availableDatesWithoutAvailableStatusFromV1DataMock: Array<AvailableDateFragment> =
  [
    {
      date: "2023-11-24T00:00:00+11:00",
      slots: [
        {
          slotId: "0000",
          prices: [
            {
              __typename: "TravelloPrice",
              fareType: {
                typeName: FareTypeEnum.Adult,
                displayName: "Adult",
              },
              value: {
                currencyCode: "NZD",
                amount: 35,
                convertedAmount: 32.12161246930474,
              },
              seatUsed: 1,
            },
            {
              __typename: "RecommendedRetailPrice",
              fareType: {
                typeName: FareTypeEnum.Adult,
                displayName: "Adult",
              },
              value: {
                currencyCode: "NZD",
                amount: 35,
                convertedAmount: 32.12161246930474,
              },
            },
            {
              __typename: "TravelloPrice",
              fareType: {
                typeName: FareTypeEnum.Child,
                displayName: "Child",
              },
              value: {
                currencyCode: "NZD",
                amount: 35,
                convertedAmount: 32.12161246930474,
              },
              seatUsed: 1,
            },
            {
              __typename: "RecommendedRetailPrice",
              fareType: {
                typeName: FareTypeEnum.Child,
                displayName: "Child",
              },
              value: {
                currencyCode: "NZD",
                amount: 35,
                convertedAmount: 32.12161246930474,
              },
            },
          ],
          orderedId: "0000",
          remainingCount: 0,
          totalCount: 20,
          date: "2023-10-26T00:00:00+13:00",
          isLastMinute: false,
          isTopDeal: false,
          startTime: "12:00 AM",
          endTime: "12:00 AM",
          title: "12:00AM",
          status: SlotStatusEnum.Unavailable,
        },
      ],
      hasAvailableSlots: false,
    },
  ];

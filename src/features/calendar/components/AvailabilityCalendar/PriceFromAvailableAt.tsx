import PriceWidget from "@@/pages/components/PriceWidget/PriceWidget";
import dayjs from "dayjs";
import React, { FC } from "react";
import { PriceFrom } from "@@/pages/Product/ProductContent/types";
import { changeSelectedDate } from "@@/features/calendar/model";
import { useDispatch } from "react-redux";

interface PriceFromAvailableAtProps {
  priceFrom: PriceFrom;
  priceFromAvailableAt: string;
}

const PriceFromAvailableAt: FC<PriceFromAvailableAtProps> = ({ priceFrom, priceFromAvailableAt }) => {
  const dispatch = useDispatch();

  return (
    priceFrom &&
    priceFromAvailableAt && (
      <div className="flex flex-col lg:mb-4">
        <div className="flex flex-row">
          <div className="basis-1/4 md:basis-1/2">Lowest Price</div>
          <div className="basis-1/2">
            <PriceWidget
              variant="bold"
              amount={priceFrom.convertedAmount}
              originalCurrencyIsoSymbol={priceFrom.currencyCode}
              size="xs"
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="basis-1/4 md:basis-1/2">Available At</div>
          <div className="basis-1/2 font-bold">
            <button
              className="text-primary font-bold hover:underline hover:cursor-pointer"
              onClick={() => dispatch(changeSelectedDate(priceFromAvailableAt))}
              onKeyDown={() => dispatch(changeSelectedDate(priceFromAvailableAt))}
            >
              {dayjs(priceFromAvailableAt).format("DD MMM YYYY")}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default PriceFromAvailableAt;

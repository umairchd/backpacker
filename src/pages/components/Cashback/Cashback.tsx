import { FC, useState } from "react";
import { ClickAwayListener, Tooltip } from "@mui/material";
import { useBreakpoints } from "@@/features/utils";
import cashBackSrc from "@@/themes/images/icn-cashback.png";
import { FaX } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import Image from "next/image";

interface CashbackProps {
  variant?: "productDetails" | "productCard";
}

interface TooltipCashbackProps {
  children: any;
  contentEl: React.ReactNode;
  handleClickClose: () => void;
  open: boolean;
  isDesktop: boolean;
}

const TooltipCashback: FC<TooltipCashbackProps> = ({ children, contentEl, handleClickClose, open, isDesktop }) => {
  return isDesktop ? (
    <Tooltip
      title={contentEl}
      placement="bottom-start"
      arrow
    >
      {children}
    </Tooltip>
  ) : (
    <ClickAwayListener onClickAway={handleClickClose}>
      <Tooltip
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleClickClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={contentEl}
        placement="top"
        arrow
      >
        {children}
      </Tooltip>
    </ClickAwayListener>
  );
};

const Cashback: FC<CashbackProps> = ({ variant = "productDetails" }) => {
  const [open, setOpen] = useState(false);
  const { lgUp: isDesktop } = useBreakpoints();

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const contentEl = (
    <div
      {...(isDesktop && {
        className: "p-2",
      })}
    >
      {!isDesktop && (
        <div className="flex justify-end py-2">
          <FaX
            onClick={handleClickClose}
            className="cursor-pointer w-5 h-5"
          />
        </div>
      )}
      <p className="mb-1">Get up to 10% cashback to put towards your next booking.</p>
    </div>
  );

  return (
    <div
      className={`flex items-center gap-6px justify-center text-sm font-medium text-primary text-left bg-white p-0.35rem rounded-lg ${
        variant === "productDetails" ? "margin-product-detail" : ""
      }`}
    >
      <Image
        loader={({ src }) => src}
        src={cashBackSrc.src}
        alt="10% Cashback"
        className="w-5 h-5"
        width={20}
        height={20}
        loading="eager"
      />
      {variant === "productDetails" ? (
        <strong className="text-primary flex items-center gap-6px justify-center cursor-pointer">
          10% Cashback*
          <TooltipCashback
            contentEl={contentEl}
            handleClickClose={handleClickClose}
            open={open}
            isDesktop={isDesktop}
          >
            <button
              type="button"
              aria-label="tooltip"
            >
              <FaInfoCircle
                {...(!isDesktop && {
                  onClick: handleClickOpen,
                })}
              />
            </button>
          </TooltipCashback>
        </strong>
      ) : (
        <TooltipCashback
          contentEl={contentEl}
          handleClickClose={handleClickClose}
          open={open}
          isDesktop={isDesktop}
        >
          <strong
            {...(isDesktop && {
              onClick: handleClickOpen,
            })}
            className="text-primary flex items-center gap-6px justify-center cursor-pointer"
          >
            10% Cashback*
          </strong>
        </TooltipCashback>
      )}
    </div>
  );
};

export default Cashback;

import { FC, useState } from "react";
import { ClickAwayListener, Tooltip } from "@mui/material";
import { useBreakpoints } from "@@/features/utils";
import classes from "./PlantaTree.module.scss";
import { FaX } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";

const PlantaTree: FC = () => {
  const [open, setOpen] = useState(false);
  const { lgUp: isDekstop } = useBreakpoints();

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const contentEl = (
    <div
      {...(isDekstop && {
        className: "p-2",
      })}
    >
      {!isDekstop && (
        <div className="d-flex justify-content-end py-2">
          <FaX
            onClick={handleClickClose}
            className="cursor-pointer"
            width={20}
            height={20}
          />
        </div>
      )}
      <p className="mb-1">
        By adding this tour to your cart, you are contributing to a more sustainable future and promoting responsible
        travel practices. We have partnered with Eden Reforestation, a leader in sustainable reforestation who is
        working to combat the effects of deforestation and poverty in countries like Madagascar, Ethiopia, Nepal and
        Indonesia.
      </p>
      <p className="mb-1">
        By planting millions of trees every year, Eden is not only restoring the local ecosystem but also providing work
        for those in need.
      </p>
      <p className="mb-1">
        Through our pledge to plant 1 tree for every tour sold, you - as a traveller - get the feel-good factor bonus of
        knowing your travels are contributing to something much, much bigger.
      </p>
    </div>
  );

  return (
    <div className={classes["plant-a-tree-container"]}>
      <div className={classes["icon-tree"]} />
      <strong>
        One Booking = One Tree
        {isDekstop ? (
          <Tooltip
            title={contentEl}
            placement="bottom-start"
            arrow
          >
            <FaInfoCircle />
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
              <FaInfoCircle onClick={handleClickOpen} />
            </Tooltip>
          </ClickAwayListener>
        )}
      </strong>
    </div>
  );
};

export default PlantaTree;

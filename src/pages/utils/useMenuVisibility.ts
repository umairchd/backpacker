type BusPassVisibilityInputProp = {
  isSpaceShipsChannel: () => boolean;
  isJucyChannel: () => boolean;
};

type BusPassVisibility = {
  isBusPassVisible: boolean;
  isMultiDayToursVisible: boolean;
};

export const useMenuVisibility = ({
  isSpaceShipsChannel,
  isJucyChannel,
}: BusPassVisibilityInputProp): BusPassVisibility => {
  //* Hiding buspasses for lucy and spaceship because they already have their buspass
  //*  BPD-5018 BPD-5034
  const canShowBusPasses = !(isJucyChannel() || isSpaceShipsChannel());
  const canShowMultiDayTours = !isJucyChannel();

  return {
    isBusPassVisible: canShowBusPasses,
    isMultiDayToursVisible: canShowMultiDayTours,
  };
};

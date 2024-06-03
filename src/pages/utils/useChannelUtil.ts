export const CHANNEL_KEYS = {
  JUCY: "jucy",
} as const;

export const useChannelUtil = (channelKey: string) => {
  const channels = {
    backpackerDeals: ["backpackerdeals"],
    travello: ["travello"],
    flightCentre: ["flightcentre"],
    gap360: ["gap360"],
    spaceShips: ["spaceship"],
    wikiCamps: ["wikicamps"],
    sydneyExpert: ["sydneyexpert"],
    yha: ["yha"],
    [CHANNEL_KEYS.JUCY]: [CHANNEL_KEYS.JUCY],
  };

  const isChannel = (channel: string) => channels[channel].includes(channelKey);

  return {
    isBackpackerDealsChannel: () => isChannel("backpackerDeals"),
    isTravelloChannel: () => isChannel("travello"),
    isFlightCentreChannel: () => isChannel("flightCentre"),
    isGap360Channel: () => isChannel("gap360"),
    isSpaceShipsChannel: () => isChannel("spaceShips"),
    isWikiCampsChannel: () => isChannel("wikiCamps"),
    isSydneyexpertChannel: () => isChannel("sydneyExpert"),
    isYhaChannel: () => isChannel("yha"),
    isMasterChannel: () => isChannel("backpackerDeals") || isChannel("travello"),
    isJucyChannel: () => isChannel(CHANNEL_KEYS.JUCY),
  };
};

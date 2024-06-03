import { multiDayMenu } from "./types";

export const useMultiDayMenu = (isBackpackerdealsChannel: boolean) => {
  let multiDayMenu: multiDayMenu = {
    title: "",
    link: "",
    id: "",
  };

  if (isBackpackerdealsChannel) {
    multiDayMenu = {
      title: "East Coast Tours",
      link: "/australia/east-coast",
      id: "EastCoastClick",
    };
  } else {
    multiDayMenu = {
      title: "Multi-Day Tours",
      link: "/multi-day-tour",
      id: "MultiDayClick",
    };
  }

  return multiDayMenu;
};

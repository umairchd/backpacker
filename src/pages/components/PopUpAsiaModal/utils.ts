const asiaPopupPathNameList = ["japan", "vietnam", "thailand", "cambodia", "indonesia"];

export const shouldShowAsiaPopup = (locationPathName: string) => {
  return asiaPopupPathNameList.includes(locationPathName.split("/")[1]);
};

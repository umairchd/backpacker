import { useState } from "react";
import { useLocalStorage } from "react-use";

interface GiveawaySignUpLocalStorage {
  isSubmited: boolean;
}

export const useGiveawaySignUpLocalstorage = () => {
  const [localStorageData, setLocalStorageData] =
    useLocalStorage<GiveawaySignUpLocalStorage>("trav-MDComp", {
      isSubmited: false,
    });

  const [isSignUpCompetition, setIsSignUpCompetition] = useState<boolean>(
    localStorageData.isSubmited
  );

  const setSignUpCompetition = (newValue: boolean) => {
    setIsSignUpCompetition(newValue);
    setLocalStorageData({ isSubmited: newValue });
  };

  return {
    isSignUpCompetition,
    setSignUpCompetition,
  };
};

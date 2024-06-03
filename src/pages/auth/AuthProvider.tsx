import { load } from "@fingerprintjs/fingerprintjs";
import { createContext, useContext, useMemo, useState } from "react";
import { useEffectOnce, useLocalStorage } from "react-use";
/**
 * this component is to be replaced by proper oauth later
 */

const AuthContext = createContext<{
  deviceId?: string;
  authorized: boolean;
}>({
  authorized: false,
});

const AuthProvider = function AuthProvider({ children }) {
  const [deviceId, setDeviceId] = useLocalStorage<string | null>(
    "deviceId",
    null
  );
  const [authorized, setAuthorized] = useState(false);

  useEffectOnce(() => {
    (async () => {
      let _deviceId = deviceId;

      if (!_deviceId) {
        const fingerprintjs = await load();
        const { visitorId } = await fingerprintjs.get();
        setDeviceId(visitorId);
        _deviceId = visitorId;
      }

      const response = await fetch("/api/next/authorize", {
        method: "POST",
        body: JSON.stringify({ deviceId }),
      }).then((res) => res.json());

      if (response["ok"]) {
        setAuthorized(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const contextValue = useMemo(() => {
    return {
      deviceId,
      authorized,
    };
  }, [deviceId, authorized]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  const { authorized } = authContext;

  return {
    isAuthenticated: authorized,
  };
};

export default AuthProvider;

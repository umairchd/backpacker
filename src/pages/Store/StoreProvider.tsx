import { tick } from "@@/features/countDown/model";
import { Provider, useDispatch } from "react-redux";
import { createStore } from "@@/features/store";
import React, { FC, PropsWithChildren, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";

const TimerStarter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // global timer
    const timer = setInterval(() => {
      dispatch(tick());
    }, 1000);

    return function () {
      clearInterval(timer);
    };
  }, [dispatch]);

  return null;
};

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const client = useApolloClient();
  const { host } = useServerContext();

  const store = createStore({
    thunkExtraArgument: {
      travelloGraphClient: client,
      channelHost: host,
    },
  });

  return (
    <Provider store={store}>
      <TimerStarter />
      {children}
    </Provider>
  );
};

export default StoreProvider;

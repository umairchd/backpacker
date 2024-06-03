import { configureStore } from "@reduxjs/toolkit";
import currencySlice from "./price/model";
import contextSearchSlice from "./search/model";
import timerReducer from "./countDown/model";
import calendarSlice from "./calendar/model";
import { ApolloClient } from "@apollo/client";

export type ThunkExtraArgs = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  travelloGraphClient: ApolloClient<any>;
  channelHost: string;
};

const createStore = ({
  thunkExtraArgument,
}: {
  thunkExtraArgument: ThunkExtraArgs;
}) =>
  configureStore({
    devTools: {
      actionsBlacklist: ["timer/tick"], // ignore browser deprecation warning
    },
    reducer: {
      timer: timerReducer,
      [currencySlice.name]: currencySlice.reducer,
      [contextSearchSlice.name]: contextSearchSlice.reducer,
      [calendarSlice.name]: calendarSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["timer/tick", "apiClient/setClient"],
          ignoredPaths: ["apiClient.client"],
        },
        thunk: {
          extraArgument: thunkExtraArgument,
        },
      }),
  });

export type RootState = ReturnType<ReturnType<typeof createStore>["getState"]>;
export type AppDispatch = ReturnType<typeof createStore>["dispatch"];

export { createStore };

import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import allReducers from "../reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import * as actionCreators from "../action/index";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
  blacklist: []
};
let devtools = composeWithDevTools({
  actionCreators,
  trace: true,
  traceLimit: 25
});

const persistedReducer = persistReducer(persistConfig, allReducers);

let store = createStore(
  persistedReducer,
  devtools(applyMiddleware(sagaMiddleware))
);
let persistor = persistStore(store);
// sagaMiddleware.run(mySaga);

export { store, persistor };

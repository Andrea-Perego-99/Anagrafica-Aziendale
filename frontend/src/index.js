import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { persistor, store } from "./components/Redux/StoreConfiguration";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App style={{ height: "100%", width: "100%" }} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

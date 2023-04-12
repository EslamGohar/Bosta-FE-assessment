import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";

import store from "./redux/store";
import { Provider } from "react-redux";

import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <Suspense fallback="Loading...">
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </React.Fragment>
);

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";
import { BrowserRouter as Router } from "react-router-dom";

const store = setupStore();

const root = createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "core-js/stable";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import "antd/dist/reset.css";
import AppMain from "./pages/AppMain";

// Tambahkan ini sebelum render(<App />) untuk sembunyikan error ResizeObserver
const realConsoleError = console.error;
console.error = (...args) => {
  if (typeof args[0] === "string" && args[0].includes("ResizeObserver loop")) {
    // Ignore ResizeObserver error
    return;
  }
  realConsoleError(...args);
};

ReactDOM.render(
  <BrowserRouter>
    <AppMain />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

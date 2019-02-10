import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { JupyterContext, JupyterConfig } from "./jupyter-context";

if (
  !process.env.REACT_APP_JUPYTER_TOKEN ||
  !process.env.REACT_APP_JUPYTER_URI
) {
  throw new Error("Both the TOKEN and the URI needs to be set");
}

const jupyterConfig: JupyterConfig = {
  token: process.env.REACT_APP_JUPYTER_TOKEN,
  endpoint: process.env.REACT_APP_JUPYTER_URI
};

ReactDOM.render(
  <JupyterContext.Provider value={jupyterConfig}>
    <App />
  </JupyterContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

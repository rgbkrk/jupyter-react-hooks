import React, { useEffect, useState, useContext } from "react";
import "./App.css";

import { useJupyter, useKernelspecs, useSessions } from "./hooks";

const SessionView = () => {
  const sessions = useSessions();

  return (
    <div>
      <h2>sessions</h2>
      {sessions.map(session => {
        return (
          <div key={session.id}>
            {session.path} - {session.kernel!.last_activity}
          </div>
        );
      })}
    </div>
  );
};

const KernelSpecView = () => {
  const ks = useKernelspecs();
  return (
    <div>
      <h2>kernelspecs</h2>
      <pre>{JSON.stringify(ks)}</pre>
    </div>
  );
};

const App = () => {
  const jupyterConfig = useJupyter();

  return (
    <div className="App">
      <h2>Jupyter Config</h2>
      <pre>{JSON.stringify(jupyterConfig)}</pre>
      <KernelSpecView />
      <SessionView />
    </div>
  );
};

export default App;

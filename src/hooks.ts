import { useEffect, useState, useContext } from "react";

import { JupyterContext } from "./jupyter-context";

import { useObservable } from "rxjs-hooks";

import { kernelspecs as kernelspec$, sessions as session$ } from "rx-jupyter";

import { interval } from "rxjs";

import {
  map,
  tap,
  share,
  filter,
  concatMap,
  distinctUntilChanged
} from "rxjs/operators";

type Session = {
  id: string;
  path: string;
  name: string;
  type: string;
  kernel?: {
    id: string;
    name: string;
    last_activity: string;
    execution_state: string;
    connections: number;
  };
  notebook?: { path: string; name: string };
};

function fastCompare<T>(a: T, b: T) {
  // Do the fast, yet limited check for equality
  // Key order matters here. Since the server keeps this stable
  // we can exploit that fact
  return JSON.stringify(a) === JSON.stringify(b);
}

export function useSessions() {
  const jupyterConfig = useJupyter();

  return useObservable(
    () =>
      interval(991).pipe(
        concatMap(() =>
          session$.list(jupyterConfig).pipe(
            map(xhr => xhr.response as Session[]),
            share()
          )
        ),
        distinctUntilChanged((a, b) => {
          if (a.length !== b.length) {
            return false;
          }
          return fastCompare(a, b);
        })
      ),
    []
  );
}

export function useJupyter() {
  return useContext(JupyterContext);
}

export function useKernelspecs() {
  const jupyterConfig = useJupyter();

  return useObservable(
    () =>
      interval(997).pipe(
        concatMap(() => {
          return kernelspec$.list(jupyterConfig).pipe(
            map(xhr => xhr.response),
            share()
          );
        }),
        distinctUntilChanged((a, b) => {
          return fastCompare(a, b);
        })
      ),
    {}
  );
}

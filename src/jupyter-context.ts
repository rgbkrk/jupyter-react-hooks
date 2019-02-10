import { createContext } from "react";

export type JupyterConfig = {
  token: string;
  endpoint: string;
};

export const JupyterContext = createContext<JupyterConfig>({
  // value gets enforced at the Provider level
  token: "",
  endpoint: ""
});

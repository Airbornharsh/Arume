import { createContext } from "react";

const Context = createContext({
  util: {
    loader: "",
    setLoader: () => {},
    alert: {},
    setAlert: () => {},
  },
});

export default Context;

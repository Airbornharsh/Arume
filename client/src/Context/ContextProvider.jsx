import React, { useState } from "react";
import Context from "./Context";

const ContextProvider = (props) => {
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState({ isVisible: false, value: "" });

  const setLoaderFn = (data) => {
    setLoader(data);
  };

  const setAlertFn = (data) => {
    setAlert(data);
  };

  const ContextData = {
    util: {
      loader: loader,
      setLoader: setLoaderFn,
      alert: alert,
      setAlert: setAlertFn,
    },
  };

  return (
    <Context.Provider value={ContextData}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;

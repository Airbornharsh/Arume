import React, { useContext, useEffect } from "react";
import { useRef } from "react";
import Context from "../Context/Context";

const Alert = (props) => {
  const UtilCtx = useRef(useContext(Context).util);

  useEffect(() => {
    setTimeout(() => {
      UtilCtx.current.setAlert({ isVisible: false, value: "" });
    }, 2000);
  }, []);

  return (
    <div className="fixed z-30 w-screen">
      <span className="max-w-[15rem] w-[80vw] rounded px-3 py-3 bg-Color1 translate-x-[-50%] left-[50%] fixed top-0 font-semibold  text-slate-200">
        {UtilCtx.current.alert.value}
      </span>
    </div>
  );
};

export default Alert;

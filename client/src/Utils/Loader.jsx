import React from "react";

const Loader = () => {
  return (
    <div className="fixed z-20 flex items-center justify-center w-screen h-screen bg-slate-900 centered ">
      <div className="blob-1"></div>
      <div className="blob-2"></div>
    </div>
  );
};

export default Loader;

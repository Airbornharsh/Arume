import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 z-40 flex items-center justify-center w-screen h-screen bg-slate-200 ">
      <p className="flex items-center justify-center loader">
        Joining...
      </p>
    </div>
  );
};

export default Loader;

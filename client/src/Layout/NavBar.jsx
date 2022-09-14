import React from "react";

const NavBar = (props) => {
  return (
    <div className="h-16 flex justify-center items-center text-[2rem] font-semibold z-10">
      {props.heading}
    </div>
  );
};

export default NavBar;

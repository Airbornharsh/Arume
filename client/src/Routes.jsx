import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";

const RoutesContainer = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default RoutesContainer;

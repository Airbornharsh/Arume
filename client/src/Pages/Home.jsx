import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const [communityId, setCommunityId] = useState("");
  const Navigate = useNavigate();

  const ChatRender = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.post(
        `${window.localStorage.getItem("arume-backend-uri")}/community`,
        {
          communityId: communityId,
        }
      );
      window.localStorage.setItem("arume-accessToken", data.data);
      Navigate("/chat");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-[80vw] max-w-[70rem] flex justify-center items-center h-[calc(100vh-10rem)]">
      <form className="flex flex-col items-center">
        <div className="flex flex-col">
          <label htmlFor="Community">Community</label>
          <input
            type={"text"}
            value={communityId}
            onChange={(e) => {
              setCommunityId(e.target.value);
            }}
            className="h-8 max-w-[20rem] text-[0.9rem] w-[85vw] text-slate-600 px-2"
            placeholder="Enter Your Community"
            autoFocus
          />
        </div>
        <button
          className="bg-slate-300 text-slate-700 px-3 h-8 max-w-[5rem] rounded-sm mt-2"
          onClick={ChatRender}
        >
          Enter
        </button>
      </form>
    </div>
  );
};

export default Home;

import React, { useContext } from "react";
import { v1 as uuidv1, v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Context from "../Context/Context";

const Home = () => {
  const UtilCtx = useContext(Context).util;
  const [communityId, setCommunityId] = useState("");
  const [name, setName] = useState("");
  const Navigate = useNavigate();

  const validateForm = () => {
    return communityId.length > 0 && name.length > 0;
  };

  const ChatRender = async (e) => {
    e.preventDefault();
    UtilCtx.setLoader(true);

    try {
      const data = await axios.post(
        `${window.localStorage.getItem("arume-backend-uri")}/community`,
        {
          communityId: communityId.toLowerCase().trim(),
        }
      );
      window.localStorage.setItem("arume-accessToken", data.data);
      UtilCtx.setLoader(false);
      Navigate(`/chat/${communityId},${name},${uuidv1() + uuidv4()}`);
    } catch (e) {
      console.log(e);
      UtilCtx.setLoader(false);
    }
  };

  return (
    <div className="w-[80vw] max-w-[70rem] flex justify-center items-center h-[calc(100vh-10rem)] flex-col">
      <p className="max-w-[20rem] text-[0.9rem] w-[85vw] text-center mb-4 text-slate-400">
        You can Enter a Unique ID to Enter a Room And Chat with anyone who is
        inside that ID. Choose Any Nickname For Yourself.
      </p>
      <form className="flex flex-col items-center">
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            type={"text"}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="h-8 max-w-[20rem] text-[0.9rem] w-[85vw] text-slate-600 px-2 mb-4"
            placeholder="Enter any Name"
            autoFocus
          />
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
          disabled={!validateForm()}
        >
          Enter
        </button>
      </form>
    </div>
  );
};

export default Home;

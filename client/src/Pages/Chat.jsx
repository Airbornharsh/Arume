import React from "react";
import axios from "axios";
import { useState } from "react";

const Chat = () => {
  const [message, setMessage] = useState("");

  const AddMessage = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.post(
        `${window.localStorage.getItem("arume-backend-uri")}/message`,
        {
          message: message,
        },
        {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem(
              "arume-accessToken"
            )}`,
          },
        }
      );
      console.log(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="relative">
      <form className="flex items-center fixed bottom-10 left-[50%] translate-x-[-50%]">
        <input
          type={"text"}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="h-8 max-w-[20rem] text-[0.9rem] w-[85vw] text-slate-600 px-2"
          placeholder="Enter Your Message"
        />
        <button
          className="bg-slate-300 text-slate-700 px-3 h-8 max-w-[5rem] rounded-sm "
          onClick={AddMessage}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;

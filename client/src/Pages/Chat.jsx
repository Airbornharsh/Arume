import React from "react";
import openSocket from "socket.io-client";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const validateForm = () => {
    return message.length > 0;
  };

  useEffect(() => {
    const socket = openSocket("http://localhost:4000");
    socket.on("messages", (data) => {
      if (data.action === "create") {
        console.log(data.message.message);
        setMessages([...messages, data.message.message]);
      }
    });
  }, [messages]);

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
      <ul className="flex flex-col w-[80vw] ">
        {messages.map((message) => {
          return (
            <li className="p-2 pl-4 my-2 rounded-sm bg-slate-600">{message}</li>
          );
        })}
      </ul>
      <form className="flex items-center fixed bottom-10 left-[50%] translate-x-[-50%] w-[90vw] max-w-[25rem]">
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
          disabled={!validateForm()}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;

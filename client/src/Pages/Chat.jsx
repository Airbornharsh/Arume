import React from "react";
import openSocket from "socket.io-client";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState("");
  const [messages, setMessages] = useState([]);

  const validateForm = () => {
    return message.length > 0;
  };

  if (socket) {
    socket.on("messages", (data) => {
      if (data.action === "create") {
        setMessages([...messages, data.message.message]);
      }
    });
  }

  useEffect(() => {
    const tempSocket = openSocket(
      window.localStorage.getItem("arume-backend-uri")
    );
    setSocket(tempSocket);
  }, []);

  const AddMessage = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
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

      setMessage("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="relative">
      <ul className="flex flex-col w-[80vw] h-[calc(100vh-9rem)] overflow-scroll">
        {messages.map((message, index) => {
          return (
            <li key={index} className="p-2 pl-4 my-2 rounded-sm bg-slate-600">
              {message}
            </li>
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
          autoFocus
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
